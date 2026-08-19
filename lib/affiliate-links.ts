// lib/affiliate-links.ts
//
// Single source of truth for every affiliate link on the site.
// Articles and components should NEVER hardcode a raw affiliate URL —
// always link to /go/[slug] instead, which reads from this file.
//
// Why: when a network rotates an offer (happens often with CJ/FlexOffers),
// you update the `url` here once, and every article that links to /go/[slug]
// picks up the new destination automatically — no hunting through content.

export type AffiliateLink = {
  url: string;
  network: "CJ" | "FlexOffers" | "Direct";
  category: string;
  active: boolean;
  fallbackUrl?: string;
  lastVerified: string; // ISO date, e.g. "2026-08-11"
  analyticsLabel: string; // slug-safe label sent to GA on click, e.g. "smartcredit_trial"
};

export const affiliateLinks: Record<string, AffiliateLink> = {
  smartcredit: {
    url: "https://www.anrdoezrs.net/click-101805316-17138841",
    network: "CJ",
    category: "credit-monitoring",
    active: true,
    lastVerified: "2026-08-11",
    analyticsLabel: "smartcredit_trial",
  },
};
