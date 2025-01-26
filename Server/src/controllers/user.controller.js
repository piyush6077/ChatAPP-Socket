import { User } from "../Models/User.model.js"
import bcrypt from "bcryptjs"
import { generateJwtToken } from "../utils/generateToken.js"

export const signup = async (req, res) => {
    
    try {
        const {username , fullname , email , password} =  req.body
        if (!username || !fullname || !email || !password) return res.status(400).json("All information is needed")
    
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json("user already existed")
    
        // console.log(password, fullname)
        if(password.lenght < 6 ){
            return res.status(400).json("Password must contain more than 6 letter ")
        }
        // generate hashPassword
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)
    
        // console.log(hashedPassword)
        const user = await User.create(
            {
                fullname,
                email,
                password: hashedPassword
            }
        )
        // console.log(user)
         
        if(user) {
          //JWT Token
           generateJwtToken(user._id,res)
           await user.save()
           res.status(200).json( {message:"user created successfully" , user})
        } 
        else{
           res.status(400).json("Error occured during signup")
        }

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal server error")
    }
}

export const login = async (req,res)=>{
    
    const {email , password} = req.body
    if(!email || !password){
        res.status(400).status("Fill the email and password to login")
    }

    try {        
        const user = await User.findOne({email})
        if(!user){
            res.status(400).status("Fill the email and password to login")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Incorrect password"})

        generateJwtToken(user._id,res) // Inefficient replace with RefreshToken and AccessToken

        res.status(200).json({message:"User Login successfully", user})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error occured during Login"})
    }
}

export const logout = async (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json("Something went wrong during Logout")
    }
}