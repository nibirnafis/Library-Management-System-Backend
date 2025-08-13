import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
import app from "./app";
import { error } from "console";

const port = process.env.PORT || 5000
const mongoURI = process.env.MONGO_URI as string


const startServer = async() =>{
    try{
        await mongoose.connect(mongoURI);
        app.listen(port, () => {
            console.log(`This app is listining on port ${port}`)
        })
    }catch{
        console.log(error, "Connection Error")
    }
}


startServer()