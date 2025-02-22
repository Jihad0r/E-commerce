import mongoose from "mongoose";

const produtSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        img:{
            type: String,
            required: true,
        },
        action:{
            type: String,
			enum: ["increase", "decrease"],
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
    cart:[produtSchema]
},
{ timestamps: true })

const User = mongoose.model("User",userSchems)

export default User;