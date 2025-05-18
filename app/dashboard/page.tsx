import ComplaintCard from "@/components/complaintcard";
import { redirect } from "next/navigation";

import { listComplaints } from "../service/complaint";
import { auth } from "@/auth";
import { getAgency } from "../service/agency";
type Complaint = {
  _id: string;
  trackingId: string;
  category: string;
  description: string;
  status: "submitted" | "progress" | "resolved" | "rejected";
  agencyId: string;
};

const Dashboard = async () => {
  const session = await auth();
  if (!session) return redirect("/login");

  const userId = session.user.id!;
  const raws = await listComplaints({ userId });

  const complaints: Complaint[] = raws.map((c) => ({
    _id: String(c._id),
    trackingId: c.trackingId,
    category: c.category,
    description: c.description,
    status: c.status,
    agencyId: c.agencyId,
  }));

  if (complaints.length === 0) {
    return (
      <div className="p-8 text-muted-foreground">No complaints found.</div>
    );
  }

  /* 3 ▸ lookup agencies in parallel */
  const extendComplaint = await Promise.all(
    complaints.map(async (c) => {
      const a = await getAgency(c.agencyId);
      const agencyName = Array.isArray(a) ? a[0]?.name : a?.name;
      return { ...c, agencyName };
    })
  );

  /* 4 ▸ render */
  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-5">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {extendComplaint.map((comp) => (
          <ComplaintCard
            key={comp._id}
            trackingId={comp.trackingId}
            category={comp.category}
            description={comp.description}
            status={comp.status}
            agencyName={comp.agencyName}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
