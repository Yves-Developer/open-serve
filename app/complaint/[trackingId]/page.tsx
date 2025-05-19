import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserRole } from "@/app/service/getRole";
import { getComplaintByTrackingId } from "@/app/service/complaint";
import ComplaintCard from "@/components/complaintcard";
import ChangeStatus from "@/components/agency/ChangeStatus";
import AddResponseForm from "@/components/form/AddResponseForm";

type ComplaintResponse = {
  message: string;
  date?: string | number | Date | null;
};

export default async function SingleComplaint({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) {
  /* ───────── auth & role ───────── */
  const { trackingId } = await params;
  const session = await auth();
  if (!session) redirect("/login");

  const roleDoc = await getUserRole(session.user.id);
  const role = roleDoc.role as "user" | "agency";

  /* ───────── fetch complaint ───────── */
  const complaint = await getComplaintByTrackingId(trackingId);
  if (!complaint)
    return (
      <div className="w-full max-w-7xl mx-auto p-4">Complaint not found.</div>
    );

  /* ───────── page ───────── */
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Main card */}
      <ComplaintCard
        trackingId={complaint.trackingId}
        category={complaint.category}
        description={complaint.description}
        status={complaint.status}
        agencyName={complaint.agencyId?.name ?? "-"}
        userName={complaint.user?.name ?? "-"}
        role={role}
        descStyle=""
      />
      {role === "agency" && (
        <ChangeStatus
          trackingId={complaint.trackingId}
          currentStatus={complaint.status}
        />
      )}

      {/* Existing responses */}
      {complaint.responses.length > 0 && (
        <section className="space-y-2">
          <h3 className="font-semibold">Responses</h3>
          {complaint.responses.map((r: ComplaintResponse) => {
            const dateLabel: string = (() => {
              if (!r.date) return "—";
              const d = new Date(r.date);
              return isNaN(d.getTime()) ? "—" : d.toLocaleString();
            })();

            return (
              <div
                key={String(r.date ?? Math.random())}
                className="rounded border border-input p-3 text-sm bg-accent"
              >
                <p className="whitespace-pre-line">{r.message}</p>
                <span className="block mt-1 text-xs text-muted-foreground">
                  {dateLabel}
                </span>
              </div>
            );
          })}
        </section>
      )}

      {/* Add response (only for agency) */}
      {role === "agency" && (
        <AddResponseForm trackingId={complaint.trackingId} />
      )}
    </div>
  );
}
