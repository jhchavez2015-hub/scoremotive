// app/go/[slug]/route.ts
//
// Central affiliate redirect. Every affiliate link on the site should point
// here (/go/smartcredit, /go/experian, etc.) instead of the raw network URL.
//
// What it does:
// 1. Looks up the slug in lib/affiliate-links.ts
// 2. Logs the click (slug, referring page, timestamp) — currently to console,
//    which Vercel captures in its logs. TODO(upgrade): once click volume is
//    worth analyzing, swap this for a real store (Vercel KV, Supabase, etc.)
//    so clicks can be queried/aggregated instead of just grep'd from logs.
// 3. Redirects with a 302 (temporary) — NOT 301, because affiliate offers
//    change and we don't want Google or browsers caching this as a permanent
//    destination.
// 4. If the slug doesn't exist or is marked inactive, redirects to a safe
//    fallback instead of a broken link.

import { NextRequest, NextResponse } from "next/server";
import { affiliateLinks } from "@/lib/affiliate-links";

const DEFAULT_FALLBACK = "https://scoremotive.com";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const link = affiliateLinks[slug];

  const referer = request.headers.get("referer") ?? "unknown";
  const timestamp = new Date().toISOString();

  if (!link || !link.active) {
    console.log(
      `[affiliate-redirect] MISS slug="${slug}" referer="${referer}" time="${timestamp}"`
    );
    const fallback = link?.fallbackUrl ?? DEFAULT_FALLBACK;
    return NextResponse.redirect(fallback, { status: 302 });
  }

  console.log(
    `[affiliate-redirect] HIT slug="${slug}" network="${link.network}" category="${link.category}" analyticsLabel="${link.analyticsLabel}" referer="${referer}" time="${timestamp}"`
  );

  return NextResponse.redirect(link.url, { status: 302 });
}
