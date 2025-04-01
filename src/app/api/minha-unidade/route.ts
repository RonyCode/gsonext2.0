import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idCorporation = searchParams.get("id-corporation");
  const idCompany = searchParams.get("id-company");
  const $idUser = searchParams.get("id-user");

  if (idCorporation == null && idCompany == null) {
    return NextResponse.json(
      { message: "id-corporation e id-company não informado" },
      { status: 400 },
    );
  }
  const token = request.headers.get("authorization");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/mycompany?id-corporation=${idCorporation}&id-company=${idCompany}&id-user=${$idUser}`,
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
