// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/products", "/orders/:path*", "/admin/:path*"],
// };
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/user/login',
    error: '/auth/error'
  }
});

export const config = {
  matcher: ['/products', '/orders/:path*', '/admin/:path*']
};