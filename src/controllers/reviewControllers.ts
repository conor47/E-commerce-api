import express, { Request, Response } from 'express';
import Review from '../models/Review';

export const createReview = async (req: Request, res: Response) => {
  res.send('create review');
};

export const getAllReviews = async (req: Request, res: Response) => {
  res.send('get all reviews');
};

export const getSingleReview = async (req: Request, res: Response) => {
  res.send('get single review');
};

export const updateReview = async (req: Request, res: Response) => {
  res.send('update review');
};

export const deleteReview = async (req: Request, res: Response) => {
  res.send('delete Review');
};
