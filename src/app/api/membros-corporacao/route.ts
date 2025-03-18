import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const id_corporation = searchParams.get("id_corporation");

  if (id_corporation != null) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/members/${id_corporation}`,
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
