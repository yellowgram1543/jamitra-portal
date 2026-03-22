import express from "express";
import Scheme from "../models/Scheme.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { occupation } = req.query;

  try {
    if (occupation) {
      // Use case-insensitive regex for occupation matching
      const schemes = await Scheme.find({ 
        occupation: { $regex: new RegExp(`^${occupation}$`, 'i') } 
      });
      return res.json(schemes);
    }

    const schemes = await Scheme.find();
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schemes", error: error.message });
  }
});

export default router;