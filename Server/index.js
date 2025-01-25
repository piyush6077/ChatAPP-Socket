import express from "express";
import {Server} from "socket.io"
import {createServer} from "http";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./db/db.js";
dotenv.config();

const app = express()
const server = createServer(app);
const io = new Server(server , {
    cors: true,
});


app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello world")
})

io.on("connection",(socket)=>{
    console.log("User connection")
    console.log("id" , socket.id)
    socket.emit("welcome", `Welcome to the chat : ${socket.id}`)
})


const PORT = process.env.PORT || 5000 

connectDB()
.then(()=>{
    server.listen(PORT , ()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MongoDb Connection error: ", error)
})