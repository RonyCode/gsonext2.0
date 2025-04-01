import { TokenManager } from "@/functions/TokenManager";

export const getRefreshToken = async (
  refreshToken?: string | undefined | null,
): Promise<Response> => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_GSO}/api/auth/refresh-token`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": `Bearer ${refreshToken}`,
      },
    },
  );
};
