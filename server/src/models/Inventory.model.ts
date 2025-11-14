import mongoose, { Schema, Document, Model } from 'mongoose';
import { BloodGroup } from './User.model';

export interface IInventory extends Document {
  center: string;
  bloodGroup: BloodGroup;
  units: number;
  lowStockThreshold: number;
  expiryDates: Date[];
  lastUpdatedBy?: mongoose.Types.ObjectId;
  updatedAt: Date;
  createdAt: Date;
}

const inventorySchema = new Schema<IInventory>(
  {
    center: {
      type: String,
      required: true,
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: true,
    },
    units: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      required: true,
      default: 10,
    },
    expiryDates: [Date],
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
inventorySchema.index({ center: 1, bloodGroup: 1 }, { unique: true });
inventorySchema.index({ bloodGroup: 1 });

export const Inventory: Model<IInventory> = mongoose.model<IInventory>('Inventory', inventorySchema);
