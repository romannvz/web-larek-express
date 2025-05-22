import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import productsRouter from './routes/products';
import ordersRouter from './routes/orders';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';
import config from './config';

const { PORT, DB_ADDRESS } = config;

const app = express();
app.use(requestLogger);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(DB_ADDRESS);

app.use('/product', productsRouter);
app.use('/order', ordersRouter);
app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  const now = new Date();
  console.log(
    `Server started at ${now.toLocaleString()}. Listening on port ${PORT}`,
  );
});
