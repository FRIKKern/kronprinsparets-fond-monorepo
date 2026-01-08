import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const rawPathname = url.pathname;
  
  // Decode the pathname to handle URL-encoded characters
  let decodedPathname: string;
  try {
    decodedPathname = decodeURIComponent(rawPathname);
  } catch {
    decodedPathname = rawPathname;
  }

  // Normalize Norwegian characters to ASCII equivalents
  let normalizedPath = decodedPathname;

  // Replace håndboka (with å) -> handboka
  if (normalizedPath.includes("håndboka") || rawPathname.includes("h%C3%A5ndboka")) {
    normalizedPath = normalizedPath.replace(/håndboka/g, "handboka");
  }
  
  // Replace trenerhånda (with å) -> trenerhanda
  if (normalizedPath.includes("trenerhånda") || rawPathname.includes("trenerh%C3%A5nda")) {
    normalizedPath = normalizedPath.replace(/trenerhånda/g, "trenerhanda");
  }

  // If the path was changed, redirect to the normalized version
  if (normalizedPath !== decodedPathname) {
    url.pathname = normalizedPath;
    // Preserve query parameters
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
