import express, { Request, Response } from 'express';
import morgan from 'morgan';
require('express-async-errors');
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

import notFoundMiddlware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';
import reviewRouter from './routes/reviewRoutes';
import orderRouter from './routes/orderRoutes';
import { connectDB } from './db/connect';
import 'express-async-errors';
import { User } from './utils/jwt';

const app = express();

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

// middleware
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static(__dirname + '/public'));

app.use(fileUpload());

// routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
// middleware
app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL!);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
