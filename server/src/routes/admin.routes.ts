import { Router } from 'express';
import { adminController } from '@controllers/admin.controller';
import { authenticate } from '@middleware/auth.middleware';
import { requireAdmin } from '@middleware/role.middleware';
import { validate } from '@middleware/validate.middleware';
import {
  approveDonationRequestSchema,
  rejectDonationRequestSchema,
} from '@validators/donation.validator';

const router = Router();

router.use(authenticate, requireAdmin);

// Donor management
router.get('/donors', adminController.getAllDonors);
router.get('/donors/:id', adminController.getDonorById);
router.put('/donors/:id', adminController.updateDonor);
router.patch('/donors/:id/toggle-status', adminController.toggleDonorStatus);

// Request management
router.get('/requests', adminController.getAllRequests);
router.patch('/requests/:id/approve', validate(approveDonationRequestSchema), adminController.approveRequest);
router.patch('/requests/:id/reject', validate(rejectDonationRequestSchema), adminController.rejectRequest);
router.patch('/requests/:id/complete', adminController.completeRequest);

// Audit logs
router.get('/audit-logs', adminController.getAuditLogs);

export default router;
