import express from "express"
import {signup,login,logout,myaccount} from "./auth.js"
import { protactRouter } from "./protactRouter.js"


const router = express.Router()


router.post("/signup",signup)
router.get("/myaccount",protactRouter,myaccount)
router.post("/login",login)
router.post("/logout",logout)

export default router