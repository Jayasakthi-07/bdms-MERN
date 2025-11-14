import { Router } from 'express';
import { metricsController } from '@controllers/metrics.controller';
import { authenticate } from '@middleware/auth.middleware';
import { requireAdmin } from '@middleware/role.middleware';

const router = Router();

router.use(authenticate, requireAdmin);

router.get('/summary', metricsController.getDashboardSummary);
router.get('/blood-group-distribution', metricsController.getBloodGroupDistribution);
router.get('/inventory-by-blood-group', metricsController.getInventoryByBloodGroup);
router.get('/monthly-donations', metricsController.getMonthlyDonations);
router.get('/request-status', metricsController.getRequestStatusBreakdown);
router.get('/fulfillment-rate', metricsController.getFulfillmentRate);
router.get('/average-lead-time', metricsController.getAverageLeadTime);

export default router;
