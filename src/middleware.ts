// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/products/:path*", "/orders/:path*", "/admin/:path*"],
// };




// import { withAuth } from "next-auth/middleware";

// export default withAuth({
//   pages: {
//     signIn: '/user/login',
//     error: '/auth/error'
//   }
// });

// export const config = {
//   matcher: ['/products', '/orders/:path*', '/admin/:path*']
// };



import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/user/login', request.url))
}

export const config = {
  matcher: ['/products/:path*', '/orders/:path*', '/admin/:path*'],
}




// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // Assuming /user/login is the login route
//   const loginUrl = new URL('/user/login', request.url);

//   // Perform the redirection if not authenticated
//   if (!request.nextUrl.pathname.startsWith('/user/login')) {
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/products/:path*', '/orders/:path*', '/admin/:path*'],
// };