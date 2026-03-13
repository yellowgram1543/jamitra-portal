import express from "express";
import Document from "../models/Document.js";

const router = express.Router();

router.post("/", async (req, res) => {

  const document = new Document(req.body);

  await document.save();

  res.json(document);

});

router.get("/", async (req, res) => {

  const docs = await Document.find();

  res.json(docs);

});

export default router;