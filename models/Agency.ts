import { InferSchemaType, Schema, model } from "mongoose";

const agencySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String },
    category: [String],
    location: { type: String },
  },
  {
    timestamps: true,
  }
);
const Agency = model("Agency", agencySchema);
export default Agency;
export type agencyPayloadType = InferSchemaType<typeof agencySchema>;
