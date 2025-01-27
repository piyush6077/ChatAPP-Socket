import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    api_Key : process.env.CLOUDINARY_API_KEY ,
    api_Secret : process.env.CLOUDINARY_API_SECRET 
})

export default cloudinary;