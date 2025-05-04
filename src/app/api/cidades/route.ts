import { type NextRequest, NextResponse } from "next/server";
import { fetchWrapper } from "@/functions/fetch";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  const res: Response = await fetchWrapper(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/distritos`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    },
  );
  return NextResponse.json(res);
}
