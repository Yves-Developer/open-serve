"use server";
import Complaint from "@/models/Complaint";

import { v4 as uuidv4 } from "uuid";
import { connectToDb } from "@/lib/mongooseDb";
import { Types } from "mongoose";

/* ---------- CREATE  ---------- */
interface CreateComplaintInput {
  category: string;
  description: string;
  agencyId: string;
  userId: string;
}
/**
 * Creates a new complaint and assign tracking ID
 *
 * @param {CreateComplaintInput} payload - The complaint data including description, userId,agencyId and category.
 * @returns trackingId of created Complaints.
 */

export const createComplaint = async (payload: CreateComplaintInput) => {
  await connectToDb();
  const { userId, agencyId, category, description } = payload;

  const trackingId = uuidv4();

  const complaint = new Complaint({
    trackingId,
    userId: new Types.ObjectId(userId),
    agencyId: new Types.ObjectId(agencyId),
    category,
    description,
  });

  await complaint.save();

  return { trackingId };
};

/* ---------- READ: get one with agency & user populated ---------- */

/**
 *
 * @param {string} id complaint Document Id
 * @returns Object contains agency data {agencyId,name,email} and user Data[Citezen]{userId,name,email}
 */
export const getComplaint = async (userId: string) => {
  await connectToDb();

  return Complaint.findOne({ userId: new Types.ObjectId(userId) }).lean();
};
/* ---------- READ: get one with TrackingId ---------- */
/**
 * Get complaint By TarckingID and populate agency data
 * @param {string} trackingId
 * @returns Object Complaint Data, Agency Data
 */
export const getComplaintByTrackingId = async (trackingId: string) => {
  await connectToDb();

  const complaint = await Complaint.findOne(
    { trackingId },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  ).populate({
    path: "agencyId",
    select: "name",
  });

  if (!complaint) return null;

  return JSON.parse(JSON.stringify(complaint));
};

/* ---------- READ: list by user OR agency ---------- */

/**
 *
 * @description List all complaints by userId or agencyId
 * @param  filter filters for either userID or agencyId
 * @returns Object Complaint Data by userID or AgencyID or both
 */

export const listComplaints = async (
  filter: { userId?: string; agencyId?: string } = {}
) => {
  await connectToDb();
  const query: { userId?: string; agencyId?: string } = {};
  if (filter.userId && Types.ObjectId.isValid(filter.userId))
    query.userId = filter.userId;
  if (filter.agencyId && Types.ObjectId.isValid(filter.agencyId))
    query.agencyId = filter.agencyId;

  return Complaint.find(query).lean();
};

/* ---------- UPDATE: add a response OR change status ---------- */

type UpdateComplaintPayload = {
  trackingId: string; // or Types.ObjectId
  status?: "progress" | "resolved" | "closed";
  responseText?: string;
};

/**
 * Update a complaint with a new status or append a response.
 *
 * @param {UpdateComplaintPayload} payload - The update details.
 * @param {string} payload.trackingId - The ID of the complaint[trackingId].
 * @param {"progress"|"resolved"|"closed"} [payload.status] - New status (optional).
 * @param {string} [payload.responseText] - Response message to add (optional).
 * @returns {Promise<any>} The updated complaint document.
 *
 * @example
 * await respondToComplaint({
 *   trackingId: "6651c4fc9d5b41b9d9fd0e42",
 *   status: "progress",
 *   responseText: "We're looking into it now."
 * });
 */
type UpdateComplaintDoc = {
  status?: "submitted" | "progress" | "resolved" | "closed";
  $push?: {
    responses: {
      message: string;
      date: Date;
    };
  };
};
export const respondToComplaint = async (payload: UpdateComplaintPayload) => {
  await connectToDb();

  const { trackingId, status, responseText } = payload;

  const update: UpdateComplaintDoc = {};
  if (status) update.status = status;
  if (responseText) {
    update.$push = {
      responses: {
        message: responseText,
        date: new Date(),
      },
    };
  }

  const updated = await Complaint.findOneAndUpdate({ trackingId }, update, {
    new: true,
  }).lean();

  return updated ? JSON.parse(JSON.stringify(updated)) : null;
};

/* ---------- DELETE ---------- */
/**
 *
 * @param {string} id Complaint Doc Id
 * @returns true if deleted succesfull
 */
export async function deleteComplaint(id: string) {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return false;
  await Complaint.findByIdAndDelete(id);
  return true;
}
