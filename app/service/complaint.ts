import Complaint, { complaintType } from "@/models/Complaint";
import { v4 as uuidv4 } from "uuid";

export async function createComplaint(data: complaintType) {
  const trackingId = uuidv4();

  const complaint = new Complaint({
    trackingId,
    userId: data.userId,
    assignedAgencyId: data.assignedAgencyId,
    category: data.category,
    description: data.description,
    status: "submitted",
    responses: [],
  });

  await complaint.save();

  return { trackingId };
}
