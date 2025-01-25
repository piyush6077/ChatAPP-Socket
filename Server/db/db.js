import { mongoose } from "mongoose";

// const MongoURI = process.env.MONGOURI;

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGOURI)
        console.log("MongoDB connected")
    }
    catch(err){
           console.log(`Error connecting to mongoDb: ${err}`)
           process.exit(1)
    }
}

export default connectDB;
