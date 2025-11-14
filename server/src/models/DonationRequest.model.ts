import mongoose, { Schema, Document, Model } from 'mongoose';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';

export interface IDonationRequest extends Document {
  donorId: mongoose.Types.ObjectId;
  requestedAt: Date;
  preferredDate?: Date;
  center?: string;
  status: RequestStatus;
  adminNotes?: string;
  donorNotes?: string;
  scheduledAt?: Date;
  completedAt?: Date;
  approvedBy?: mongoose.Types.ObjectId;
  rejectedBy?: mongoose.Types.ObjectId;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const donationRequestSchema = new Schema<IDonationRequest>(
  {
    donorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    preferredDate: Date,
    center: String,
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
      index: true,
    },
    adminNotes: String,
    donorNotes: String,
    scheduledAt: Date,
    completedAt: Date,
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rejectionReason: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
donationRequestSchema.index({ donorId: 1, createdAt: -1 });
donationRequestSchema.index({ status: 1, requestedAt: -1 });

export const DonationRequest: Model<IDonationRequest> = mongoose.model<IDonationRequest>(
  'DonationRequest',
  donationRequestSchema
);
