import { type NextRequest, NextResponse } from "next/server";

import { type ISignInSchema } from "@/app/(auth)/auth/schemas/SignInSchema";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // const origin: string | null = request.headers.get("origin");
  const body: ISignInSchema = await request.json();
  const {
    email,
    senha,
    is_user_external: isUserExternal,
    subscription_user: subscriptions,
  } = body;

  if (email === "" || senha === "") {
    return NextResponse.json({ message: "Erro parametros necessários" });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
      is_user_external: isUserExternal,
      subscription_user: subscriptions,
    }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 401 });
  }
  const refreshToken = res.headers.get("x-refresh-token");
  const token = res.headers.get("authorization")?.replace("Bearer ", "");

  const { data } = await res.json();

  const responsedata = { ...data, token: token, refresh_token: refreshToken };
  return NextResponse.json(responsedata);
}
