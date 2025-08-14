import express, { Request, Response } from 'express';
import Borrow from '../models/borrow.model';
import Book from '../models/book.model';

export const borrowRouter = express.Router();

borrowRouter.post('/', async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;

  const foundBook = await Book.findById(book);
  if (!foundBook) return res.status(404).json({ message: "Book not found" });

  const message = foundBook.borrowBook(quantity);
  await foundBook.save();

  const borrowRecord = await Borrow.create({ book: book, quantity, dueDate });

  res.status(201).json({ message, data: borrowRecord });

});

// Step 5: Get all borrowed books with summary
borrowRouter.get('/', async (_req: Request, res: Response) => {
    const summary = await Borrow.getBorrowSummary(); // call static directly
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary
    });
  
});

