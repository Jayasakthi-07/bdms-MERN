import { User, IUser } from '@models/User.model';
import { hashPassword, comparePassword } from '@utils/password';
import { generateTokenPair } from '@utils/jwt';
import { emailService } from './email.service';

export class AuthService {
  async register(data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    bloodGroup?: string;
    dob?: Date;
  }): Promise<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email.toLowerCase() });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await User.create({
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      phone: data.phone,
      bloodGroup: data.bloodGroup,
      dob: data.dob,
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

    return { user, tokens };
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; tokens: { accessToken: string; refreshToken: string } }> {
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account has been deactivated');
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokenPair({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return { user, tokens };
  }

  async verifyUser(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user || !user.isActive) {
      return null;
    }
    return user;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash and update new password
    user.passwordHash = await hashPassword(newPassword);
    await user.save();
  }

  async initiatePasswordReset(email: string): Promise<string> {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal if user exists
      return 'reset-token-placeholder';
    }

    // Generate reset token (simplified - in production, store in database with expiry)
    const resetToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // Send reset email
    await emailService.sendPasswordResetEmail(user.email, user.name, resetToken);

    return resetToken;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // In production, verify token from database
    // For now, simplified implementation
    const passwordHash = await hashPassword(newPassword);
    // Update user password
  }
}

export const authService = new AuthService();
