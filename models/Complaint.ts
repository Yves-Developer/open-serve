import { InferSchemaType, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const complaintSchema = new Schema(
  {
    trackingId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedAgencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["submitted", "in_progress", "resolved", "closed"],
      default: "submitted",
    },
    responses: [
      {
        responderId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Complaint = model("Complaint", complaintSchema);
export default Complaint;
export type complaintType = InferSchemaType<typeof complaintSchema>;
