import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.headers.get("authorization");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/functions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
