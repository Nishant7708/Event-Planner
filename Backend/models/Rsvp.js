import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    status: { type: String, enum: ["Going", "Maybe", "Declined"] },
  },
  { timestamps: true }
);

rsvpSchema.index({ user: 1, event: 1 }, { unique: true });

export default mongoose.model("Rsvp", rsvpSchema);
