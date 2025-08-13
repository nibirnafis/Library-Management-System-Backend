"use strict";
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
exports.borrowSchema.statics.deductCopies = async (bookId, quantity) => {
    const book = await Book_model_1.Book.findById({ _id: bookId });
    if (!book) {
        throw new Error('Book Does Not Exist');
    }
    if (book.copies < quantity) {
        throw new Error('Not enough copies');
    }
    book.copies = book.copies - quantity;
    if (book.copies < 1) {
        book.available = false;
        await Book_model_1.Book.findByIdAndUpdate(book._id, book);
    }
    else {
        await Book_model_1.Book.findByIdAndUpdate(book._id, book);
    }
};
exports.borrowSchema.pre('save', async function () {
    const doc = this;
    console.log(`Book ${doc.book} will be Borrowed`);
});
exports.borrowSchema.post('save', async function () {
    const doc = this;
    console.log(`Book ${doc.book} has been Borrowed`);
});
exports.Borrow = (0, mongoose_1.model)("Borrow", exports.borrowSchema);
