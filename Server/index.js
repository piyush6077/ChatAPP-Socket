import express from "express";
import {Server} from "socket.io"
import {createServer} from "http";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express()
const server = createServer(app);
const io = new Server(server , {
    cors: {
        origin:"http://localhost:5173",
        methods: ["GET","POST"],
        credentials:true,
    }
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

import { mongoose } from "mongoose";

const MongoURI = process.env.MONGOURI;

mongoose.connect(MongoURI)
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log(`Error connecting to mongoDb: ${err}`)
    })


server.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
})