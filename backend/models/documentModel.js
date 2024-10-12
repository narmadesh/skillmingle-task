import mongoose from "mongoose";

const documentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;
