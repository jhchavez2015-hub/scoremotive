import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";
import { blogPosts } from "./posts-meta";

type Locale = "en" | "es";

const content: Record<Locale, {
  eyebrow: string;
  title: string;
  metaTitle: string;
  intro: string;
  readSuffix: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  footerText: string;
  home: string;
  about: string;
  tools: string;
}> = {
  en: {
    eyebrow: "Financial Education",
    title: "Articles & Guides",
    metaTitle: "Articles & Guides — ScoreMotive Blog",
    intro: "Learn how the American credit system works, strategies to pay off debt, and how to improve your FICO score.",
    readSuffix: "read",
    ctaTitle: "Ready to analyze your score?",
    ctaDesc: "Use our free tools to see your estimated FICO score and create your debt payoff plan.",
    ctaBtn: "Try the Tools Free",
    footerText: "© 2026 ScoreMotive · Educational use only",
    home: "Home",
    about: "About",
    tools: "Tools",
  },
  es: {
    eyebrow: "Educación Financiera",
    title: "Artículos y Guías",
    metaTitle: "Artículos y Guías — Blog de ScoreMotive",
    intro: "Aprende cómo funciona el sistema de crédito americano, estrategias para pagar deudas y cómo mejorar tu puntaje FICO.",
    readSuffix: "lectura",
    ctaTitle: "¿Listo para analizar tu score?",
    ctaDesc: "Usa nuestras herramientas gratuitas para ver tu puntaje FICO estimado y crear tu plan de pago de deudas.",
    ctaBtn: "Probar las Herramientas",
    footerText: "© 2026 ScoreMotive · Solo uso educativo",
    home: "Inicio",
    about: "Nosotros",
    tools: "Herramientas",
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

  return {
    title: t.metaTitle,
    description: t.intro,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        es: `${baseUrl}/es/blog`,
        "x-default": `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      title: t.metaTitle,
      description: t.intro,
      url: `${baseUrl}/${locale}/blog`,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.metaTitle,
      description: t.intro,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}`} className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors">
            ← ScoreMotive
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8892a4]">Blog</span>
            <Link href={`/${otherLocale}/blog`} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300">
              🌐 {isEs ? "EN" : "ES"}
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Title */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[3px] text-[#4f7cff] font-medium">
            {t.eyebrow}
          </span>
          <h1 className="text-4xl font-black tracking-[-1px] mt-2 mb-4">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-sm leading-relaxed max-w-xl">
            {t.intro}
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <a
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="block bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full" style={{ background: post.tagColor, color: post.tagText }}>
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-[#8892a4]">{post.date} · {post.readTime} {t.readSuffix}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#f0f2f7] mb-2 group-hover:text-[#4f7cff] transition-colors leading-snug">
                    {isEs ? post.titleEs : post.titleEn}
                  </h2>
                  <p className="text-sm text-[#8892a4] leading-relaxed">
                    {isEs ? post.descEs : post.descEn}
                  </p>
                </div>
                <div className="text-[#8892a4] group-hover:text-[#4f7cff] transition-colors flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-10">
          <h3 className="text-xl font-bold text-[#f0f2f7] mb-3">
            {t.ctaTitle}
          </h3>
          <p className="text-sm text-[#8892a4] mb-6">
            {t.ctaDesc}
          </p>
          <a href={`/${locale}/tools`} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {t.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">{t.footerText}</span>
          <div className="flex gap-6">
            <a href={`/${locale}`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.home}</a>
            <a href={`/${locale}/about`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.about}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.tools}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
