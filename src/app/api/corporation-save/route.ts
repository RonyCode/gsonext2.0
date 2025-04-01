import { type NextRequest, NextResponse } from "next/server";
import { TokenManager } from "@/functions/TokenManager";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  const token = request.headers.get("authorization");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ corporation: body }),
    },
  );

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 400 });
  }
  const response = await res.json();
  return NextResponse.json(response);
}
