import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const userSchems = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
        minLingth:8,
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    crat:[cartSchema]
},
{ timestamps: true })

const User = mongoose.model("User",userSchems)

export default User;