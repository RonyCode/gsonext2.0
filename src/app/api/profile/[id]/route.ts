import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const token = request.headers.get("authorization");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/user/user-id/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: response.statusText },
      { status: response.status },
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
