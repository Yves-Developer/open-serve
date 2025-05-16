import { Schema, model } from "mongoose";

const agencySchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String },
  category: [String],
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const agency = model("Agency", agencySchema);
export default agency;
