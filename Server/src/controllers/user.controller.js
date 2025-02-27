import { User } from "../Models/User.model.js"
import bcrypt from "bcryptjs"
import { generateJwtToken } from "../utils/generateToken.js"
import cloudinary from "../utils/cloudinary.js"

export const signup = async (req, res) => {
    
    try {
        const {fullname , email , password} =  req.body
        if (!fullname || !email || !password) return res.status(400).json("All information is needed")
    
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json("user already existed")
    
        // console.log(password, fullname)
        if(password.length < 6 ){
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
        //    await user.save()
           return res.status(200).json( {message:"user created successfully" , user})
        } 
        else{
           return res.status(400).json("Error occured during signup")
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
        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Incorrect password"})
        }
        generateJwtToken(user._id,res) // Inefficient replace with RefreshToken and AccessToken
        return res.status(200).json({message:"User Login successfully", user})

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

// Add Multer functionality
export const updateProfile = async (req, res)=>{
    try {
        const { profilePic } = req.body
        // const userId = req.user._id
        console.log(profilePic)
        if(!profilePic){
            return res.status(400).json({message:"Profile pic required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        if(!uploadResponse) return res.status(400).json({message:"Error while uploading to cloudinary"})
    
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        )

        return res
        .status(200)
        .json({sucess:"true", user , message: "Profile pic Updated"})

    } catch (error) {
        console.log(error)
        res.status(400).json({success:"false", message:"Profile pIc Update failed"})
    }

}

export const checkUser = async (req, res)=>{
    // const authUser = await User.findById(req.user._id)
    try {
        return res.status(200).json(req.user)
    } catch (error) {
    return res.status(404).json({success:"false", message:"User not found"})
}
}
