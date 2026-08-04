import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "es"] as const;
type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language") ?? "";
  return acceptLanguage.toLowerCase().includes("es") ? "es" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (isLocale(firstSegment)) {
    // Ya tiene prefijo de idioma: dejar pasar y sincronizar la cookie
    // para que el toggle basado en <Link> quede recordado.
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url, 307);
}

export const config = {
  matcher: [
    "/((?!go|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};
