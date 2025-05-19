import { getComplaintByTrackingId } from "@/app/service/complaint";
import ComplaintCard from "@/components/complaintcard";
import { Badge } from "@/components/ui/badge";

type ComplaintResponse = {
  message: string;
  date?: string | null;
};

const Track = async ({
  params,
}: {
  params: Promise<{ trackingId: string }>;
}) => {
  const { trackingId } = await params;
  const complaint = await getComplaintByTrackingId(trackingId);
  if (!complaint) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">Complaint not found</div>
    );
  }
  console.log(complaint);
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {complaint && (
        <ComplaintCard
          trackingId={complaint.trackingId}
          description={complaint.description}
          agencyName={complaint.agencyId?.name ?? "-"}
          userName="-"
          category={complaint.category}
          status={complaint.status}
          role="Guest"
          descStyle=""
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
                <span className="block mt-3 text-xs text-muted-foreground">
                  From: <Badge>Agency</Badge>
                </span>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Track;
