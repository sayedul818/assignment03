import express, { Request, Response } from 'express';
import Book from '../models/book.model';

export const bookRouter = express.Router();

// 1. Create Book
bookRouter.post('/create-book/', async (req: Request, res: Response) => {
  const body = req.body;
  const book = await Book.create(body);

  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: book,
  });
});

// 2. Get All Books with Filtering, Sorting, Limiting
bookRouter.get('/', async (req: Request, res: Response) => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;

  const query: any = {};
  if (filter) {
    query.genre = filter;
  }

  const books = await Book.find(query)
    .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  });
});

// 3. Get Book by ID
bookRouter.get('/:bookId', async (req: Request, res: Response) => {
  const book = await Book.findById(req.params.bookId);

  res.status(200).json({
    success: true,
    message: 'Book retrieved successfully',
    data: book,
  });
});

// 4. Update Book
bookRouter.patch('/:bookId', async (req: Request, res: Response) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });
});

// 5. Delete Book
bookRouter.delete('/:bookId', async (req: Request, res: Response) => {
  await Book.findByIdAndDelete(req.params.bookId);

  res.status(200).json({
    success: true,
    message: 'Book deleted successfully',
    data: null,
  });
});
