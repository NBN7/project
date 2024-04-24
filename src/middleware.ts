// Importamos las funciones necesarias de NextAuth
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname === "/dashboard") {
        // only allow access to "/dashboard" for users with admin role
        return token?.role === "ADMIN";
      } else if (
        req.nextUrl.pathname === "/profile" ||
        req.nextUrl.pathname === "/application" ||
        req.nextUrl.pathname === "/create"
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
  matcher: ["/dashboard", "/profile", "/application", "/create"],
};
