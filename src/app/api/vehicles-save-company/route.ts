import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json()
  const res: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/company/vehicle/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
      next: {
        revalidate: 1,
      },
    },
  )
  const result = await res.json()
  return NextResponse.json(result)
}
