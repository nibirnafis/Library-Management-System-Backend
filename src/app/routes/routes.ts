import { Router } from "express";
import { bookRoutes } from "../modules/Book/Book.controler";
import { borrowRoutes } from "../modules/Borrow/Borrow.controler";


export const routes = Router()


routes.use('/books', bookRoutes)
routes.use('/borrow', borrowRoutes)