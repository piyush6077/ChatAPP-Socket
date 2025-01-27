import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js"

export const useAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,

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

    }
}))