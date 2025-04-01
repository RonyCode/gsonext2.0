import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const nameQueue = searchParams.get("queue_name");
  const exchangeName = searchParams.get("exchange_name");
  const routingKey = searchParams.get("routing_key");

  const token = request.headers.get("authorization");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/services/amqp/delete-all-notifications?queue_name=${nameQueue}&exchange_name=${exchangeName}&routing_key=${routingKey}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
