import { type NextRequest, NextResponse } from "next/server";

import type { IScheduleFormSave } from "@/schemas/ScheduleFormSave";
import { TokenManager } from "@/functions/TokenManager";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: IScheduleFormSave = await request.json();

  if (body.id_corporation === "" || body.id_company === "")
    return NextResponse.json({ message: "Erro parâmetros necessários" });

  const token = request.headers.get("authorization");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedule/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const { message } = await res.json();
    return NextResponse.json({ message }, { status: 401 });
  }
  const response = await res.json();
  return NextResponse.json(response);
}
