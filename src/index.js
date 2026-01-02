import mongoose from "mongoose";
import connectDB from "./db/index.js"
import { app } from "./app.js"

import dotenv from "dotenv"
dotenv.config({path: "../env"})



connectDB()
.then(()=>{
  app.listen(process.env.PORT, ()=>{
    console.log("App is Listening now")
  })
})
.catch((err)=>{
  console.log("MongoDB Connecion Error", err)
})













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
