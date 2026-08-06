import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";

type Locale = "en" | "es";

const SLUG = "hard-inquiry";

const content: Record<Locale, {
  title: string;
  subtitle: string;
  navBack: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  disclaimerText: string;
  toolsLabel: string;
  relatedTitle: string;
  faqs: { question: string; answer: string }[];
}> = {
  en: {
    title: "Hard Inquiry",
    subtitle: "A credit check triggered by a new credit application — it can temporarily lower your score, but less than most people think.",
    navBack: "← Glossary",
    ctaTitle: "Want to see where your score stands right now?",
    ctaDesc: "Use our free Dual Score Estimator — it estimates your score on both models and tells you exactly which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What is a hard inquiry?",
        answer: "A hard inquiry — also called a \"hard pull\" — happens when a lender checks your full credit report because you applied for new credit: a credit card, an auto loan, a mortgage, or a personal loan.",
      },
      {
        question: "How much does a hard inquiry lower my score?",
        answer: "Most hard inquiries lower your FICO or VantageScore by about 5 to 10 points. The exact hit depends on your overall credit profile.",
      },
      {
        question: "How long does a hard inquiry stay on my report?",
        answer: "Hard inquiries stay on your credit report for two years, but they stop affecting your score much sooner — usually after about 12 months.",
      },
      {
        question: "What's the difference between a hard and a soft inquiry?",
        answer: "Soft inquiries — like checking your own score or a pre-approval offer — never affect your credit score. Only hard inquiries, tied to an actual credit application, do.",
      },
    ],
  },
  es: {
    title: "Hard Inquiry (Consulta Dura)",
    subtitle: "Una revisión de crédito generada por una solicitud de crédito nuevo — puede bajar tu puntaje temporalmente, pero menos de lo que mucha gente cree.",
    navBack: "← Glosario",
    ctaTitle: "¿Quieres ver cómo está tu puntaje ahora mismo?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — estima tu puntaje en ambos modelos y te dice exactamente qué factores mejorar primero.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué es un hard inquiry?",
        answer: "Un hard inquiry — también llamado \"consulta dura\" — ocurre cuando un prestamista revisa tu reporte de crédito completo porque solicitaste crédito nuevo: una tarjeta, un préstamo de auto, una hipoteca o un préstamo personal.",
      },
      {
        question: "¿Cuánto baja mi puntaje?",
        answer: "La mayoría de los hard inquiries bajan tu FICO o VantageScore entre 5 y 10 puntos. El impacto exacto depende de tu perfil de crédito general.",
      },
      {
        question: "¿Cuánto dura en mi reporte?",
        answer: "Los hard inquiries permanecen en tu reporte durante dos años, pero dejan de afectar tu puntaje mucho antes — normalmente después de unos 12 meses.",
      },
      {
        question: "¿Cuál es la diferencia entre un hard y un soft inquiry?",
        answer: "Los soft inquiries — como revisar tu propio puntaje o una oferta pre-aprobada — nunca afectan tu puntaje de crédito. Solo los hard inquiries, ligados a una solicitud real, sí lo hacen.",
      },
    ],
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
  const url = `${baseUrl}/${locale}/glossary/${SLUG}`;

  return {
    title: `${t.title} — ScoreMotive Glossary`,
    description: t.subtitle,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/glossary/${SLUG}`,
        es: `${baseUrl}/es/glossary/${SLUG}`,
        "x-default": `${baseUrl}/en/glossary/${SLUG}`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.subtitle,
      url,
      siteName: SITE_NAME,
      type: "article",
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.subtitle,
    },
  };
}

export default async function HardInquiryGlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";
  const url = `${baseUrl}/${locale}/glossary/${SLUG}`;
  const related = glossaryTerms.filter((term) => term.slug !== SLUG).slice(0, 3);

  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: t.title,
    description: t.subtitle,
    inDefinedTermSet: `${baseUrl}/${locale}/glossary`,
    url,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}/glossary`} className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors">
            {t.navBack}
          </a>
          <Link href={`/${otherLocale}/glossary/${SLUG}`} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300">
            🌐 {isEs ? "EN" : "ES"}
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(79,124,255,0.1)] text-[#7ba7ff]">
              {isEs ? "Glosario" : "Glossary"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">
          {isEs ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Definición Rápida</h2>
                <p>Un hard inquiry ocurre cuando un prestamista revisa tu reporte de crédito completo porque solicitaste crédito nuevo. Solo sucede cuando le diste permiso al prestamista como parte de una solicitud — revisar tu propio puntaje nunca cuenta.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Impacto en tu Puntaje</h2>
                <p>La mayoría de los hard inquiries bajan tu puntaje entre 5 y 10 puntos. Una sola consulta casi nunca mueve mucho la aguja — lo que enciende alertas son varias consultas para tipos de crédito distintos en poco tiempo.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">Si estás comparando tasas para hipoteca o auto, varias consultas dentro de una ventana de 14 a 45 días generalmente cuentan como una sola.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Cuánto Dura?</h2>
                <p>Permanece en tu reporte dos años, pero deja de afectar tu puntaje mucho antes — normalmente después de unos 12 meses.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Quick Definition</h2>
                <p>A hard inquiry happens when a lender checks your full credit report because you applied for new credit. It only happens with your permission as part of an application — checking your own score never counts.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Impact on Your Score</h2>
                <p>Most hard inquiries lower your score by about 5 to 10 points. One inquiry rarely moves the needle much — what raises red flags is several inquiries for unrelated credit in a short window.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">If you're rate-shopping for a mortgage or auto loan, multiple inquiries within a 14–45 day window usually count as just one.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How Long It Lasts</h2>
                <p>It stays on your report for two years, but stops affecting your score much sooner — usually after about 12 months.</p>
              </section>
            </>
          )}
        </div>

        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">{t.ctaTitle}</h3>
          <p className="text-sm text-[#8892a4] mb-5">{t.ctaDesc}</p>
          <a href={`/${locale}/tools`} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {t.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#8892a4] mb-4">
            {isEs ? "Lee el artículo completo" : "Read the full article"}
          </h3>
          <a
            href={`/${locale}/blog/hard-inquiry`}
            className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-[10px] font-medium uppercase tracking-[1px] text-[#7ba7ff]">Blog</span>
            <h4 className="text-sm font-bold text-[#f0f2f7] mt-1.5">
              {isEs ? "¿Qué es un Hard Inquiry? Cómo Afecta tu Credit Score" : "What Is a Hard Inquiry? How It Affects Your Credit Score"}
            </h4>
          </a>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#8892a4] mb-4">{t.relatedTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((term) => (
              <a
                key={term.slug}
                href={`/${locale}/glossary/${term.slug}`}
                className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <h4 className="text-sm font-bold text-[#f0f2f7] leading-snug group-hover:text-[#4f7cff] transition-colors">
                  {isEs ? term.termEs : term.termEn}
                </h4>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 p-5 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl">
          <p className="text-[11px] text-[#8892a4] leading-relaxed">
            ⚠️ {t.disclaimerText}
          </p>
        </div>

      </article>

      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">© 2026 ScoreMotive</span>
          <div className="flex gap-6">
            <a href={`/${locale}/glossary`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{isEs ? "Glosario" : "Glossary"}</a>
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.toolsLabel}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
