import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const url = process.env.NEXT_PUBLIC_API_ESTADOS ?? "";
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  if (!res.ok) {
    return NextResponse.json(
      { message: res.statusText },
      { status: res.status },
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
