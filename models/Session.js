import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    messages: [
      {
        senderId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Session = mongoose.model("Session", sessionSchema);
export default Session;
