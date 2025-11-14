import { z } from 'zod';

export const createDonationRequestSchema = z.object({
  body: z.object({
    preferredDate: z.string().datetime().optional(),
    center: z.string().min(1).max(200).optional(),
    donorNotes: z.string().max(500).optional(),
  }),
});

export const updateDonationRequestSchema = z.object({
  body: z.object({
    status: z.enum(['CANCELLED']).optional(),
    donorNotes: z.string().max(500).optional(),
  }),
});

export const approveDonationRequestSchema = z.object({
  body: z.object({
    scheduledAt: z.string().datetime(),
    adminNotes: z.string().max(500).optional(),
  }),
});

export const rejectDonationRequestSchema = z.object({
  body: z.object({
    rejectionReason: z.string().min(10).max(500),
    adminNotes: z.string().max(500).optional(),
  }),
});
