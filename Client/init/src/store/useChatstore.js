import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

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
        set({isMessageLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`)
            set({message: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
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