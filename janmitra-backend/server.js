import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import applicationRoutes from "./routes/applicationRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/applications", applicationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/schemes", schemeRoutes);

app.get("/", (req, res) => {
  res.send("Janmitra API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});