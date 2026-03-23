import express from "express";
import Report from "../models/Report.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const reportData = {
      ...req.body,
      photo: req.file ? req.file.path : null
    };

    const report = new Report(reportData);
    await report.save();
    res.json(report);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: "Error saving report", error: error.message });
  }
});

router.get("/", async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

export default router;
