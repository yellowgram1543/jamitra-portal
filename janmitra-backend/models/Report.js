import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: [true, "Please select an issue type"]
  },
  location: {
    type: String,
    required: [true, "Location is required"]
  },
  description: {
    type: String,
    required: [true, "Please provide a description of the issue"],
    minlength: [10, "Description must be at least 10 characters long"]
  },
  photo: {
    type: String
  },
  status: {
    type: String,
    default: "Submitted",
    enum: ["Submitted", "Under Review", "Resolved"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Report", reportSchema);
