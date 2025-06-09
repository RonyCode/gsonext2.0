import { type NextRequest, NextResponse } from "next/server";

import { type ISaveMemberCompanySchema } from "@/schemas/SaveMemberCompanySchema";
import { GetTokenCookie } from "@/functions/TokenManager";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: ISaveMemberCompanySchema = await request.json();

  const token = request.headers.get("authorization");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/member/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_corporation: body?.id_corporation,
        id_company: body?.id_company,
        id_user: body?.id_user,
      }),
    },
  );
  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 400 });
  }
  const response = await res.json();
  return NextResponse.json(response);
}
