"use server";

export async function LoginUserExternalAction(
  provider_user_id: string | undefined,
): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login-user-external`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ provider_user_id }),
  });
}
