import SignIn from "@/components/auth/sign-button";
import { createAgency } from "./service/agency";
import { auth } from "@/auth";
import SignOut from "@/components/auth/signout-button";
import { createComplaint, listComplaints } from "./service/complaint";
import { Types } from "mongoose";
const Home = async () => {
  const data = await createAgency({
    name: "Yves",
    email: "yvesmugisha09@gmail.com",
    location: "Kigali",
    category: ["Water"],
  });
  const time = 0;
  // 24 hex chars (0‑9, a‑f)
  const userId = new Types.ObjectId("6651c4fc9d5b41b9d9fd0e42");
  const agencyId = new Types.ObjectId("6651c5149d5b41b9d9fd0e43");

  if (time > 0) {
    const comData = await createComplaint({
      userId,
      agencyId,
      category: "Water",
      description: "text is 101",
    });
    console.log(comData);
  } else {
    const complaint = await listComplaints({
      userId: "6651c4fc9d5b41b9d9fd0e42",
    });
    console.log("Complaints!!:", complaint);
  }
  console.log(data);
  const session = await auth();
  return (
    <div>
      {session ? <SignOut /> : <SignIn />}
      <div>
        <br />
        <br />
        {data ? "Data" : ""} !
      </div>
    </div>
  );
};

export default Home;
