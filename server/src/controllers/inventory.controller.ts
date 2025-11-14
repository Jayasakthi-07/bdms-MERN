import { Response, NextFunction } from 'express';
import { AuthRequest } from '@middleware/auth.middleware';
import { Inventory } from '@models/Inventory.model';
import { AuditLog } from '@models/AuditLog.model';
import { socketService } from '@services/socket.service';

export class InventoryController {
  async getAllInventory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { center, bloodGroup } = req.query;

      const query: any = {};
      if (center) query.center = center;
      if (bloodGroup) query.bloodGroup = bloodGroup;

      const inventory = await Inventory.find(query)
        .sort({ center: 1, bloodGroup: 1 })
        .populate('lastUpdatedBy', 'name');

      // Check for low stock and send alerts
      inventory.forEach((item) => {
        if (item.units < item.lowStockThreshold) {
          socketService.broadcastLowStockAlert(
            item.bloodGroup,
            item.center,
            item.units
          );
        }
      });

      res.json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  }

  async getInventoryById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const inventory = await Inventory.findById(id).populate('lastUpdatedBy', 'name');

      if (!inventory) {
        res.status(404).json({
          success: false,
          message: 'Inventory record not found',
        });
        return;
      }

      res.json({
        success: true,
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  }

  async createInventory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { center, bloodGroup, units, lowStockThreshold, expiryDates } = req.body;

      // Check if inventory already exists for this center and blood group
      const existing = await Inventory.findOne({ center, bloodGroup });
      if (existing) {
        res.status(400).json({
          success: false,
          message: 'Inventory record already exists for this center and blood group',
        });
        return;
      }

      const inventory = await Inventory.create({
        center,
        bloodGroup,
        units,
        lowStockThreshold,
        expiryDates: expiryDates?.map((date: string) => new Date(date)),
        lastUpdatedBy: req.user?.userId,
      });

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'CREATE_INVENTORY',
        entityType: 'Inventory',
        entityId: inventory._id,
        meta: { center, bloodGroup, units },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.status(201).json({
        success: true,
        message: 'Inventory created successfully',
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInventory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { units, lowStockThreshold, expiryDates } = req.body;

      const inventory = await Inventory.findById(id);

      if (!inventory) {
        res.status(404).json({
          success: false,
          message: 'Inventory record not found',
        });
        return;
      }

      const previousUnits = inventory.units;

      // Update fields
      if (units !== undefined) inventory.units = units;
      if (lowStockThreshold !== undefined) inventory.lowStockThreshold = lowStockThreshold;
      if (expiryDates) {
        inventory.expiryDates = expiryDates.map((date: string) => new Date(date));
      }
      inventory.lastUpdatedBy = req.user?.userId as any;

      await inventory.save();

      // Check for low stock alert
      if (inventory.units < inventory.lowStockThreshold) {
        socketService.broadcastLowStockAlert(
          inventory.bloodGroup,
          inventory.center,
          inventory.units
        );
      }

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'UPDATE_INVENTORY',
        entityType: 'Inventory',
        entityId: id,
        meta: {
          previousUnits,
          newUnits: inventory.units,
          center: inventory.center,
          bloodGroup: inventory.bloodGroup,
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Inventory updated successfully',
        data: inventory,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInventory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const inventory = await Inventory.findByIdAndDelete(id);

      if (!inventory) {
        res.status(404).json({
          success: false,
          message: 'Inventory record not found',
        });
        return;
      }

      // Audit log
      await AuditLog.create({
        adminId: req.user?.userId,
        action: 'DELETE_INVENTORY',
        entityType: 'Inventory',
        entityId: id,
        meta: {
          center: inventory.center,
          bloodGroup: inventory.bloodGroup,
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.json({
        success: true,
        message: 'Inventory deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getInventorySummary(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await Inventory.aggregate([
        {
          $group: {
            _id: '$bloodGroup',
            totalUnits: { $sum: '$units' },
            centers: { $addToSet: '$center' },
            lowStockCount: {
              $sum: {
                $cond: [{ $lt: ['$units', '$lowStockThreshold'] }, 1, 0],
              },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      res.json({
        success: true,
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLowStockItems(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const lowStockItems = await Inventory.find({
        $expr: { $lt: ['$units', '$lowStockThreshold'] },
      })
        .sort({ units: 1 })
        .populate('lastUpdatedBy', 'name');

      res.json({
        success: true,
        data: lowStockItems,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const inventoryController = new InventoryController();
