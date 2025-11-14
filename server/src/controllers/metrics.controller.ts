import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { User } from '@models/User.model';
import { DonationRequest } from '@models/DonationRequest.model';
import { Inventory } from '@models/Inventory.model';

export class MetricsController {
  async getDashboardSummary(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const [
        totalDonors,
        activeDonors,
        pendingRequests,
        completedDonations,
        totalInventoryUnits,
        lowStockCount,
      ] = await Promise.all([
        User.countDocuments({ role: 'DONOR' }),
        User.countDocuments({ role: 'DONOR', isActive: true }),
        DonationRequest.countDocuments({ status: 'PENDING' }),
        DonationRequest.countDocuments({ status: 'COMPLETED' }),
        Inventory.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: '$units' },
            },
          },
        ]).then((res) => res[0]?.total || 0),
        Inventory.countDocuments({
          $expr: { $lt: ['$units', '$lowStockThreshold'] },
        }),
      ]);

      // Lives saved calculation (1 donation = 3 lives)
      const livesSaved = completedDonations * 3;

      res.json({
        success: true,
        data: {
          totalDonors,
          activeDonors,
          pendingRequests,
          completedDonations,
          livesSaved,
          totalInventoryUnits,
          lowStockCount,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getBloodGroupDistribution(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const distribution = await User.aggregate([
        { $match: { role: 'DONOR', bloodGroup: { $exists: true } } },
        {
          $group: {
            _id: '$bloodGroup',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json({
        success: true,
        data: distribution,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInventoryByBloodGroup(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const inventoryData = await Inventory.aggregate([
        {
          $group: {
            _id: '$bloodGroup',
            totalUnits: { $sum: '$units' },
            avgThreshold: { $avg: '$lowStockThreshold' },
            centerCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json({
        success: true,
        data: inventoryData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMonthlyDonations(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { months = 12 } = req.query;

      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - Number(months));

      const monthlyData = await DonationRequest.aggregate([
        {
          $match: {
            status: 'COMPLETED',
            completedAt: { $gte: startDate },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$completedAt' },
              month: { $month: '$completedAt' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1 },
        },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            count: 1,
          },
        },
      ]);

      res.json({
        success: true,
        data: monthlyData,
      });
    } catch (error) {
      next(error);
    }
  }

  async getRequestStatusBreakdown(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const statusBreakdown = await DonationRequest.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json({
        success: true,
        data: statusBreakdown,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFulfillmentRate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const [total, completed] = await Promise.all([
        DonationRequest.countDocuments(),
        DonationRequest.countDocuments({ status: 'COMPLETED' }),
      ]);

      const rate = total > 0 ? ((completed / total) * 100).toFixed(2) : '0';

      res.json({
        success: true,
        data: {
          total,
          completed,
          rate: parseFloat(rate),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAverageLeadTime(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await DonationRequest.aggregate([
        {
          $match: {
            status: 'COMPLETED',
            requestedAt: { $exists: true },
            completedAt: { $exists: true },
          },
        },
        {
          $project: {
            leadTime: {
              $divide: [
                { $subtract: ['$completedAt', '$requestedAt'] },
                1000 * 60 * 60 * 24, // Convert to days
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            averageLeadTimeDays: { $avg: '$leadTime' },
          },
        },
      ]);

      const averageLeadTime = result[0]?.averageLeadTimeDays || 0;

      res.json({
        success: true,
        data: {
          averageLeadTimeDays: parseFloat(averageLeadTime.toFixed(2)),
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const metricsController = new MetricsController();
