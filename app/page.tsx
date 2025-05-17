import ComplaintCard from "@/components/complaintcard";
// import { createAgency } from "./service/agency";
// import { createComplaint, listComplaints } from "./service/complaint";
// import { useState, useEffect } from "react";
// import { listComplaints } from "./service/complaint";

// type Complaint = {
//   _id: string;
//   agencyId: string;
//   category: string;
//   createdAt: Date | string;
//   description: string;
//   responses: any[];
//   status: string;
//   trackingId: string;
//   updatedAt: Date | string;
//   userId: string;
//   __v: number;
// };

const Home = () => {
  // const [issue, setIssue] = useState<Complaint[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function fetchData() {
  //     // Create agency if needed
  //     // const data = await createAgency({
  //     //   name: "Yves",
  //     //   email: "yvesmugisha09@gmail.com",
  //     //   location: "Kigali",
  //     //   category: ["Water"],
  //     // });

  //     // Example condition — replace with actual logic
  //     const time = 0;

  //     // if (time > 0) {
  //     //   // create complaint example
  //     //   // await createComplaint({
  //     //   //   userId: "6651c4fc9d5b41b9d9fd0e42",
  //     //   //   agencyId: "6651c5149d5b41b9d9fd0e43",
  //     //   //   category: "Water",
  //     //   //   description: "text is 101",
  //     //   // });
  //     // } else {
  //     // fetch complaints
  //     const complaints = await listComplaints({
  //       userId: "6651c4fc9d5b41b9d9fd0e42",
  //     });

  //     // You may need to normalize the dates here:
  //     const normalized: Complaint[] = complaints.map((c: any) => ({
  //       ...c,
  //       createdAt: new Date(c.createdAt),
  //       updatedAt: new Date(c.updatedAt),
  //     }));

  //     setIssue(normalized);
  //     // }
  //     setLoading(false);
  //   }

  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-5">
      <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
        {[1, 2, 3, 4, 5].map((index) => (
          <ComplaintCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
