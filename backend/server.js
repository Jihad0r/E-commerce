import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import authRoutes from "./auth.route.js"
import cartRoutes from "./cart.route.js"
import { connectDB } from "./connectDB.js";

dotenv.config();
const app = express()
const port = process.env.PORT||5000

const __dirname = path.resolve();
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/cart",cartRoutes)
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});
}
app.listen(port,()=>{
    console.log("Server running")
    connectDB()
})