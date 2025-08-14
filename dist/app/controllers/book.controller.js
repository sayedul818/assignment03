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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../models/book.model"));
exports.bookRouter = express_1.default.Router();
// 1. Create Book
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.create(req.body);
    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: book,
    });
}));
// 2. Get All Books with Filtering, Sorting, Limiting
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const books = yield book_model_1.default.find(query)
        .sort({ [sortBy]: sort === 'asc' ? 1 : -1 })
        .limit(Number(limit));
    res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        data: books,
    });
}));
// 3. Get Book by ID
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findById(req.params.bookId);
    res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        data: book,
    });
}));
// 4. Update Book
exports.bookRouter.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield book_model_1.default.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
    });
    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook,
    });
}));
// 5. Delete Book
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield book_model_1.default.findByIdAndDelete(req.params.bookId);
    res.status(200).json({
        success: true,
        message: 'Book deleted successfully',
        data: null,
    });
}));
