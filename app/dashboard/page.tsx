import ComplaintCard from "@/components/complaintcard";
import { redirect } from "next/navigation";

import { listComplaints } from "../service/complaint";
import { auth } from "@/auth";
import { getAgency } from "../service/agency";
import { getUserRole } from "../service/getRole";
import { getUserName } from "../service/getUserName";
type Complaint = {
  _id: string;
  trackingId: string;
  category: string;
  description: string;
  status: "submitted" | "progress" | "resolved" | "rejected";
  agencyId: string;
  userId?: string;
};

const Dashboard = async () => {
  const session = await auth();
  if (!session) return redirect("/login");

  const userId = session.user.id!;
  const email = session.user.email;
  const role = await getUserRole(userId);

  /* ---------- base query: complaints created by this user ---------- */
  let raws = await listComplaints({ userId });

  let complaints: Complaint[] = raws.map((c) => ({
    _id: String(c._id),
    trackingId: c.trackingId,
    category: c.category,
    description: c.description,
    status: c.status,
    agencyId: c.agencyId,
    userId: String(c.userId), // ⬅️ keep userId
  }));

  /* ---------- agency view ---------- */
  if (role.role === "agency") {
    const ag = await getAgency(email);
    const agencyIdObj = Array.isArray(ag) ? ag[0]?._id : ag?._id;
    const agencyName = Array.isArray(ag) ? ag[0]?.name : ag?.name;
    if (!agencyName) return redirect("/agency/profile");

    const agencyIdStr = agencyIdObj?.toString();
    raws = await listComplaints({ agencyId: agencyIdStr });

    complaints = raws.map((c) => ({
      _id: String(c._id),
      trackingId: c.trackingId,
      category: c.category,
      description: c.description,
      status: c.status,
      agencyId: c.agencyId,
      userId: String(c.userId), // ⬅️ keep userId
    }));
  }

  if (complaints.length === 0)
    return (
      <div className="p-8 text-muted-foreground">No complaints found.</div>
    );

  /* ---------- enrich with agency & user names ---------- */
  const enriched = await Promise.all(
    complaints.map(async (c) => {
      const agencyDoc = await getAgency(c.agencyId);
      const agencyName = Array.isArray(agencyDoc)
        ? agencyDoc[0]?.name
        : agencyDoc?.name;

      let userName = "Unknown";
      if (c.userId) {
        const userDoc = await getUserName(c.userId);
        userName = userDoc?.name ?? userName;
      }
      return { ...c, agencyName, userName };
    })
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-5">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {enriched.map((comp) => (
          <ComplaintCard
            key={comp._id}
            trackingId={comp.trackingId}
            category={comp.category}
            description={comp.description}
            status={comp.status}
            agencyName={comp.agencyName}
            userName={comp.userName}
            role={String(role.role)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
