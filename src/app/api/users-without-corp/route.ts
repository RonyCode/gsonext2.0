import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorpoation = searchParams.get("id_corporation");
  const criteria = searchParams.get("criteria");
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/user/get-users-without-corp?id_corporation=${idCorpoation}&criteria=${criteria}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 1,
      },
    },
  );
  // console.log(await res.text());
  const result = await res.json();
  return NextResponse.json(result);
  // return NextResponse.json({ teste: await res.text() });
}
