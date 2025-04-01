import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  const token = request.headers.get("authorization");

  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/vehicle/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body }),
      next: {
        revalidate: 1,
      },
    },
  );
  const result = await res.json();
  return NextResponse.json(result);
}
