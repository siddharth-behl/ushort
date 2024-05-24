import mongoose from "mongoose";
import auth_data from "./auth.js";

const urlschema=new mongoose.Schema({

    shortID:{
        required:true,
        type:String
    },

    redirecturl:{
        required:true,
        type:String
    },
    clicks:{
        required:true,
        default:0,
        type:Number
    },
    location:{
        required:true,
        type:Array
    },
    time:[{
       
        type:Date,
        default:new Date()

    }],
    auth_data:{
        type:mongoose.Schema.Types.ObjectId,
        ref:auth_data,
        required:true
    }
    
})
const urldata=mongoose.model("user",urlschema)
export default urldata