

import { Schema, model } from "mongoose";

const userschema = new Schema(
  {
    
    fname: {
      type: String,
      required: true,
    },
    lname:{
      type: String,
      required: true,
    },
    username: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
    password: {
      type: String,
      required: true,
    },
    confirmEmail:{
      type:Boolean,
      default:false
    },
    
  },
  {
    timestamps: true,
  },
  
);

 export const userModel = model("user", userschema);

 