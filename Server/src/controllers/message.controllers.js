import { User } from "../Models/User.model.js"
import { Message } from "../Models/Messages.model.js"
import cloudinary from "../utils/cloudinary.js"

export const generateUserForSideBar = async (req, res)=>{
    try {
        const loggedInUser = req.user._id
        if(!loggedInUser) return res.status(404).json({message:"user is not logged in "})
    
        // find All User Logic 
        const filterdUser = await User.find({_id: {$ne: loggedInUser} }).select("-password")
        res.status(200).json(filterdUser)
    } catch (error) {
        console.error(error)
        res.status(500).json("filed to access all users")
    }
}

export const getUserChatHistory = async (req, res)=>{

    try {
        const {id:userToChatId} = req.params
        const myId = req.user?._id
    
        const message = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {receiverId: myId, senderId: userToChatId}
            ]
        })
        console.log('myId:', myId, 'userToChatId:', userToChatId);


        return res.status(200).json(message)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"error occurred during fetching messages"})
    }
} 

export const sendMessage = async ( req, res)=>{
    try{
        const {text, image} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user?._id

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
            console.log('Uploaded Image URL:', imageUrl);
        }
        // console.log('Uploaded Image URL:', imageUrl);


        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        // Real time logic using Socket.io 

        res.status(200).json(newMessage)
    }catch(error){
        console.log(error)
        res.status(400).json("Internal server error")
    }
}
