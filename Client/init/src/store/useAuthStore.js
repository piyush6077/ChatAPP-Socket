import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"
import { io } from "socket.io-client"   

const BaseUrl = "http://localhost:5001";

export const useAuthStore = create((set,get)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isOnlineUsers: [],
    isCheckingAuth: true,
    socket : null,


    // function by name checkAuth
    checkAuth: async()=>{
        try {
            const resp = await axiosInstance.get("/auth/checkAuth")   
            set({authUser: resp.data})
            get().connectSocket()
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
            get().connectSocket()
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
            get().connectSocket()
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
            toast.error("Logged Out Successfully")
            get().disconnectedSocket()
        } catch (error) {
            toast.error(error.response.data.message)            
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
    },

    connectSocket: ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;
        
        const socket = io(BaseUrl, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()

        set({socket})
   
        socket.on("getOnlineUsers" ,(userIds)=>{
            set({isOnlineUsers: userIds})
        })
    },

    disconnectedSocket: ()=>{
        // if you are connected disconnect
        if(get().socket?.connected) get().socket.disconnect();
    }
}))