"use server";

/* ---------- CREATE ---------- */

import { connectToDb } from "@/lib/mongooseDb";
import Agency, { agencyPayloadType } from "@/models/Agency";
import { Types } from "mongoose";

/**
 * Creates a new agency .
 *
 * @param payload - The agency data including name, email.
 * @returns A response with a message and optionally the created agency.
 */
export const createAgency = async (payload: agencyPayloadType) => {
  await connectToDb();

  const { email, name } = payload;

  const emailTaken = await Agency.findOne({ email }).lean();
  if (emailTaken) {
    return { message: "Email already exists", type: "error" };
  }
  const nameTaken = await Agency.find({ name }).lean();
  if (nameTaken.length > 0) {
    return { message: "Agency name already exists", type: "error" };
  }
  const agency = await Agency.create({ email, name });

  return { message: "Created", type: "success", data: agency.toJSON() };
};

/* ---------- READ: get one ---------- */

/**
 * Fetch an agency by its Email.
 *
 * @param {string} email- Agency Email to retrieve.
 * @returns {Promise<any|null>}
 */
export const getAgency = async (email: string) => {
  await connectToDb();
  if (!email) return null;
  const agency = await Agency.findOne({ email }).lean();
  return agency;
};

/**
 * Fetch an agency by its Id.
 *
 * @param {string} email- Agency Email to retrieve.
 * @returns {Promise<any|null>}
 */
export const getAgencyById = async (id: string) => {
  await connectToDb();
  if (!id) return null;
  const agency = await Agency.findById(id).lean();
  return agency ? JSON.parse(JSON.stringify(agency)) : null;
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
  return Agency.find(filter);
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
