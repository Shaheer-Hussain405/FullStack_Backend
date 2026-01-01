import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js"

import express from "express"
const app = express()

import dotenv from "dotenv"
dotenv.config({path: "../env"})



connectDB()










/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (err)=>{
      console.log("DB was not Operated", err)
      throw err
    })

    app.listen(process.env.PORT, ()=>{
      console.log("The app is listening on port", process.env.PORT);
    })
  } catch (error) {
    console.log("Error:",error)
    throw error
  }
})();
*/
