import { NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  const url =     `${process.env.NEXT_PUBLIC_API_GSO}/api/corporation/get-all`;

      const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  const result = await res.json()
  return NextResponse.json(result)
}
