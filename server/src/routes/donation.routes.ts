import { Router } from 'express';
import { donationController } from '@controllers/donation.controller';
import { authenticate } from '@middleware/auth.middleware';
import { requireDonor } from '@middleware/role.middleware';
import { validate } from '@middleware/validate.middleware';
import { createDonationRequestSchema } from '@validators/donation.validator';

const router = Router();

router.use(authenticate, requireDonor);

router.post('/', validate(createDonationRequestSchema), donationController.createRequest);
router.get('/', donationController.getMyRequests);
router.get('/:id', donationController.getRequestById);
router.patch('/:id/cancel', donationController.cancelRequest);

export default router;
