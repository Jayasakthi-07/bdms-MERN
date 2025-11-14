import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { User } from '@models/User.model';
import { DonationRequest } from '@models/DonationRequest.model';
import { Notification } from '@models/Notification.model';
import { AuditLog } from '@models/AuditLog.model';
import { updateEligibilityAfterDonation } from '@utils/eligibility';
import { emailService } from '@services/email.service';
import { socketService } from '@services/socket.service';

export class AdminController {
  async getAllDonors(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { search, bloodGroup, isActive, page = 1, limit = 20 } = req.query;

      const query: any = { role: 'DONOR' };

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
        ];
      }

      if (bloodGroup) {
        query.bloodGroup = bloodGroup;
      }

      if (isActive !== undefined) {
        query.isActive = isActive === 'true';
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [donors, total] = await Promise.all([
        User.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .select('-passwordHash'),
        User.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: {
          donors,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getDonorById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const donor = await User.findOne({ _id: id, role: 'DONOR' }).select('-passwordHash');

      if (!donor) {
        res.status(404).json({
          success: false,
          message: 'Donor not found',
        });
        return;
      }

      // Get donation stats
      const donationStats = await DonationRequest.aggregate([
        { $match: { donorId: donor._id } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ]);

      res.json({
        success: true,
        data: {
          donor,
          stats: donationStats,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateDonor(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const donor = await User.findOneAndUpdate(
        { _id: id, role: 'DONOR' },
        { $set: updates },
        { new: true, runValidators: true }
      ).select('-passwordHash');

      if (!donor) {
        res.status(404).json({
          success: false,
          message: 'Donor not found',
        });
        return;
      }

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'UPDATE_DONOR',
        entityType: 'User',
        entityId: id,
        meta: { updates },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Donor updated successfully',
        data: donor,
      });
    } catch (error) {
      next(error);
    }
  }

  async toggleDonorStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const donor = await User.findOne({ _id: id, role: 'DONOR' });

      if (!donor) {
        res.status(404).json({
          success: false,
          message: 'Donor not found',
        });
        return;
      }

      donor.isActive = !donor.isActive;
      await donor.save();

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: donor.isActive ? 'ACTIVATE_DONOR' : 'DEACTIVATE_DONOR',
        entityType: 'User',
        entityId: id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: `Donor ${donor.isActive ? 'activated' : 'deactivated'} successfully`,
        data: { isActive: donor.isActive },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRequests(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, startDate, endDate, page = 1, limit = 20 } = req.query;

      const query: any = {};

      if (status) {
        query.status = status;
      }

      if (startDate || endDate) {
        query.requestedAt = {};
        if (startDate) query.requestedAt.$gte = new Date(startDate as string);
        if (endDate) query.requestedAt.$lte = new Date(endDate as string);
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [requests, total] = await Promise.all([
        DonationRequest.find(query)
          .sort({ requestedAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .populate('donorId', 'name email phone bloodGroup')
          .populate('approvedBy', 'name')
          .populate('rejectedBy', 'name'),
        DonationRequest.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: {
          requests,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async approveRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { scheduledAt, adminNotes } = req.body;

      const request = await DonationRequest.findById(id).populate('donorId', 'name email');

      if (!request) {
        res.status(404).json({
          success: false,
          message: 'Request not found',
        });
        return;
      }

      if (request.status !== 'PENDING') {
        res.status(400).json({
          success: false,
          message: 'Only pending requests can be approved',
        });
        return;
      }

      request.status = 'APPROVED';
      request.scheduledAt = new Date(scheduledAt);
      request.adminNotes = adminNotes;
      request.approvedBy = req.user?.userId as any;
      await request.save();

      // Create notification
      await Notification.create({
        userId: request.donorId._id,
        type: 'APPT',
        title: 'Request Approved',
        message: `Your donation request has been approved for ${new Date(scheduledAt).toLocaleDateString()}.`,
        metadata: { requestId: request._id },
      });

      // Send email
      const donor = request.donorId as any;
      emailService
        .sendAppointmentApprovalEmail(
          donor.email,
          donor.name,
          new Date(scheduledAt),
          request.center || 'Main Center'
        )
        .catch((err) => console.error('Failed to send approval email:', err));

      // Socket notification
      socketService.notifyRequestUpdate(request.donorId._id.toString(), request);

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'APPROVE_REQUEST',
        entityType: 'DonationRequest',
        entityId: id,
        meta: { scheduledAt, adminNotes },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Request approved successfully',
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async rejectRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { rejectionReason, adminNotes } = req.body;

      const request = await DonationRequest.findById(id).populate('donorId', 'name email');

      if (!request) {
        res.status(404).json({
          success: false,
          message: 'Request not found',
        });
        return;
      }

      if (request.status !== 'PENDING') {
        res.status(400).json({
          success: false,
          message: 'Only pending requests can be rejected',
        });
        return;
      }

      request.status = 'REJECTED';
      request.rejectionReason = rejectionReason;
      request.adminNotes = adminNotes;
      request.rejectedBy = req.user?.userId as any;
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

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'REJECT_REQUEST',
        entityType: 'DonationRequest',
        entityId: id,
        meta: { rejectionReason, adminNotes },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Request rejected',
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async completeRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const request = await DonationRequest.findById(id);

      if (!request) {
        res.status(404).json({
          success: false,
          message: 'Request not found',
        });
        return;
      }

      if (request.status !== 'APPROVED') {
        res.status(400).json({
          success: false,
          message: 'Only approved requests can be marked as completed',
        });
        return;
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

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'COMPLETE_REQUEST',
        entityType: 'DonationRequest',
        entityId: id,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Request marked as completed',
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAuditLogs(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { action, entityType, startDate, endDate, page = 1, limit = 50 } = req.query;

      const query: any = {};

      if (action) query.action = action;
      if (entityType) query.entityType = entityType;

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate as string);
        if (endDate) query.createdAt.$lte = new Date(endDate as string);
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [logs, total] = await Promise.all([
        AuditLog.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
          .populate('adminId', 'name email'),
        AuditLog.countDocuments(query),
      ]);

      res.json({
        success: true,
        data: {
          logs,
          pagination: {
            page: Number(page),
            limit: Number(limit),
            total,
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const adminController = new AdminController();
