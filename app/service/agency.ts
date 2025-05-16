import Agency, { agencyPayloadType } from "@/models/Agency";
export const createAgency = async (payload: agencyPayloadType) => {
  const agency = new Agency(payload);
  await agency.save();
  return agency;
};
