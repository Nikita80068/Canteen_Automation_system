import mongoose from "mongoose"

export const connectDB=async()=>{
   await mongoose.connect('mongodb+srv://nikkiichauhan1001_db_user:wX9cRVMgi1BgMaMa@cluster0.xex291h.mongodb.net/?appName=Cluster0').then(()=>console.log("DB Connected"))
}

