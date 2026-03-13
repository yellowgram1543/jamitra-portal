import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

router.post("/", async (req,res)=>{

  try{

    const report = new Report(req.body);

    await report.save();

    res.json(report);

  }catch(error){

    res.status(500).json({error:error.message});

  }

});

router.get("/", async (req,res)=>{

  const reports = await Report.find();

  res.json(reports);

});

export default router;