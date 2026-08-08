import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";

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

// TODO(tech-debt): This `posts` array duplicates app/[locale]/blog/posts-meta.ts
// (title/slug/tag are repeated in both places with extra fields here: descriptions,
// date, readTime, tag colors). Adding a new article currently means editing both
// files. Consider consolidating into a single shared data source both files import
// from, so a new article only needs to be added in one place. Deferred — not blocking
// the current fix, revisit when there's time.
const posts = [
  {
    slug: "fico-8-vs-fico-10t",
    titleEn: "FICO 8 vs FICO 10T: What's the Difference and Why It Matters",
    titleEs: "FICO 8 vs FICO 10T: Cuál es la Diferencia y Por Qué Importa",
    descEn: "Most Americans don't know there are multiple FICO models. The difference between FICO 8 and FICO 10T can mean thousands of dollars on your next loan.",
    descEs: "La mayoría de los americanos no saben que existen múltiples modelos FICO. La diferencia entre FICO 8 y FICO 10T puede significar miles de dólares en tu próximo préstamo.",
    date: "June 2026",
    readTime: "6 min",
    tag: "FICO Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
  },
  {
    slug: "debt-avalanche-vs-snowball",
    titleEn: "Debt Avalanche vs Debt Snowball: Which Pays Off Debt Faster",
    titleEs: "Avalancha vs Bola de Nieve: Cuál Liquida Deudas Más Rápido",
    descEn: "Two popular debt payoff strategies — but only one saves you the most money. Here's the math behind both methods and which one wins.",
    descEs: "Dos estrategias populares para pagar deudas — pero solo una te ahorra más dinero. Aquí está la matemática detrás de ambos métodos y cuál gana.",
    date: "June 2026",
    readTime: "5 min",
    tag: "Debt",
    tagColor: "rgba(6,214,160,0.1)",
    tagText: "#06d6a0",
  },
  {
    slug: "hard-inquiry",
    titleEn: "What Is a Hard Inquiry? How It Affects Your Credit Score",
    titleEs: "¿Qué es un Hard Inquiry? Cómo Afecta tu Credit Score",
    descEn: "A hard inquiry can lower your score by a few points — but not as much, or for as long, as most people think.",
    descEs: "Un hard inquiry puede bajar tu puntaje unos pocos puntos — pero no tanto, ni por tanto tiempo, como mucha gente cree.",
    date: "August 2026",
    readTime: "3 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
  },
  {
    slug: "raise-credit-score-100-points",
    titleEn: "How to Raise Your Credit Score 100 Points in 6 Months",
    titleEs: "Cómo Subir tu Credit Score 100 Puntos en 6 Meses",
    descEn: "A step-by-step action plan based on how FICO actually calculates your score. No gimmicks — just the moves that work.",
    descEs: "Un plan de acción paso a paso basado en cómo FICO realmente calcula tu puntaje. Sin trucos — solo las acciones que funcionan.",
    date: "June 2026",
    readTime: "7 min",
    tag: "Credit Score",
    tagColor: "rgba(245,158,11,0.1)",
    tagText: "#f59e0b",
  },
  {
    slug: "rent-utilities-credit-score",
    titleEn: "How Your Rent and Utility Bills Can Raise Your Credit Score",
    titleEs: "Cómo tu Renta y Servicios Pueden Subir tu Credit Score",
    descEn: "For decades, paying rent on time didn't count toward your credit. That's changing — and it could be your most powerful financial advantage.",
    descEs: "Por décadas, pagar la renta puntualmente no contaba para tu crédito. Eso está cambiando — y puede ser tu ventaja más poderosa.",
    date: "June 2026",
    readTime: "6 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
  },
  {
    slug: "rent-reporting-platforms-2026",
    titleEn: "The 10 Best Platforms to Report Rent and Utilities to Credit Bureaus in 2026",
    titleEs: "Las 10 Mejores Plataformas para Reportar Renta y Servicios al Buró de Crédito en 2026",
    descEn: "We compare every platform available in the US — what they cost, what they report, and why some are worth paying for.",
    descEs: "Comparamos cada plataforma disponible en USA — cuánto cuestan, qué reportan y por qué algunas vale la pena pagar.",
    date: "June 2026",
    readTime: "8 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
  },
  {
    slug: "how-to-dispute-credit-report-errors",
    titleEn: "How to Dispute Credit Report Errors (Step by Step, for Free)",
    titleEs: "Cómo Disputar Errores en tu Reporte de Crédito (Paso a Paso y Gratis)",
    descEn: "1 in 5 credit reports has an error. Here's exactly what to check, how to pull your free report, and how to dispute mistakes directly with the bureaus — no paid service needed.",
    descEs: "1 de cada 5 reportes de crédito tiene un error. Aquí te decimos exactamente qué revisar, cómo pedir tu reporte gratis y cómo disputar errores directo con los burós — sin pagar a nadie.",
    date: "August 2026",
    readTime: "6 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
  },
];

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
          {posts.map((post) => (
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
