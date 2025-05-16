import { InferSchemaType, model, Schema } from "mongoose";

const feedbackSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);
const Feedback = model("Feedback", feedbackSchema);
export default Feedback;
export type feedbackType = InferSchemaType<typeof feedbackSchema>;
