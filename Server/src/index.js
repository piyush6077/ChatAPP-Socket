import express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv"
import userRouter from "./routes/auth.route.js"
dotenv.config()


const app = express();
const PORT = process.env.PORT || 5001

app.use(express.json())

//routes
app.use("/api/v1/users", userRouter)


app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
    connectDB()
})