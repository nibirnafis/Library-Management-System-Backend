import { model, Schema, Types } from "mongoose"
import { Genre, TBook } from "./Book.interface"


export const bookSchema = new Schema<TBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: Genre, required: true },
    isbn: { type: String, unique: true, required: true },
    description: { type: String },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)



export const Book = model<TBook>("Book", bookSchema)