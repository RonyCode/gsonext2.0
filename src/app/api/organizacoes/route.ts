import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.headers.get("authorization");

  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/get-all`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();
  return NextResponse.json(result);
}
