import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import {connectDB} from "./lib/db.js"

dotenv.config();

const app = express()
const _dirname = path.resolve();
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use("/api/auth", authRoutes);

app.use("/api/message", messageRoutes);

//make ready for deployment
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../frontend/dist")));

    app.get('*',(_,res)=>{
        res.sendFile(path.join(_dirname, "../frontend", "dist","index.html"));
    });
}

app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`)
    connectDB()
});
