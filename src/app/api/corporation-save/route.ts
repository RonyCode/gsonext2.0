import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();

  // Acessando o cookie de forma segura
  const token = request.headers.get("authorization");

  if (!token) {
    return NextResponse.json(
      { error: "Token não encontrado" },
      { status: 401 },
    );
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ corporation: body }),
    },
  );

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 400 });
  }
  const response = await res.json();
  return NextResponse.json(response);
}
