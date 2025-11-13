
import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  const authres=  await auth0.middleware(request);  

  
  // if(request.nextUrl.pathname === "/auth/logout"){
  //    return NextResponse.redirect(new URL("/logout", request.url));
  // }


  return authres;
}

export const config= {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ], 
};