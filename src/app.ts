import express, { Request, Response } from 'express';
import { errorHandler } from './app/middlewares/errorHandler';
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';

const app = express();
app.use(express.json());

app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

app.use(errorHandler);

app.get('/', async (req : Request, res : Response) => {
  res.send(' Library API is running');
});

export default app;