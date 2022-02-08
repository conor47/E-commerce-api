import { createBuilderStatusReporter } from 'typescript';

const mongoose = require('mongoose');

export const connectDB = (url: string): Promise<void> => {
  return mongoose.connect(url);
};
