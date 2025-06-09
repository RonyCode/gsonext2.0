import { type NextRequest, NextResponse } from "next/server";

import { type IRegisterUserSchema } from "@/schemas/RegisterUserSchema";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: IRegisterUserSchema = await request.json();

  if (body.cpf === "" || body.email === "" || body.senha === "")
    return NextResponse.json({ message: "Erro parametros necessários" });

  const token = await GetTokenCookie("token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/cadastro`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...body }),
    },
  );

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 401 });
  }
  const response = await res.json();
  return NextResponse.json(response);
}
