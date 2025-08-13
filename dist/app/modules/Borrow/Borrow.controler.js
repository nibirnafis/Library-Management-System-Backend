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
exports.borrowRoutes = void 0;
const express_1 = require("express");
const Book_model_1 = require("../Book/Book.model");
const Borrow_model_1 = require("./Borrow.model");
exports.borrowRoutes = (0, express_1.Router)();
// Borrow Book
exports.borrowRoutes.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const { book, quantity, dueDate } = body;
        const isBookExist = yield Book_model_1.Book.findById({ _id: book });
        if (!isBookExist) {
            throw new Error('Book Does Not Exist');
        }
        const borrowPayload = {
            book: book,
            quantity: quantity,
            dueDate: dueDate
        };
        yield Borrow_model_1.Borrow.deductCopies(book, quantity);
        const borrowedBook = yield Borrow_model_1.Borrow.create(borrowPayload);
        res.status(400).json({
            success: true,
            message: "Book Borrowed Successfully",
            data: borrowedBook
        });
    }
    catch (error) {
        next(error);
    }
}));
// Borrowed Book Summary
exports.borrowRoutes.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowSummary = yield Borrow_model_1.Borrow.aggregate([
            { $group: { _id: "$book", totalQuantity: { $sum: 1 } } },
            { $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                } },
            { $unwind: "$book" },
            { $project: { book: { title: "$book.title", isbn: "$book.isbn" }, totalQuantity: 1, _id: 0 } }
        ]);
        res.status(400).json({
            success: true,
            message: "Borrowed Books summary retrieved successfully",
            data: borrowSummary
        });
    }
    catch (error) {
        next(error);
    }
}));
