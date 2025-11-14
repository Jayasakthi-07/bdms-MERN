import { Router } from 'express';
import { inventoryController } from '@controllers/inventory.controller';
import { authenticate } from '@middleware/auth.middleware';
import { requireAdmin } from '@middleware/role.middleware';
import { validate } from '@middleware/validate.middleware';
import { createInventorySchema, updateInventorySchema } from '@validators/inventory.validator';

const router = Router();

router.use(authenticate);

// Public inventory routes (for donors to see availability)
router.get('/', inventoryController.getAllInventory);
router.get('/summary', inventoryController.getInventorySummary);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/:id', inventoryController.getInventoryById);

// Admin-only routes
router.post('/', requireAdmin, validate(createInventorySchema), inventoryController.createInventory);
router.patch('/:id', requireAdmin, validate(updateInventorySchema), inventoryController.updateInventory);
router.delete('/:id', requireAdmin, inventoryController.deleteInventory);

export default router;
