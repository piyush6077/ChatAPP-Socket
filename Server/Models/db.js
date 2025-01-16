import { mongoose } from "mongoose";

const MongoURI = process.env.MONGOURI;

mongoose.connect(MongoURI)
    .then(()=>{
        console.log("MongoDB connected")
    })
    .catch((err)=>{
        console.log(`Error connecting to mongoDb: ${err}`)
    })