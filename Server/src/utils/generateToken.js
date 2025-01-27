import jwt from "jsonwebtoken"

export const generateJwtToken = (userId, res)=>{
    
   try {
     const token = jwt.sign({userId},process.env.JWTSECRET , {expiresIn:"7d"})
 
     res.cookie("jwt",token,{
         maxAge: 7*24*60*60*1000,
         httpOnly: true,
         sameSite: "strict",
         secure: process.env.NODEENV !== "development"
     })
    console.log("JWT token generated and set in cookie.");
    } catch (error) {
        console.error("Error generating JWT token:", error.message);
        res.status(500).json({ message: "Error generating token" });
    }
}