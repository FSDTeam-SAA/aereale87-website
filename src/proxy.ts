import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  const isGuest = !token;
  const isProtectedRoute =
    pathname.startsWith("/my-books") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/orders");

  // Require a session for account pages.
  if (isGuest && isProtectedRoute) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  if (token && pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
