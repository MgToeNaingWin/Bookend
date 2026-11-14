import express from "express"
import "dotenv/config"
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import cors from "cors"

import { connectDB } from "./lib/db.js";
const app = express();
const Port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/api/auth/", authRoutes);
app.use("/api/books/", bookRoutes);


app.listen(Port, ()=>{
    console.log(`The server is running on ${Port}`);
    connectDB(); 
})