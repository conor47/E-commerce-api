import express from 'express';

import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';
import {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrder,
  updateOrder,
} from '../controllers/orderControllers';

const router = express.Router();

router.post('/', authenticateUser, createOrder);
router.get('/', authenticateUser, authorizePermissions('admin'), getAllOrders);
router.get('/showAllMyOrders', authenticateUser, getCurrentUserOrders);
router.get('/:id', authenticateUser, getSingleOrder);
router.patch('/:id', authenticateUser, updateOrder);

export default router;
