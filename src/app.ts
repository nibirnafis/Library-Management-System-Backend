import express, { Application, NextFunction, Request, Response } from "express"
import cors from 'cors'
import { validationError } from "./app/Errors/Errors"
import { routes } from "./app/routes/routes"


const app: Application = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})


app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err){
        res.status(404).json({
            "message": err.message,
            "success": false,
            validationError
        })
    }
})


export default app