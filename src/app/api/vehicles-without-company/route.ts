import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorpoation = searchParams.get("id_corporation");
  const token = request.headers.get("authorization");
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/get-vehicles-without-company?id_corporation=${idCorpoation}`,
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
