import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id_company = searchParams.get("id_company");

  if (id_company != null) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/members/${id_company}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
