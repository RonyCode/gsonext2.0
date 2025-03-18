import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorporation = searchParams.get("id_corporation");
  if (idCorporation == null) {
    return NextResponse.json(
      { message: "id-corporation não informado" },
      { status: 400 },
    );
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/get-all/${idCorporation}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    );
  }
  const result = await res.json();

  return NextResponse.json(result);
}
