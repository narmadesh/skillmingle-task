import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
