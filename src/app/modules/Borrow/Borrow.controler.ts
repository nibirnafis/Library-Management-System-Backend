import { NextFunction, Request, Response, Router } from "express";
import { Book } from "../Book/Book.model";
import { Borrow } from "./Borrow.model";
import { TBorrow } from "./Borrow.interface";


export const borrowRoutes = Router()



// Borrow Book
borrowRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const body = req.body
        const { book, quantity, dueDate } = body
        const isBookExist = await Book.findById({_id: book})

        if(!isBookExist){
            throw new Error('Book Does Not Exist')
        }
        
        const borrowPayload: TBorrow = {
            book: book,
            quantity: quantity,
            dueDate: dueDate
        }

        await Borrow.deductCopies(book, quantity)
        const borrowedBook = await Borrow.create(borrowPayload)

        res.status(400).json({
            success: true,
            message: "Book Borrowed Successfully",
            data: borrowedBook
        })
        

    } catch (error) {
        next(error)
    }
})





// Borrowed Book Summary
borrowRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const borrowSummary = await Borrow.aggregate([
            {$group: {_id: "$book", totalQuantity: {$sum: 1}} },
            {$lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "book"
            }},
            { $unwind: "$book" },
            { $project: { book: { title: "$book.title", isbn: "$book.isbn" }, totalQuantity: 1, _id: 0 } }
        ])

        res.status(400).json({
            success: true,
            message: "Borrowed Books summary retrieved successfully",
            data: borrowSummary
        })

    } catch (error) {
        next(error)
    }
})