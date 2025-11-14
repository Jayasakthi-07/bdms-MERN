import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { Notification } from '@models/Notification.model';

export class NotificationController {
  async getMyNotifications(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { isRead, type, page = 1, limit = 20 } = req.query;

      const query: any = { userId: req.user?.userId };

      if (isRead !== undefined) {
        query.isRead = isRead === 'true';
      }

      if (type) {
        query.type = type;
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [notifications, total, unreadCount] = await Promise.all([
        Notification.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Notification.countDocuments(query),
        Notification.countDocuments({ userId: req.user?.userId, isRead: false }),
      ]);

      res.json({
        success: true,
        data: {
          notifications,
          unreadCount,
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

  async markAsRead(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const notification = await Notification.findOne({
        _id: id,
        userId: req.user?.userId,
      });

      if (!notification) {
        res.status(404).json({
          success: false,
          message: 'Notification not found',
        });
        return;
      }

      notification.isRead = true;
      await notification.save();

      res.json({
        success: true,
        message: 'Notification marked as read',
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      await Notification.updateMany(
        { userId: req.user?.userId, isRead: false },
        { $set: { isRead: true } }
      );

      res.json({
        success: true,
        message: 'All notifications marked as read',
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const notification = await Notification.findOneAndDelete({
        _id: id,
        userId: req.user?.userId,
      });

      if (!notification) {
        res.status(404).json({
          success: false,
          message: 'Notification not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Notification deleted',
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const count = await Notification.countDocuments({
        userId: req.user?.userId,
        isRead: false,
      });

      res.json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController = new NotificationController();
