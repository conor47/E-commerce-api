import { createBuilderStatusReporter } from 'typescript';

const mongoose = require('mongoose');

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

module.exports = connectDB;
