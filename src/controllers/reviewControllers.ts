import express, { Request, Response } from 'express';

import Review from '../models/Review';
import Product from '../models/Product';
import { StatusCodes } from 'http-status-codes';
import { checkPermissions } from '../utils';
import { BadRequestError, NotFoundError } from '../errors';

export const createReview = async (req: Request, res: Response) => {
  const { product: productId } = req.body;
  const productIsValid = await Product.findById(productId);

  if (!productIsValid) {
    throw new NotFoundError(`No product with id : ${productId}`);
  }

  const sumbmitted = await Review.findOne({
    product: productId,
    user: req.user!.userId,
  });
  if (sumbmitted) {
    throw new BadRequestError('Already submitted a review for this project');
  }

  req.body.user = req.user!.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};

export const getAllReviews = async (req: Request, res: Response) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

export const getSingleReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new NotFoundError(`No review exists with id : ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review });
};

export const updateReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`Review not found with id : ${reviewId}`);
  }

  checkPermissions(req.user!, review.user._id);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ review });
};

export const deleteReview = async (req: Request, res: Response) => {
  const { id: reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new NotFoundError(`Review not found with id : ${reviewId}`);
  }

  checkPermissions(req.user!, review.user._id);
  await review.remove();
  res.status(StatusCodes.OK).json({ msg: 'Review was successfully removed' });
};
