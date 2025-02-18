import { type NextRequest, NextResponse } from "next/server";

import type { IScheduleFormSave } from "@/schemas/ScheduleFormSave";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body: IScheduleFormSave = await request.json();

  if (body.id_corporation === "" || body.id_company === "")
    return NextResponse.json({ message: "Erro parâmetros necessários" });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/schedule/save`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
