import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/** Chooses a language: saved choice → browser language → German. */
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get("NEXT_LOCALE")?.value;
  if (saved && isLocale(saved)) return saved;
  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${pickLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API, and files with an extension (sitemap.xml, robots.txt, images…)
  matcher: ["/((?!_next|api|.*\\..*).*)"]
};
