if (typeof window === "undefined") {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async function (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) {
    try {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : typeof (input as Request)?.url === "string"
              ? (input as Request).url
              : "";

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/v1";

      if (apiUrl && url && url.startsWith(apiUrl)) {
        const headers = new Headers(
          init?.headers ||
            (typeof input === "object" && input !== null && "headers" in input
              ? (input as Request).headers
              : undefined),
        );
        const secret =
          process.env.INTERNAL_API_SECRET || "dev-internal-secret-key-12345";
        headers.set("x-internal-secret", secret);

        return await originalFetch(url, {
          ...init,
          headers,
        });
      }

      return await originalFetch(input, init);
    } catch (error) {
      console.warn("Global fetch intercepted error for:", input, error);
      throw error;
    }
  };
}
