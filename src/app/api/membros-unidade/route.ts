import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id_company = searchParams.get("id_company");
  const token = request.headers.get("authorization");
  if (id_company != null) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/members/${id_company}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (res.ok) {
      const result = await res.json();
      return NextResponse.json(result);
    }
  }
  return NextResponse.json({ error: "Usuário não encontrado" });
}
