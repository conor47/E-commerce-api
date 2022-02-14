import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewControllers';
import { authenticateUser } from '../middleware/authentication';

const router = express.Router();

router.post('/', authenticateUser, createReview);
router.get('/', getAllReviews);
router.get('/:id', getSingleReview);
router.patch('/:id', authenticateUser, updateReview);
router.delete('/:id', authenticateUser, deleteReview);

export default router;
