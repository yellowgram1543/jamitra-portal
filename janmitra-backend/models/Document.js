import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({

  name: String,
  fileName: String,
  uploadDate: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Document", documentSchema);