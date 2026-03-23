import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Full name is required"],
    trim: true
  },
  aadhaar: {
    type: String,
    required: [true, "Aadhaar number is required"],
    match: [/^\d{12}$/, "Please enter a valid 12-digit Aadhaar number"]
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
  },
  address: {
    type: String,
    required: [true, "Address is required"]
  },
  certificateType: {
    type: String,
    required: [true, "Certificate type is required"]
  },
  document: {
    type: String,
    required: [true, "Document upload is required"]
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Processing", "Approved", "Rejected"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Application", applicationSchema);
