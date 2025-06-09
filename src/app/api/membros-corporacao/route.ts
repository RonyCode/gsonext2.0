import { NextRequest, NextResponse } from "next/server";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id_corporation = searchParams.get("id_corporation");
  // const token = request.headers.get("authorization");

  const token = await GetTokenCookie("token");

  if (id_corporation != null) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/members/${id_corporation}`,
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
