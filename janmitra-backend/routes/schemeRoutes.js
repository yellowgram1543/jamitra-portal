import express from "express";
import Scheme from "../models/Scheme.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const { occupation } = req.query;

  if (occupation) {
    const schemes = await Scheme.find({ occupation });
    return res.json(schemes);
  }

  const schemes = await Scheme.find();

  res.json(schemes);

});

export default router;