import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema({

  title: String,
  description: String,
  category: String,
  eligibility: String,
  occupation: String

});

export default mongoose.model("Scheme", schemeSchema);