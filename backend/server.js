import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./auth.route.js"
import { connectDB } from "./connectDB.js";


dotenv.config()
const app = express()
const __dirname = path.resolve();
const port = process.env.PORT||5000

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use("/api/auth",authRoutes)

	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});

app.listen(port,()=>{
    console.log("Server running")
    connectDB()
})