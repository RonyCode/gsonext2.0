import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorpoation = searchParams.get("id_corporation");
  const criteria = searchParams.get("criteria");

  const token = request.headers.get("authorization");
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/user/get-users-without-corp?id_corporation=${idCorpoation}&criteria=${criteria}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  // console.log(await res.text());
  const result = await res.json();
  return NextResponse.json(result);
  // return NextResponse.json({ teste: await res.text() });
}
