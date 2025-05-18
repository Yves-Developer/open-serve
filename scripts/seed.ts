/**
 * scripts/seed.ts
 *
 * Usage:  npx ts-node scripts/seed.ts
 */

import { connectToDb } from "@/lib/mongooseDb";
import { Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import Complaint from "@/models/Complaint";

async function seed() {
  await connectToDb();

  /**‑‑‑ constants (adjust) ‑‑‑*/
  const userId = new Types.ObjectId("6828ee1294089d7386d8a8c8");
  const agency1 = new Types.ObjectId("6651c5149d5b41b9d9fd0e43"); // WASAC
  const agency2 = new Types.ObjectId("6651c5149d5b41b9d9fd0e44"); // REG

  const categories = ["Water", "Electricity"];
  const baseDesc = [
    "Leaking pipe behind the main gate.",
    "No water supply for 3 days.",
    "Low voltage issue in my area.",
    "Frequent power outages every evening.",
    "Faulty meter reading.",
  ];

  /**‑‑‑ generate 10 docs ‑‑‑*/
  const docs = Array.from({ length: 10 }).map((_, i) => ({
    trackingId: uuidv4(),
    userId,
    agencyId: i < 5 ? agency1 : agency2,
    category: i < 5 ? categories[0] : categories[1],
    description: baseDesc[i % baseDesc.length],
    status: "submitted" as const,
  }));

  await Complaint.insertMany(docs);
  console.log("10 complaints inserted");

  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
