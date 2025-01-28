import {create} from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

export const useChatstore = create((set)=>({
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

    setSelectedUser: async(selectedUser) => set({selectedUser: selectedUser})
}))