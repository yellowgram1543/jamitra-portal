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
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req,res)=>{

  const reports = await Report.find();

  res.json(reports);

});

export default router;