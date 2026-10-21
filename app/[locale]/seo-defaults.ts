type Locale = "en" | "es";

export const SITE_NAME = "ScoreMotive";
export const OG_TYPE = "website" as const;
export const OG_TYPE_ARTICLE = "article" as const;
export const TWITTER_CARD = "summary_large_image" as const;
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_US",
};
export const OG_IMAGES = [
  { url: "/brand/og-image.png", width: 1200, height: 630, alt: "ScoreMotive" },
];
export const TWITTER_IMAGES = ["/brand/og-image.png"];
