import mongoose, { mongo } from "mongoose";

const userShema=new mongoose.Schema({
    _id:{type: String,required:true},
    name:{type: String,required:true},
    email: {type: String,required:true, unique:true},
    imageURL:{type: String,required:true},
    cartItems:{type: Object,default:{}}
}, {minimize: false})


const User=mongoose.models.user || mongoose.model('user',userShema)

export default User