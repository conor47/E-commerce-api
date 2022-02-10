import express from 'express';
import {
  getAllUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  getSingleUser,
} from '../controllers/userControllers';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

router.get('/', authenticateUser, getAllUsers);
router.get('/showMe', showCurrentUser);
router.patch('/updateUser', updateUser);
router.patch('/updateUserPassword', updateUserPassword);
router.get('/:id', authenticateUser, getSingleUser);

export default router;
