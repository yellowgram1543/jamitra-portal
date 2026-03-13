import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import applicationRoutes from "./routes/applicationRoutes.js"
import schemeRoutes from "./routes/schemeRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/applications", applicationRoutes)
app.use("/api/schemes", schemeRoutes)
app.use("/api/reports", reportRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
res.send("JanMitra Backend Running")
})

app.listen(process.env.PORT,()=>{
console.log("Server running on port 5000")
})