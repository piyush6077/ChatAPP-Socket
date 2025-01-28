import jwt from "jsonwebtoken"
import { User } from "../Models/User.model.js";

export const protectedRoute = async (req,res,next)=>{
    try {
        
        const token = req.cookies.jwt
        if (!token){
            return res.status(400).json({message:"Invalid - Token is missing"})
        }
 
        const decoded = jwt.verify(token , process.env.JWTSECRET)
        if(!decoded){
            return res.status(400).json({message:"Invalid Unautorized Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) {
            return res.status(400).json({message:"user not found"})
        }
 
        req.user = user
        next();

   } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal error"})
   }
}