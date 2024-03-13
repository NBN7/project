import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.SECRET });

  const { pathname } = req.nextUrl;

  // Si el usuario está autenticado y está accediendo a /auth, redirígelo.
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Aplica el middleware solo a las rutas especificadas.
  if (pathname.startsWith("/profile") || pathname.startsWith("/dashboard")) {
    // Aquí puedes agregar cualquier otra lógica de middleware que necesites.
    if (!token) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/dashboard:path*", "/auth:path*"],
};
