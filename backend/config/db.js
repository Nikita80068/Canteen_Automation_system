import mongoose from "mongoose"

export const connectDB=async()=>{
   await mongoose.connect('mongodb+srv://Tomato_User:abcdefg@cluster0.krwf60w.mongodb.net/food-del').then(()=>console.log("DB Connected"))
}

