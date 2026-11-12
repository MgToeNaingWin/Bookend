import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`The Database Connected Successfully ${connect.connection.host}`)
    } catch (error) {
        console.log("The Database Connect is not success ", error);
        process.exit(1);
    }
}