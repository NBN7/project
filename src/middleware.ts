// Importamos las funciones necesarias de NextAuth
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname.includes("/dashboard")) {
        // only allow access to "/dashboard" for users with admin role
        return token?.role === "ADMIN";
      } else if (
        req.nextUrl.pathname.includes("/transactions") ||
        req.nextUrl.pathname.includes("/goals") ||
        req.nextUrl.pathname.includes("/profile")
      ) {
        // any authenticated user can access profile and application pages
        return !!token;
      }

      // by default do not allow access
      return false;
    },
  },
});

// routes that middleware should watch
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/transactions/:path*",
    "/goals/:path*",
  ],
};
