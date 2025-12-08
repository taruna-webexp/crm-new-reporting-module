import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    console.log("🔥 Middleware triggered:", request.nextUrl.pathname);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  const { pathname } = request.nextUrl;

  if (!isAuth && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuth && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/pages/inputs", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/:path*",
    "/login",
  ],
};
