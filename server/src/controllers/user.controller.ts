import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { User } from '@models/User.model';
import { DonationRequest } from '@models/DonationRequest.model';
import { calculateEligibility } from '@utils/eligibility';
import { hashPassword, comparePassword } from '@utils/password';

export class UserController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        name,
        phone,
        bloodGroup,
        dob,
        address,
        city,
        state,
        pincode,
      } = req.body;

      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Update fields
      if (name) user.name = name;
      if (phone) user.phone = phone;
      if (bloodGroup) user.bloodGroup = bloodGroup;
      if (dob) user.dob = new Date(dob);
      if (address !== undefined) user.address = address;
      if (city) user.city = city;
      if (state) user.state = state;
      if (pincode) user.pincode = pincode;

      await user.save();

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Verify current password
      const isValid = await comparePassword(currentPassword, user.passwordHash);
      if (!isValid) {
        res.status(400).json({
          success: false,
          message: 'Current password is incorrect',
        });
        return;
      }

      // Hash and update new password
      user.passwordHash = await hashPassword(newPassword);
      await user.save();

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getDonationHistory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status, startDate, endDate, page = 1, limit = 10 } = req.query;

      const query: any = { donorId: req.user?.userId };

      if (status) {
        query.status = status;
      }

      if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate as string);
        if (endDate) query.createdAt.$lte = new Date(endDate as string);
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [requests, total] = await Promise.all([
        DonationRequest.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit))
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

  async getEligibility(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      const eligibilityCheck = calculateEligibility(user);

      res.json({
        success: true,
        data: {
          ...eligibilityCheck,
          lastDonationAt: user.eligibility?.lastDonationAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await User.findById(req.user?.userId);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found',
        });
        return;
      }

      // Soft delete
      user.isActive = false;
      await user.save();

      res.json({
        success: true,
        message: 'Account deactivated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
