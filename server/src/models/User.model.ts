import mongoose, { Schema, Document, Model } from 'mongoose';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UserRole = 'DONOR' | 'ADMIN';

export interface IEligibility {
  lastDonationAt?: Date;
  isEligible: boolean;
  nextEligibleAt?: Date;
  notes?: string;
}

export interface IUser extends Document {
  role: UserRole;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  bloodGroup?: BloodGroup;
  dob?: Date;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  eligibility?: IEligibility;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ['DONOR', 'ADMIN'],
      required: true,
      default: 'DONOR',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      // Index is defined below to avoid duplicate index warning
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    dob: Date,
    address: String,
    city: String,
    state: String,
    pincode: String,
    eligibility: {
      lastDonationAt: Date,
      isEligible: {
        type: Boolean,
        default: true,
      },
      nextEligibleAt: Date,
      notes: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ bloodGroup: 1 });
userSchema.index({ isActive: 1 });

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
