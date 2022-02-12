import express from 'express';
import {
  getAllUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getSingleUser,
} from '../controllers/userControllers';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication';

const router = express.Router();

router.get(
  '/',
  authenticateUser,
  authorizePermissions('admin', 'owner'),
  getAllUsers
);
router.get('/showMe', authenticateUser, showCurrentUser);
router.patch('/updateUser', updateUser);
router.patch('/updateUserPassword', updateUserPassword);
router.get('/:id', authenticateUser, getSingleUser);

export default router;
