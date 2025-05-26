import NextAuth from "next-auth"
import authConfig from "./lib/auth.config"
import { NextRequest, NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/posts/:path*',
    '/users/:path*',
  ]
};
