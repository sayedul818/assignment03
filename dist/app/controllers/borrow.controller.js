"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, quantity, dueDate } = req.body;
    // Step 1: Find the book
    const foundBook = yield book_model_1.default.findById(book);
    // Step 2: Check if enough copies
    if (!foundBook || foundBook.copies < quantity) {
        return res.status(400).json({
            success: false,
            message: 'Not enough copies available',
        });
    }
    // Step 3: Deduct quantity and update availability
    foundBook.copies = foundBook.copies - quantity;
    if (foundBook.copies === 0) {
        foundBook.available = false;
    }
    yield foundBook.save();
    // Step 4: Create Borrow record
    const borrowRecord = yield borrow_model_1.default.create({ book, quantity, dueDate });
    res.status(201).json({
        success: true,
        message: 'Book borrowed successfully',
        data: borrowRecord,
    });
}));
// Step 5: Get all borrowed books with summary
exports.borrowRouter.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const summary = yield borrow_model_1.default.aggregate([
        {
            $group: {
                _id: '$book',
                totalQuantity: { $sum: '$quantity' }
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: '_id',
                foreignField: '_id',
                as: 'book'
            }
        },
        { $unwind: '$book' },
        {
            $project: {
                _id: 0,
                totalQuantity: 1,
                book: {
                    title: '$book.title',
                    isbn: '$book.isbn'
                }
            }
        }
    ]);
    res.status(200).json({
        success: true,
        message: 'Borrowed books summary retrieved successfully',
        data: summary
    });
}));
