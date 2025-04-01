import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.headers.get("authorization");
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/user/get-all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await res.json();
  return NextResponse.json(result);
}
