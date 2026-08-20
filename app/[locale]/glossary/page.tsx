import type { Metadata } from "next";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";
import { glossaryTerms } from "./glossary-meta";

type Locale = "en" | "es";

const content: Record<Locale, { title: string; subtitle: string; navLabel: string }> = {
  en: {
    title: "Credit Glossary",
    subtitle: "Plain-English definitions of the credit terms that actually matter.",
    navLabel: "Glossary",
  },
  es: {
    title: "Glosario de Crédito",
    subtitle: "Definiciones claras de los términos de crédito que realmente importan.",
    navLabel: "Glosario",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";
  const url = `${baseUrl}/${locale}/glossary`;

  return {
    title: t.title,
    description: t.subtitle,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/glossary`,
        es: `${baseUrl}/es/glossary`,
        "x-default": `${baseUrl}/en/glossary`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.subtitle,
      url,
      siteName: SITE_NAME,
      type: OG_TYPE_ARTICLE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.subtitle,
    },
  };
}

export default async function GlossaryIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: t.title,
    description: t.subtitle,
    hasDefinedTerm: glossaryTerms.map((term) => ({
      "@type": "DefinedTerm",
      name: isEs ? term.termEs : term.termEn,
      description: isEs ? term.shortDefEs : term.shortDefEn,
      url: `https://scoremotive.com/${locale}/glossary/${term.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionHeader
        maxWidth="3xl"
        backHref={`/${locale}`}
        label={t.navLabel}
        otherLocaleHref={`/${otherLocale}/glossary`}
        isEs={isEs}
      />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
          {t.title}
        </h1>
        <p className="text-[#8892a4] text-lg leading-relaxed font-light mb-10">
          {t.subtitle}
        </p>

        <div className="space-y-3">
          {glossaryTerms.map((term) => (
            <Link
              key={term.slug}
              href={`/${locale}/glossary/${term.slug}`}
              className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <h2 className="text-base font-bold text-[#f0f2f7] group-hover:text-[#4f7cff] transition-colors">
                {isEs ? term.termEs : term.termEn}
              </h2>
              <p className="text-sm text-[#8892a4] mt-1">
                {isEs ? term.shortDefEs : term.shortDefEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
