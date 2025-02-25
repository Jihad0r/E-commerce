import jwt from "jsonwebtoken"
export const generateTokensAndSetCookie = (userId,res)=>{
   const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
   res.cookie("jwt",token,{
    maxAge: 1*60*60*1000,
    httpOnly:true,
    sameSite:"strict",
   })
}