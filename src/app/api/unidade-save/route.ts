import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  const token = request.headers.get("authorization");
  if (body.id_corporation === null)
    return NextResponse.json({ message: "Erro parâmetros necessários" });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ company: body }),
    },
  );
  // console.log(await res.text());
  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 400 });
  }
  const response = await res.json();
  return NextResponse.json(response);
  // return NextResponse.json({ test: "test" });
}
