"use server";
import Complaint, { complaintPayloadType } from "@/models/Complaint";

import { v4 as uuidv4 } from "uuid";
import { connectToDb } from "@/lib/mongooseDb";
import { Types } from "mongoose";

/* ---------- CREATE  ---------- */

export async function createComplaint(data: complaintPayloadType) {
  await connectToDb();
  const { userId, agencyId, category, description } = data;

  const trackingId = uuidv4();

  const complaint = new Complaint({
    trackingId,
    userId,
    agencyId,
    category,
    description,
  });

  await complaint.save();

  return { trackingId };
}

/* ---------- READ: get one with agency & user populated ---------- */
export async function getComplaint(id: string) {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return null;
  return Complaint.findById(id)
    .populate("agencyId", "name email") // pick fields to expose
    .populate("userId", "name email")
    .lean();
}

/* ---------- READ: list by user OR agency ---------- */
export async function listComplaints(
  filter: { userId?: string; agencyId?: string } = {}
) {
  await connectToDb();
  const query: any = {};
  if (filter.userId && Types.ObjectId.isValid(filter.userId))
    query.userId = filter.userId;
  if (filter.agencyId && Types.ObjectId.isValid(filter.agencyId))
    query.agencyId = filter.agencyId;

  return Complaint.find(query).lean();
}

/* ---------- UPDATE: add a response OR change status ---------- */
export async function respondToComplaint(
  complaintId: string,
  response: string,
  status: "pending" | "resolved" | "rejected" = "resolved"
) {
  await connectToDb();
  if (!Types.ObjectId.isValid(complaintId)) return null;

  return Complaint.findByIdAndUpdate(
    complaintId,
    {
      $push: { responses: response },
      status,
    },
    { new: true, lean: true }
  );
}

/* ---------- DELETE ---------- */
export async function deleteComplaint(id: string) {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return false;
  await Complaint.findByIdAndDelete(id);
  return true;
}
