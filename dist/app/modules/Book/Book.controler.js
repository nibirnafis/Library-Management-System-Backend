"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const Book_model_1 = require("./Book.model");
exports.bookRoutes = (0, express_1.Router)();
// Create Book
exports.bookRoutes.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        const book = await Book_model_1.Book.create(body);
        res.status(400).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
// Get All Books
exports.bookRoutes.get('/', async (req, res, next) => {
    try {
        const queries = req.query;
        const { filter, sort, limit } = queries;
        console.log(queries);
        if (filter) {
            const books = await Book_model_1.Book.aggregate([
                { $match: { genre: filter } },
                { $sort: { createdAt: sort === "asc" ? 1 : -1 } },
                { $limit: Number(limit) || 10 }
            ]);
            res.status(400).json({
                success: true,
                message: "Books Retrived successfully",
                data: books
            });
        }
        else {
            const books = await Book_model_1.Book.find();
            res.status(400).json({
                success: true,
                message: "Books Retrived successfully",
                data: books
            });
        }
    }
    catch (error) {
        next(error);
    }
});
// Get single Book
exports.bookRoutes.get('/:bookId', async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book_model_1.Book.findById({ _id: bookId });
        if (!book) {
            throw new Error("Book Does not Exist");
        }
        res.status(400).json({
            success: true,
            message: "Book Retrived successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
});
// Update Book
exports.bookRoutes.put('/:bookId', async (req, res, next) => {
    try {
        const id = req.params.bookId;
        const body = req.body;
        const book = await Book_model_1.Book.findById(id);
        if (!book) {
            throw new Error("Book Does not Exist");
        }
        const updatedBook = await Book_model_1.Book.findByIdAndUpdate(id, body, { new: true });
        res.status(400).json({
            success: true,
            message: "Book Updated successfully",
            data: updatedBook
        });
    }
    catch (error) {
        next(error);
    }
});
// Delete Book
exports.bookRoutes.delete('/:bookId', async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book_model_1.Book.findById({ _id: bookId });
        if (!book) {
            throw new Error("Book Does not Exist");
        }
        const deletedBook = await Book_model_1.Book.findByIdAndDelete(bookId);
        res.status(400).json({
            success: true,
            message: "Book Deleted Successfully",
            data: deletedBook
        });
    }
    catch (error) {
        next(error);
    }
});
