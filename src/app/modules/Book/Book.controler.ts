import { NextFunction, Request, Response, Router } from "express";
import { Book } from "./Book.model";


export const bookRoutes = Router()



// Create Book
bookRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const body = req.body
        const book = await Book.create(body)

        res.status(400).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        next(error)
    }
})





// Get All Books
bookRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const queries = req.query
        const { filter, sort, limit } = queries
        console.log(queries)

        if(filter){
            const books = await Book.aggregate([
                {$match: {genre: filter}},
                {$sort: {createdAt: sort === "asc" ? 1 : -1}},
                {$limit: Number(limit) || 10}
            ])

            res.status(400).json({
            success: true,
            message: "Books Retrived successfully",
            data: books
            })
        }else{
            const books = await Book.find()
    
            res.status(400).json({
                success: true,
                message: "Books Retrived successfully",
                data: books
            })
        }

    } catch (error) {
        next(error)
    }
})





// Get single Book
bookRoutes.get('/:bookId', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const bookId = req.params.bookId
        const book = await Book.findById({_id: bookId})

        if(!book){
            throw new Error("Book Does not Exist")
        }

        res.status(400).json({
        success: true,
        message: "Book Retrived successfully",
        data: book
        })
    } catch (error) {
        next(error)
    }
})





// Update Book
bookRoutes.put('/:bookId', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const id = req.params.bookId
        const body = req.body
        const book = await Book.findById(id)

        if(!book){
            throw new Error("Book Does not Exist")
        }
        
        const updatedBook = await Book.findByIdAndUpdate(id, body, {new: true})
        res.status(400).json({
            success: true,
            message: "Book Updated successfully",
            data: updatedBook
        })

    } catch (error) {
        next(error)
    }
})





// Delete Book
bookRoutes.delete('/:bookId', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const bookId = req.params.bookId
        const book = await Book.findById({_id: bookId})

        if(!book){
            throw new Error("Book Does not Exist")
        }
        
        const deletedBook = await Book.findByIdAndDelete(bookId)
        res.status(400).json({
            success: true,
            message: "Book Deleted Successfully",
            data: deletedBook
        })

    } catch (error) {
        next(error)
    }
})