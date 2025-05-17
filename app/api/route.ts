// app/api/role/route.ts
import { auth } from "@/auth";
import { NextResponse, NextRequest } from "next/server";
import { getUserRole } from "../service/getRole";

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await getUserRole(session.user.id);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ role: result.role });
  } catch (err) {
    console.error("GET /api/role error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
