import mongoose from "mongoose";


const UrlSchema = mongoose.Schema({
    url : {
        type:String,
        required : true,
    },
    shortUrl :{
        type:String,
    },
    visits :{
        type:Number,
        default:0
    }
})
const URL = mongoose.model('url-details',UrlSchema)
export default URL;