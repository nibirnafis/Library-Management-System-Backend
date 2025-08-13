import { model, ObjectId, Schema, Types } from "mongoose";
import { BorrowModel, TBorrow } from "./Borrow.interface";
import { Book } from "../Book/Book.model";
import { TBook } from "../Book/Book.interface";



export const borrowSchema = new Schema<TBorrow>(
  {
    book: { type: Types.ObjectId, ref: "TBook", required: true },
    quantity: { type: Number, min: 1, required: true },
    dueDate: { type: Date, required: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)


borrowSchema.statics.deductCopies = async (bookId: string, quantity: number): Promise<void> => {

  const book = await Book.findById({_id: bookId})
  
    if(!book){
        throw new Error('Book Does Not Exist')
    }

    if(book.copies < quantity){
      throw new Error('Not enough copies')
      
  }

  book.copies = book.copies - quantity

  if(book.copies < 1){
      book.available = false
      await Book.findByIdAndUpdate(book._id, book)
  }else{
      await Book.findByIdAndUpdate(book._id, book)
  }
}



borrowSchema.pre('save', async function(){
  let doc: Partial<TBorrow> = this
  console.log(`Book ${doc.book} will be Borrowed`)
})




borrowSchema.post('save', async function(){
  let doc: Partial<TBorrow> = this
  console.log(`Book ${doc.book} has been Borrowed`)
})


export const Borrow = model<TBorrow, BorrowModel>("Borrow", borrowSchema)