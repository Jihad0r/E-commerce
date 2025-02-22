import express from "express"
import {AddToCart,GetCart,DeleteCart,UpdateCart,DeleteFromCart }from "./cart.js"
import { protactRouter } from "./protactRouter.js"

const router = express.Router()


router.post("/add",protactRouter,AddToCart)
router.delete("/deleteall",protactRouter,DeleteCart)
router.delete("/delete",protactRouter,DeleteFromCart)
router.put("/update",protactRouter,UpdateCart)
router.get("/",protactRouter,GetCart)

export default router