import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv"
import MessageRoutes from "./routes/message.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./utils/socket.js";
dotenv.config()


const PORT = process.env.PORT || 5001

app.use(express.json({ limit: '10mb' })); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
})
)
app.use(cookieParser())

//routes
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/messages", MessageRoutes)


server.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
    connectDB()
})