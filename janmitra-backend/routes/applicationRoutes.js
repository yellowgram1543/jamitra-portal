import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

router.post("/", async (req, res) => {

  const application = new Application(req.body);

  await application.save();

  res.json(application);

});

router.get("/", async (req, res) => {

  const applications = await Application.find();

  res.json(applications);

});

export default router;