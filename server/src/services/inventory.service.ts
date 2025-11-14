import { Inventory, IInventory } from '@models/Inventory.model';
import { AuditLog } from '@models/AuditLog.model';
import { socketService } from './socket.service';
import { BloodGroup } from '@models/User.model';

export class InventoryService {
  async getAllInventory(filters?: {
    center?: string;
    bloodGroup?: BloodGroup;
  }): Promise<IInventory[]> {
    const query: any = {};

    if (filters?.center) {
      query.center = filters.center;
    }

    if (filters?.bloodGroup) {
      query.bloodGroup = filters.bloodGroup;
    }

    const inventory = await Inventory.find(query)
      .sort({ center: 1, bloodGroup: 1 })
      .populate('lastUpdatedBy', 'name');

    // Check for low stock and trigger alerts
    inventory.forEach((item) => {
      if (item.units < item.lowStockThreshold) {
        socketService.broadcastLowStockAlert(item.bloodGroup, item.center, item.units);
      }
    });

    return inventory;
  }

  async getInventoryById(id: string): Promise<IInventory | null> {
    return await Inventory.findById(id).populate('lastUpdatedBy', 'name');
  }

  async createInventory(
    data: {
      center: string;
      bloodGroup: BloodGroup;
      units: number;
      lowStockThreshold: number;
      expiryDates?: Date[];
    },
    adminId: string
  ): Promise<IInventory> {
    // Check if inventory already exists
    const existing = await Inventory.findOne({
      center: data.center,
      bloodGroup: data.bloodGroup,
    });

    if (existing) {
      throw new Error('Inventory record already exists for this center and blood group');
    }

    const inventory = await Inventory.create({
      ...data,
      lastUpdatedBy: adminId,
    });

    // Create audit log
    await AuditLog.create({
      adminId,
      action: 'CREATE_INVENTORY',
      entityType: 'Inventory',
      entityId: inventory._id,
      meta: { center: data.center, bloodGroup: data.bloodGroup, units: data.units },
    });

    return inventory;
  }

  async updateInventory(
    id: string,
    data: {
      units?: number;
      lowStockThreshold?: number;
      expiryDates?: Date[];
    },
    adminId: string
  ): Promise<IInventory> {
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      throw new Error('Inventory record not found');
    }

    const previousUnits = inventory.units;

    // Update fields
    if (data.units !== undefined) inventory.units = data.units;
    if (data.lowStockThreshold !== undefined)
      inventory.lowStockThreshold = data.lowStockThreshold;
    if (data.expiryDates) inventory.expiryDates = data.expiryDates;
    inventory.lastUpdatedBy = adminId as any;

    await inventory.save();

    // Check for low stock alert
    if (inventory.units < inventory.lowStockThreshold) {
      socketService.broadcastLowStockAlert(inventory.bloodGroup, inventory.center, inventory.units);
    }

    // Create audit log
    await AuditLog.create({
      adminId,
      action: 'UPDATE_INVENTORY',
      entityType: 'Inventory',
      entityId: id,
      meta: {
        previousUnits,
        newUnits: inventory.units,
        center: inventory.center,
        bloodGroup: inventory.bloodGroup,
      },
    });

    return inventory;
  }

  async deleteInventory(id: string, adminId: string): Promise<void> {
    const inventory = await Inventory.findByIdAndDelete(id);

    if (!inventory) {
      throw new Error('Inventory record not found');
    }

    // Create audit log
    await AuditLog.create({
      adminId,
      action: 'DELETE_INVENTORY',
      entityType: 'Inventory',
      entityId: id,
      meta: {
        center: inventory.center,
        bloodGroup: inventory.bloodGroup,
      },
    });
  }

  async getLowStockItems(): Promise<IInventory[]> {
    return await Inventory.find({
      $expr: { $lt: ['$units', '$lowStockThreshold'] },
    })
      .sort({ units: 1 })
      .populate('lastUpdatedBy', 'name');
  }

  async getInventorySummary(): Promise<any[]> {
    return await Inventory.aggregate([
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
  }
}

export const inventoryService = new InventoryService();
