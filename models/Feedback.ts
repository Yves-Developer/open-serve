import { model, Schema } from "mongoose";

const feedbackSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});
const feedback = model("Feedback", feedbackSchema);
export default feedback;
