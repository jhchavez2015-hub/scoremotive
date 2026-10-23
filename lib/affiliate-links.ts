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
  "puntaje-gratis": {
    url: "https://www.kqzyfj.com/click-101805316-16959162",
    network: "CJ",
    category: "credit-score",
    active: true,
    lastVerified: "2026-10-23",
    analyticsLabel: "check-score-wallethub-free",
  },
  "monitoreo-3-buros": {
    url: "https://www.kqzyfj.com/click-101805316-16946649",
    network: "CJ",
    category: "credit-monitoring",
    active: true,
    lastVerified: "2026-10-23",
    analyticsLabel: "check-score-3bureau",
  },
  "identidad-premium": {
    url: "https://www.tkqlhce.com/click-101805316-16952385",
    network: "CJ",
    category: "identity-protection",
    active: true,
    lastVerified: "2026-10-23",
    analyticsLabel: "check-score-wallethub-premium",
  },
  "reporte-renta-servicios": {
    url: "https://www.kqzyfj.com/click-101805316-17264776",
    network: "CJ",
    category: "rent-reporting",
    active: true,
    lastVerified: "2026-10-23",
    analyticsLabel: "rent-platforms-comparison-wallethub",
  },
};
