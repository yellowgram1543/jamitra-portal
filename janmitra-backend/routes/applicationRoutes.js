import express from "express";
import Application from "../models/Application.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("document"), async (req, res) => {
  try {
    const applicationData = {
      ...req.body,
      document: req.file ? req.file.path : null
    };

    const application = new Application(applicationData);
    await application.save();
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Error saving application", error: error.message });
  }
});

router.get("/", async (req, res) => {

  const applications = await Application.find();

  res.json(applications);

});

export default router;