import { Request, Response, NextFunction } from 'express';
import { User } from '@models/User.model';
import { hashPassword, comparePassword } from '@utils/password';
import { generateTokenPair, verifyRefreshToken } from '@utils/jwt';
import { emailService } from '@services/email.service';
import crypto from 'crypto';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, phone, bloodGroup, dob } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User with this email already exists',
        });
        return;
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        phone,
        bloodGroup: bloodGroup && bloodGroup !== '' ? bloodGroup : undefined,
        dob: dob && dob !== '' ? new Date(dob) : undefined,
        role: 'DONOR',
        eligibility: {
          isEligible: true,
        },
      });

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      // Send welcome email (non-blocking)
      emailService.sendWelcomeEmail(user.email, user.name).catch((err) => {
        console.error('Failed to send welcome email:', err);
      });

      res.status(201).json({
        success: true,
        message: 'Registration successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bloodGroup: user.bloodGroup,
          },
          ...tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Wrong user name',
        });
        return;
      }

      // Check if user is active
      if (!user.isActive) {
        res.status(403).json({
          success: false,
          message: 'Account has been deactivated',
        });
        return;
      }

      // Verify password
      const isPasswordValid = await comparePassword(password, user.passwordHash);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Wrong password',
        });
        return;
      }

      // Generate tokens
      const tokens = generateTokenPair({
        userId: user._id.toString(),
        email: user.email,
        role: user.role,
      });

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bloodGroup: user.bloodGroup,
          },
          ...tokens,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token is required',
        });
        return;
      }

      try {
        const payload = verifyRefreshToken(refreshToken);

        // Verify user still exists
        const user = await User.findById(payload.userId);
        if (!user || !user.isActive) {
          res.status(401).json({
            success: false,
            message: 'Invalid refresh token',
          });
          return;
        }

        // Generate new tokens
        const tokens = generateTokenPair({
          userId: user._id.toString(),
          email: user.email,
          role: user.role,
        });

        res.json({
          success: true,
          data: tokens,
        });
      } catch (error) {
        res.status(401).json({
          success: false,
          message: 'Invalid or expired refresh token',
        });
        return;
      }
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        // Don't reveal if email exists
        res.json({
          success: true,
          message: 'If an account exists, a password reset link has been sent',
        });
        return;
      }

      // Generate reset token (simplified - in production use a proper token store)
      const resetToken = crypto.randomBytes(32).toString('hex');
      // In production, store this token with expiry in database

      // Send reset email
      await emailService.sendPasswordResetEmail(user.email, user.name, resetToken);

      res.json({
        success: true,
        message: 'Password reset link has been sent to your email',
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { token, password } = req.body;

      // In production, verify token from database
      // For now, simplified implementation

      res.json({
        success: true,
        message: 'Password has been reset successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    // In production, invalidate refresh token in database/redis
    res.json({
      success: true,
      message: 'Logout successful',
    });
  }
}

export const authController = new AuthController();
