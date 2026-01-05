import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

import dotenv from "dotenv"
dotenv.config({path: "../../env"})

const connectDB = async () =>{
    try {
        const mongoDB_res = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("\n⚙  DB Successfully Connected!!", mongoDB_res.connection.host)
    } catch (error) {
        console.log("😢  MONGODB connection Error:", error);
        process.exit(1)
    }
}

export default connectDB