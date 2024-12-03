import mongoose from "mongoose";


export const dbConnection = async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/Chat").then(()=>{
        console.log("Connected to database ");
    }).catch((err)=>{
        console.log(err);
    })
}