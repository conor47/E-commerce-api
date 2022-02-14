import validator from 'validator';
import mongoose, { Schema, model } from 'mongoose';
import { User } from './User';
import { Product } from './Product';

export interface Review {
  rating: number;
  title: string;
  comment: string;
  user: User;
  product: Product;
}

const ReviewSchema = new Schema<Review>(
  {
    rating: {
      type: Number,
      required: [true, 'Please provde rating'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provde review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provde review comment'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

const ReviewModel = model<Review>('Review', ReviewSchema);
export default ReviewModel;
