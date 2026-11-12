import express from "express"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./lib/db.js";
const app = express();
const Port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth/", authRoutes);

app.listen(Port, ()=>{
    console.log(`The server is running on ${Port}`);
    connectDB(); 
})