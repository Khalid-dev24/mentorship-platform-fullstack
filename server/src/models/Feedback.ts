import mongoose, { Document, Schema } from "mongoose";

export interface IFeedback extends Document {
  session: mongoose.Types.ObjectId;
  givenBy: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    session: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    givenBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model<IFeedback>("Feedback", feedbackSchema);
