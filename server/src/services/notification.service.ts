import { Notification, INotification } from '@models/Notification.model';
import { socketService } from './socket.service';

export class NotificationService {
  async createNotification(data: {
    userId: string;
    type: 'APPT' | 'REMINDER' | 'ALERT' | 'GENERAL';
    title: string;
    message: string;
    metadata?: Record<string, any>;
  }): Promise<INotification> {
    const notification = await Notification.create(data);

    // Send real-time notification via socket
    socketService.notifyDonor(data.userId, notification);

    return notification;
  }

  async getUserNotifications(
    userId: string,
    filters?: {
      isRead?: boolean;
      type?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{ notifications: INotification[]; total: number; unreadCount: number }> {
    const query: any = { userId };

    if (filters?.isRead !== undefined) {
      query.isRead = filters.isRead;
    }

    if (filters?.type) {
      query.type = filters.type;
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Notification.countDocuments(query),
      Notification.countDocuments({ userId, isRead: false }),
    ]);

    return { notifications, total, unreadCount };
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await Notification.countDocuments({ userId, isRead: false });
  }

  async markAsRead(notificationId: string, userId: string): Promise<INotification | null> {
    const notification = await Notification.findOne({
      _id: notificationId,
      userId,
    });

    if (!notification) {
      return null;
    }

    notification.isRead = true;
    await notification.save();

    return notification;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await Notification.updateMany({ userId, isRead: false }, { $set: { isRead: true } });
  }

  async deleteNotification(notificationId: string, userId: string): Promise<boolean> {
    const result = await Notification.findOneAndDelete({
      _id: notificationId,
      userId,
    });

    return !!result;
  }

  async sendBulkNotification(
    userIds: string[],
    data: {
      type: 'APPT' | 'REMINDER' | 'ALERT' | 'GENERAL';
      title: string;
      message: string;
      metadata?: Record<string, any>;
    }
  ): Promise<void> {
    const notifications = userIds.map((userId) => ({
      userId,
      ...data,
    }));

    await Notification.insertMany(notifications);

    // Send real-time notifications
    userIds.forEach((userId) => {
      socketService.notifyDonor(userId, data);
    });
  }
}

export const notificationService = new NotificationService();
