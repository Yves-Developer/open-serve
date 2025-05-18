import ComplaintCard from "@/components/complaintcard";

const Dashboard = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-5">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <ComplaintCard
            key={index}
            trackingId="67c7a76a7a7"
            category="Water"
            description="Text is so easy to generate"
            status="submitted"
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
