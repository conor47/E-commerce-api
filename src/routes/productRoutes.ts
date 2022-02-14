import express from 'express';
import {
  uploadImage,
  deleteProduct,
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/productControllers';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';

const router = express.Router();

router.post(
  '/',
  authenticateUser,
  authorizePermissions('admin'),
  createProduct
);

router.get('/', getAllProducts);

router.post(
  '/uploadImage',
  authenticateUser,
  authorizePermissions('admin'),
  uploadImage
);

router.get('/:id', getSingleProduct);

router.patch(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  updateProduct
);

router.delete(
  '/:id',
  authenticateUser,
  authorizePermissions('admin'),
  deleteProduct
);

export default router;
