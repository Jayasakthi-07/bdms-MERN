import { DonationRequest, IDonationRequest } from '@models/DonationRequest.model';
import { User } from '@models/User.model';
import { Notification } from '@models/Notification.model';
import { calculateEligibility, updateEligibilityAfterDonation } from '@utils/eligibility';
import { socketService } from './socket.service';
import { emailService } from './email.service';

export class DonationService {
  async createRequest(
    donorId: string,
    data: {
      preferredDate?: Date;
      center?: string;
      donorNotes?: string;
    }
  ): Promise<IDonationRequest> {
    // Check eligibility
    const user = await User.findById(donorId);
    if (!user) {
      throw new Error('User not found');
    }

    const eligibility = calculateEligibility(user);
    if (!eligibility.isEligible) {
      throw new Error(`Not eligible to donate: ${eligibility.reasons.join(', ')}`);
    }

    // Create request
    const request = await DonationRequest.create({
      donorId,
      preferredDate: data.preferredDate,
      center: data.center,
      donorNotes: data.donorNotes,
      status: 'PENDING',
    });

    // Create notification for donor
    await Notification.create({
      userId: donorId,
      type: 'APPT',
      title: 'Request Submitted',
      message: 'Your donation request has been submitted and is pending approval.',
    });

    // Notify admins via socket
    socketService.notifyAdminNewRequest(request);

    return request;
  }

  async getRequestById(requestId: string, userId?: string): Promise<IDonationRequest | null> {
    const query: any = { _id: requestId };
    if (userId) {
      query.donorId = userId;
    }

    const request = await DonationRequest.findOne(query)
      .populate('donorId', 'name email phone bloodGroup')
      .populate('approvedBy', 'name')
      .populate('rejectedBy', 'name');

    return request;
  }

  async getUserRequests(
    userId: string,
    filters?: {
      status?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<IDonationRequest[]> {
    const query: any = { donorId: userId };

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.startDate || filters?.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = filters.startDate;
      if (filters.endDate) query.createdAt.$lte = filters.endDate;
    }

    const requests = await DonationRequest.find(query)
      .sort({ createdAt: -1 })
      .populate('approvedBy', 'name')
      .populate('rejectedBy', 'name');

    return requests;
  }

  async cancelRequest(requestId: string, userId: string): Promise<IDonationRequest> {
    const request = await DonationRequest.findOne({
      _id: requestId,
      donorId: userId,
    });

    if (!request) {
      throw new Error('Request not found');
    }

    if (request.status !== 'PENDING' && request.status !== 'APPROVED') {
      throw new Error('Only pending or approved requests can be cancelled');
    }

    request.status = 'CANCELLED';
    await request.save();

    // Notify donor
    await Notification.create({
      userId,
      type: 'APPT',
      title: 'Request Cancelled',
      message: 'Your donation request has been cancelled.',
    });

    return request;
  }

  async approveRequest(
    requestId: string,
    adminId: string,
    scheduledAt: Date,
    adminNotes?: string
  ): Promise<IDonationRequest> {
    const request = await DonationRequest.findById(requestId).populate('donorId', 'name email');

    if (!request) {
      throw new Error('Request not found');
    }

    if (request.status !== 'PENDING') {
      throw new Error('Only pending requests can be approved');
    }

    request.status = 'APPROVED';
    request.scheduledAt = scheduledAt;
    request.adminNotes = adminNotes;
    request.approvedBy = adminId as any;
    await request.save();

    // Create notification
    await Notification.create({
      userId: request.donorId._id,
      type: 'APPT',
      title: 'Request Approved',
      message: `Your donation request has been approved for ${scheduledAt.toLocaleDateString()}.`,
      metadata: { requestId: request._id },
    });

    // Send email
    const donor = request.donorId as any;
    emailService
      .sendAppointmentApprovalEmail(donor.email, donor.name, scheduledAt, request.center || 'Main Center')
      .catch((err) => console.error('Failed to send approval email:', err));

    // Socket notification
    socketService.notifyRequestUpdate(request.donorId._id.toString(), request);

    return request;
  }

  async rejectRequest(
    requestId: string,
    adminId: string,
    rejectionReason: string,
    adminNotes?: string
  ): Promise<IDonationRequest> {
    const request = await DonationRequest.findById(requestId).populate('donorId', 'name email');

    if (!request) {
      throw new Error('Request not found');
    }

    if (request.status !== 'PENDING') {
      throw new Error('Only pending requests can be rejected');
    }

    request.status = 'REJECTED';
    request.rejectionReason = rejectionReason;
    request.adminNotes = adminNotes;
    request.rejectedBy = adminId as any;
    await request.save();

    // Create notification
    await Notification.create({
      userId: request.donorId._id,
      type: 'APPT',
      title: 'Request Update',
      message: `Your donation request has been rejected. Reason: ${rejectionReason}`,
      metadata: { requestId: request._id },
    });

    // Send email
    const donor = request.donorId as any;
    emailService
      .sendAppointmentRejectionEmail(donor.email, donor.name, rejectionReason)
      .catch((err) => console.error('Failed to send rejection email:', err));

    // Socket notification
    socketService.notifyRequestUpdate(request.donorId._id.toString(), request);

    return request;
  }

  async completeRequest(requestId: string): Promise<IDonationRequest> {
    const request = await DonationRequest.findById(requestId);

    if (!request) {
      throw new Error('Request not found');
    }

    if (request.status !== 'APPROVED') {
      throw new Error('Only approved requests can be marked as completed');
    }

    request.status = 'COMPLETED';
    request.completedAt = new Date();
    await request.save();

    // Update donor eligibility
    const donor = await User.findById(request.donorId);
    if (donor) {
      updateEligibilityAfterDonation(donor);
      await donor.save();
    }

    // Create notification
    await Notification.create({
      userId: request.donorId,
      type: 'APPT',
      title: 'Thank You!',
      message: 'Your donation has been completed. Thank you for saving lives!',
      metadata: { requestId: request._id },
    });

    return request;
  }
}

export const donationService = new DonationService();
