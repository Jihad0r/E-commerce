import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./auth.route.js"
import { connectDB } from "./connectDB.js";


dotenv.config()
const app = express()
const port = process.env.PORT||5000

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use("/api/auth",authRoutes)


app.listen(port,()=>{
    console.log("Server running")
    connectDB()
})