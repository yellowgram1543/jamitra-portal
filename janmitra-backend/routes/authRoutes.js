import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Login / Register (Find or Create)
router.post("/login", async (req, res) => {
  try {
    const { mobile } = req.body;

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: "Please enter a valid 10-digit mobile number" });
    }

    let user = await User.findOne({ mobile });

    if (!user) {
      // Create new user profile if doesn't exist
      user = new User({ mobile });
      await user.save();
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error during login", error: error.message });
  }
});

// Update Profile
router.put("/profile", async (req, res) => {
  try {
    const { mobile, name, aadhaar } = req.body;
    
    const user = await User.findOneAndUpdate(
      { mobile },
      { name, aadhaar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});

export default router;
