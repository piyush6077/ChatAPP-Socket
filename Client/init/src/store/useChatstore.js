import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"
import { ChartNoAxesColumnDecreasing } from "lucide-react"

export const useChatstore = create((set,get)=>({
    message: [],
    users: [],
    selectedUser: null,
    isMessageLoading: false,    
    isUserLoading: false,

    getUsers: async() =>{
        set({isUserLoading: true})
        try {
            const res = await axiosInstance.get("/messages/user")
            set({users: res.data})
            console.log(res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isUserLoading: false })
        }
    },

    getMessages: async(userId)=>{
        const {selectedUser, message} = get();

        set({isMessageLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            console.log("response data from getMessages" , res.data)
            set({message: res.data})
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message || "error getting the messages");
        } finally {
            set({isMessageLoading: false})
        }
    },

    sendMessage: async(messageData) => {
        const {selectedUser, message} = get();

        if (!selectedUser) {
            console.error("Selected user is null.");
            toast.error("Please select a user to send the message.");
            return;
        }
        
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            console.log(messageData);
            console.log("message from selectedUsr res : " ,res.data)
            set({ message: [...message, res.data] });
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Error sending message");
        }
    },

    setSelectedUser: async(selectedUser) => {
        set({selectedUser})
        console.log(selectedUser)
    }
}))