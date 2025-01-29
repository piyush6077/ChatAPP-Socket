import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isOnlineUser: [],
    isCheckingAuth: true,

    // function by name checkAuth
    checkAuth: async()=>{
        try {
            const resp = await axiosInstance.get("/auth/checkAuth")   
            set({authUser: resp.data})
        } catch (error) {
            console.log("Error on checkingAUTh" , error)
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("auth/signup", data)
            set({authUser: res.data});
            toast.success("Account created Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSignUp: false});
        }
    },

    login: async(data)=>{
        set({isLoggingIng:true})
        try {
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser: res.data});
            toast.success("Logged in Successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIng:false})
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("auth/logout")
            set({authUser: null})
        } catch (error) {
            toast.error("Logged Out Successfully")
        }
    },
    
    updateProfile: async(data)=>{
        set({isUpdatingProfile: true})
        try {
            const res = await axiosInstance.put("auth/update-profile", data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message)        
        } finally{
            set({isUpdatingProfile: false})
        }
    }
}))