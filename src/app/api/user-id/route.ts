import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.headers.get("authorization");
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id != null) {
    const res: Response = await fetch(
      `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-id/${id}`,
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
