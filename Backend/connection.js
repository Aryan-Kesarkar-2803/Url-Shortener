import mongoose from "mongoose";

export default function connectMongoDB(url){
    return mongoose.connect(url)
}

