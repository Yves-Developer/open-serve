"use server";

/* ---------- CREATE ---------- */

import { connectToDb } from "@/lib/mongooseDb";
import Agency, { agencyPayloadType } from "@/models/Agency";
import Complaint from "@/models/Complaint";
import { Types } from "mongoose";

/**
 * Creates a new agency if the email is not already taken.
 *
 * @param payload - The agency data including name, email, location, and category.
 * @returns A response with a message and optionally the created agency.
 */
export const createAgency = async (payload: agencyPayloadType) => {
  await connectToDb();

  const { email, name, location, category } = payload;

  const emailTaken = await Agency.findOne({ email }).lean();
  if (emailTaken) {
    return { message: "Email already exists", type: "error" };
  }

  const agency = await Agency.create({ email, name, location, category });

  return { message: "Created", type: "success", data: agency.toJSON() };
};

/* ---------- READ: get one ---------- */

/**
 * Fetch an agency by its ID.
 *
 * @param {string} id - Agency ID to retrieve.
 * @returns {Promise<any|null>}
 */
export const getAgency = async (id: string) => {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return null;
  return Agency.findById(id).lean();
};

/* ---------- READ: list with optional filter ---------- */

/**
 * List all agencies or filter by fields.
 *
 * @param {Partial<agencyPayloadType>} [filter={}] - Optional filter.
 * @returns {Promise<any[]>}
 */
export const listAgencies = async (filter: Partial<agencyPayloadType> = {}) => {
  await connectToDb();
  return Agency.find(filter).lean();
};

/* ---------- UPDATE ---------- */

/**
 * Update an existing agency by ID.
 *
 * @param {string} id - Agency ID to update.
 * @param {Partial<agencyPayloadType>} updates - Fields to update.
 * @returns {Promise<any|null>}
 */
export const updateAgency = async (
  id: string,
  updates: Partial<agencyPayloadType>
) => {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return null;
  return Agency.findByIdAndUpdate(id, updates, { new: true, lean: true });
};

/* ---------- DELETE ---------- */

/**
 * Delete an agency by ID.
 *
 * @param {string} id - Agency ID to delete.
 * @returns {Promise<boolean>}
 */
export const deleteAgency = async (id: string) => {
  await connectToDb();
  if (!Types.ObjectId.isValid(id)) return false;
  await Agency.findByIdAndDelete(id);
  return true;
};
