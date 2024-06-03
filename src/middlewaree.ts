export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/products/:path*", "/orders/:path*", "/admin/:path*"],
};

// import { NextResponse, type NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL('/user/login', request.url))
// }

// export const config = {
//   matcher: ['/products/:path*', '/orders/:path*', '/admin/:path*'],
// }

