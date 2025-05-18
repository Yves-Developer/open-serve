import { listAgencies } from "@/app/service/agency";
import DialogBox from "./DialogBox";
const IssueFormWrapper = async () => {
  const agencies = await listAgencies();

  const agencyOptions = agencies.map((a) => ({
    value: a._id.toString(),
    label: a.name,
  }));

  return <DialogBox agencies={agencyOptions} />;
};
export default IssueFormWrapper;
