import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const idUser = searchParams.get("id_user");
  const exchangeName = searchParams.get("exchange_name");
  const idMessage = searchParams.get("id_message");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/amqp/delete-notification?exchange_name=${exchangeName}&id_user=${idUser}&id_message=${idMessage}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
