import mongoose from "mongoose"

const authschema=mongoose.Schema({
    Name:{
        required:true,
        type:String
    },

    DOB:{
        required:true,
        type:Date
    },
    Email:{
        required:true,
        type:String,
        unique:true
    },
    role:{
        type:String,
        default:"NORMAL"
    },
    Password:{
        required:true,
        type:String
    }
    
})

const auth_data=mongoose.model("auth_user",authschema)

export default auth_data