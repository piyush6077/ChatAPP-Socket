import jwt from "jsonwebtoken"

export const generateJwtToken = (userId, res)=>{
    
    const token = jwt.sign({userId},process.env.JWTSECRET , {expiresIn:"7d"})

    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODEENV !== "development"
    })
}