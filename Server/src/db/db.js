import { mongoose } from "mongoose";

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGOURI)
        console.log(`MongoDb Connected ${conn.connection.host}`)
    }
    catch(err){
           console.log(`Error connecting to mongoDb: ${err}`)
           process.exit(1)
    }
}

export default connectDB;
