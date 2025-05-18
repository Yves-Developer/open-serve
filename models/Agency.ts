import { InferSchemaType, Schema, model, models } from "mongoose";

const agencySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);
const Agency = models.Agency || model("Agency", agencySchema);

export default Agency;

type agencySchemaType = InferSchemaType<typeof agencySchema>;
export type agencyPayloadType = Pick<agencySchemaType, "name" | "email">;
