import mongoose, { Document, Schema } from "mongoose";

export interface IRequest extends Document {
  mentee: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
}

const requestSchema = new Schema<IRequest>(
  {
    mentee: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mentor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["PENDING", "ACCEPTED", "REJECTED"], default: "PENDING" },
  },
  { timestamps: true }
);

export default mongoose.model<IRequest>("Request", requestSchema);
