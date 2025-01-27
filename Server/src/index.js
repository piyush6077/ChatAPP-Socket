import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv"
import MessageRoutes from "./routes/message.route.js"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
dotenv.config(
    
)


const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
    // limit: "16kb"
})
)
app.use(cookieParser())

//routes
app.use("/api/v1/users", authRoutes)
app.use("/api/v1/message", MessageRoutes)



app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
    connectDB()
})