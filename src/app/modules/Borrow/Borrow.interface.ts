import { Model, ObjectId } from "mongoose";
import { TBook } from "../Book/Book.interface";


export interface TBorrow {
    book: ObjectId,
    quantity: number,
    dueDate: Date
}


export interface BorrowModel extends Model<TBorrow> {
  deductCopies(bookId: TBook, quantity: number): Promise<void>;
}