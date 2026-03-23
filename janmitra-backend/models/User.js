import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
  },
  name: {
    type: String,
    trim: true
  },
  aadhaar: {
    type: String,
    match: [/^\d{12}$/, "Please enter a valid 12-digit Aadhaar number"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
