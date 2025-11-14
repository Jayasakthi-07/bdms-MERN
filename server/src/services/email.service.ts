import nodemailer, { Transporter } from 'nodemailer';
import { env } from '@config/env';

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: parseInt(env.EMAIL_PORT),
      secure: false,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject: 'Welcome to BDMS - Blood Donation Management System',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🩸 Welcome to BDMS</h1>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Thank you for registering with the Blood Donation Management System. Your account has been successfully created.</p>
              <p>You can now:</p>
              <ul>
                <li>Schedule donation appointments</li>
                <li>Track your donation history</li>
                <li>Check your eligibility status</li>
                <li>Receive important notifications</li>
              </ul>
              <p>Every donation can save up to 3 lives. Thank you for being a hero!</p>
              <a href="${env.CLIENT_URL}/donor/dashboard" class="button">Go to Dashboard</a>
            </div>
            <div class="footer">
              <p>© 2025 Blood Donation Management System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('✉️  Welcome email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }

  async sendAppointmentApprovalEmail(
    to: string,
    name: string,
    scheduledAt: Date,
    center: string
  ): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject: 'Donation Appointment Approved ✅',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
            .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Appointment Approved!</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>Great news! Your blood donation appointment has been approved.</p>
              <div class="info-box">
                <p><strong>📅 Date & Time:</strong> ${new Date(scheduledAt).toLocaleString('en-IN', {
                  dateStyle: 'full',
                  timeStyle: 'short',
                })}</p>
                <p><strong>📍 Center:</strong> ${center}</p>
              </div>
              <p><strong>Before you donate:</strong></p>
              <ul>
                <li>Get a good night's sleep</li>
                <li>Eat a healthy meal</li>
                <li>Drink plenty of water</li>
                <li>Bring a valid ID</li>
              </ul>
              <a href="${env.CLIENT_URL}/donor/history" class="button">View Details</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('✉️  Approval email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }

  async sendAppointmentRejectionEmail(
    to: string,
    name: string,
    reason: string
  ): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject: 'Donation Appointment Update',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .info-box { background: white; padding: 20px; border-left: 4px solid #ef4444; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Appointment Update</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>We regret to inform you that your recent donation appointment could not be approved at this time.</p>
              <div class="info-box">
                <p><strong>Reason:</strong> ${reason}</p>
              </div>
              <p>You can submit a new request when eligible. Thank you for your understanding and continued support.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('✉️  Rejection email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }

  async sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<void> {
    const resetUrl = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject: 'Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f59e0b; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
            .button { display: inline-block; padding: 12px 30px; background: #f59e0b; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fef3c7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <div class="warning">
                <p><strong>⚠️ Security Notice:</strong></p>
                <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('✉️  Password reset email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }

  async sendDonationReminderEmail(to: string, name: string, appointmentDate: Date): Promise<void> {
    const mailOptions = {
      from: env.EMAIL_FROM,
      to,
      subject: '🔔 Donation Appointment Reminder',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3b82f6; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 Upcoming Appointment</h1>
            </div>
            <div class="content">
              <h2>Hello ${name},</h2>
              <p>This is a friendly reminder about your upcoming blood donation appointment:</p>
              <p><strong>📅 Date:</strong> ${new Date(appointmentDate).toLocaleString('en-IN', {
                dateStyle: 'full',
                timeStyle: 'short',
              })}</p>
              <p>See you soon! 🩸</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await this.transporter.sendMail(mailOptions);
    console.log('✉️  Reminder email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
}

export const emailService = new EmailService();
