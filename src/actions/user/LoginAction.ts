"use server";

export async function LoginAction(
  email: string | undefined,
  senha: string | undefined,
  subscriptions: string | undefined,
): Promise<Response> {
  const url = `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/login`;

  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
      subscription_user: subscriptions,
    }),
  });
}
