import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  mentor: mongoose.Types.ObjectId;
  mentee: mongoose.Types.ObjectId;
  date: string;
  time: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

const sessionSchema = new Schema<ISession>(
  {
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // e.g. "2025-06-26"
    time: { type: String, required: true }, // e.g. "10:00 AM"
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.model<ISession>("Session", sessionSchema);
