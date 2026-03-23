import express from "express";
import Application from "../models/Application.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("document"), async (req, res) => {
  try {
    // Extract base fields
    const { name, aadhaar, mobile, address, certificateType } = req.body;
    
    // Extract everything else as details
    const details = { ...req.body };
    delete details.name;
    delete details.aadhaar;
    delete details.mobile;
    delete details.address;
    delete details.certificateType;

    const applicationData = {
      name,
      aadhaar,
      mobile,
      address,
      certificateType,
      details,
      document: req.file ? req.file.path : null
    };

    const application = new Application(applicationData);
    await application.save();
    res.json(application);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: "Error saving application", error: error.message });
  }
});

router.get("/", async (req, res) => {
  const applications = await Application.find();
  res.json(applications);
});

export default router;
