import { Router } from 'express';
import { userController } from '@controllers/user.controller';
import { authenticate } from '@middleware/auth.middleware';
import { requireDonor } from '@middleware/role.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.post('/me/change-password', userController.changePassword);
router.delete('/me', userController.deleteAccount);

// Donor-specific routes
router.get('/me/history', requireDonor, userController.getDonationHistory);
router.get('/me/eligibility', requireDonor, userController.getEligibility);

export default router;
