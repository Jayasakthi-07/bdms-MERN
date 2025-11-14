import { z } from 'zod';

export const updateInventorySchema = z.object({
  body: z.object({
    units: z.number().int().min(0).optional(),
    lowStockThreshold: z.number().int().min(0).optional(),
    expiryDates: z.array(z.string().datetime()).optional(),
  }),
});

export const createInventorySchema = z.object({
  body: z.object({
    center: z.string().min(1).max(200),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    units: z.number().int().min(0).default(0),
    lowStockThreshold: z.number().int().min(0).default(10),
    expiryDates: z.array(z.string().datetime()).optional(),
  }),
});
