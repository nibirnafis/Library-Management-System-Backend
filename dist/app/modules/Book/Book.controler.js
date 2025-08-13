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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const Book_model_1 = require("./Book.model");
exports.bookRoutes = (0, express_1.Router)();
// Create Book
exports.bookRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield Book_model_1.Book.create(body);
        res.status(400).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get All Books
exports.bookRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = req.query;
        const { filter, sort, limit } = queries;
        console.log(queries);
        if (filter) {
            const books = yield Book_model_1.Book.aggregate([
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
            const books = yield Book_model_1.Book.find();
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
}));
// Get single Book
exports.bookRoutes.get('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield Book_model_1.Book.findById({ _id: bookId });
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
}));
// Update Book
exports.bookRoutes.put('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const body = req.body;
        const book = yield Book_model_1.Book.findById(id);
        if (!book) {
            throw new Error("Book Does not Exist");
        }
        const updatedBook = yield Book_model_1.Book.findByIdAndUpdate(id, body, { new: true });
        res.status(400).json({
            success: true,
            message: "Book Updated successfully",
            data: updatedBook
        });
    }
    catch (error) {
        next(error);
    }
}));
// Delete Book
exports.bookRoutes.delete('/:bookId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield Book_model_1.Book.findById({ _id: bookId });
        if (!book) {
            throw new Error("Book Does not Exist");
        }
        const deletedBook = yield Book_model_1.Book.findByIdAndDelete(bookId);
        res.status(400).json({
            success: true,
            message: "Book Deleted Successfully",
            data: deletedBook
        });
    }
    catch (error) {
        next(error);
    }
}));
