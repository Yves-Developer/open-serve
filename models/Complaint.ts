import { InferSchemaType, model, models, Schema } from "mongoose";
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
    agencyId: {
      type: Schema.Types.ObjectId,
      ref: "Agency",
    },
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["submitted", "progress", "resolved", "closed"],
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

const Complaint = models.Complaint || model("Complaint", complaintSchema);
export default Complaint;
type complaintSchemaType = InferSchemaType<typeof complaintSchema>;
export type complaintPayloadType = Pick<
  complaintSchemaType,
  "userId" | "agencyId" | "category" | "description"
>;
