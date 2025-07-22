import dotenv  from "dotenv";
import mongoose from "mongoose";
dotenv.config()

if(!process.env.MONGODB_URL){
    throw new Error(
        "db url not found"
    )
}
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("mongodb connect error ",error);
        process.exit(1);
    }
}
export default connectDB