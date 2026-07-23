export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    },
  );

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.message || "Unable to refresh session");
  }

  return payload.data as {
    accessToken: string;
    refreshToken: string;
  };
};
