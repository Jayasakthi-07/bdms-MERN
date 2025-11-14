import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { DonationRequest } from '@models/DonationRequest.model';
import { User } from '@models/User.model';
import { Notification } from '@models/Notification.model';
import { calculateEligibility } from '@utils/eligibility';
import { socketService } from '@services/socket.service';

export class DonationController {
  async createRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { preferredDate, center, donorNotes } = req.body;

      // Check eligibility
      const user = await User.findById(req.user?.userId);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      const eligibility = calculateEligibility(user);
      if (!eligibility.isEligible) {
        res.status(400).json({
          success: false,
          message: 'You are not eligible to donate at this time',
          data: { reasons: eligibility.reasons },
        });
        return;
      }

      // Create request
      const request = await DonationRequest.create({
        donorId: req.user?.userId,
        preferredDate: preferredDate ? new Date(preferredDate) : undefined,
        center,
        donorNotes,
        status: 'PENDING',
      });

      // Create notification for donor
      await Notification.create({
        userId: req.user?.userId,
        type: 'APPT',
        title: 'Request Submitted',
        message: 'Your donation request has been submitted and is pending approval.',
      });

      // Notify admins via socket
      socketService.notifyAdminNewRequest(request);

      res.status(201).json({
        success: true,
        message: 'Donation request submitted successfully',
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMyRequests(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;

      const query: any = { donorId: req.user?.userId };
      if (status) query.status = status;

      const requests = await DonationRequest.find(query)
        .sort({ createdAt: -1 })
        .populate('approvedBy', 'name')
        .populate('rejectedBy', 'name');

      res.json({
        success: true,
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRequestById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const request = await DonationRequest.findOne({
        _id: id,
        donorId: req.user?.userId,
      })
        .populate('approvedBy', 'name')
        .populate('rejectedBy', 'name');

      if (!request) {
        res.status(404).json({
          success: false,
          message: 'Request not found',
        });
        return;
      }

      res.json({
        success: true,
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelRequest(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const request = await DonationRequest.findOne({
        _id: id,
        donorId: req.user?.userId,
      });

      if (!request) {
        res.status(404).json({
          success: false,
          message: 'Request not found',
        });
        return;
      }

      if (request.status !== 'PENDING' && request.status !== 'APPROVED') {
        res.status(400).json({
          success: false,
          message: 'Only pending or approved requests can be cancelled',
        });
        return;
      }

      request.status = 'CANCELLED';
      await request.save();

      // Notify donor
      await Notification.create({
        userId: req.user?.userId,
        type: 'APPT',
        title: 'Request Cancelled',
        message: 'Your donation request has been cancelled.',
      });

      res.json({
        success: true,
        message: 'Request cancelled successfully',
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const donationController = new DonationController();
