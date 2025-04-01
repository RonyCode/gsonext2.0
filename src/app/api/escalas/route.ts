import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorpoation = searchParams.get("id_corporation");
  const idCompany = searchParams.get("id_company");

  const token = request.headers.get("authorization");
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedules?id_corporation=${idCorpoation}&id_company=${idCompany}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(token);
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    );
  }
  const result = await res.json();
  return NextResponse.json(result);
}
