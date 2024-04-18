import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

export const connect = async ()=>{
   await mongoose.connect(`mongodb://127.0.0.1:27017/George`).then(res=>{
    console.log(`connect db`);
   }).catch(err=>{
    console.log(err);
   });
}


export default connect