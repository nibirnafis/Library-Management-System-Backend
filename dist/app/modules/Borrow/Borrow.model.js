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
exports.Borrow = exports.borrowSchema = void 0;
const mongoose_1 = require("mongoose");
const Book_model_1 = require("../Book/Book.model");
exports.borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Types.ObjectId, ref: "TBook", required: true },
    quantity: { type: Number, min: 1, required: true },
    dueDate: { type: Date, required: true }
}, {
    versionKey: false,
    timestamps: true
});
exports.borrowSchema.statics.deductCopies = (bookId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield Book_model_1.Book.findById({ _id: bookId });
    if (!book) {
        throw new Error('Book Does Not Exist');
    }
    if (book.copies < quantity) {
        throw new Error('Not enough copies');
    }
    book.copies = book.copies - quantity;
    if (book.copies < 1) {
        book.available = false;
        yield Book_model_1.Book.findByIdAndUpdate(book._id, book);
    }
    else {
        yield Book_model_1.Book.findByIdAndUpdate(book._id, book);
    }
});
exports.borrowSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let book = this;
        console.log(`Book ${book.book} will be Borrowed`);
    });
});
exports.borrowSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let book = this;
        console.log(`Book ${book.book} has been Borrowed`);
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", exports.borrowSchema);
