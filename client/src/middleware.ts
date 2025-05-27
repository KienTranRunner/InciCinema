import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  if (token && pathname === "/auth/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  if (
    pathname.startsWith("/dashboard") &&
    (!token || !token.role || !["Admin", "Staff", "Manager"].includes(token.role))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  

  return NextResponse.next()
}

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*", "/admin/:path*"],
}
