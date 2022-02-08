import express, { Request, Response } from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

import notFoundMiddlware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authRouter from './routes/authRoutes';
import { connectDB } from './db/connect';
import 'express-async-errors';

const app = express();

// middleware
app.use(morgan('tiny'));
app.use(express.json());

// routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Api');
});

app.use('/api/v1/auth', authRouter);

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
