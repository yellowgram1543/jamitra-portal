import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

  issueType: String,
  location: String,
  description: String,
  photo: String,

  status:{
    type:String,
    default:"Submitted"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

export default mongoose.model("Report", reportSchema);