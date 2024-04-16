// Importamos las funciones necesarias de NextAuth
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (req.nextUrl.pathname === "/dashboard") {
        // only allow access to "/dashboard" for users with admin role
        return token?.role === "ADMIN";
      } else if (req.nextUrl.pathname === "/home") {
        // any authenticated user can access home
        return !!token;
      }
      // by default do not allow access
      return false;
    },
  },
});

// routes that middleware should watch
export const config = { matcher: ["/dashboard", "/home"] };
