import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({

  name: String,
  aadhaar: String,
  mobile: String,
  address: String,
  certificateType: String,
  status: {
    type: String,
    default: "Pending"
  }

});

export default mongoose.model("Application", applicationSchema);