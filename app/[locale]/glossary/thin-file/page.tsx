import type { Metadata } from "next";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";
import DetailPageHeader from "@/components/DetailPageHeader";

type Locale = "en" | "es";

const SLUG = "thin-file";

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
    title: "Thin File",
    subtitle: "A credit report with too little history for scoring models to generate a reliable score — common among newcomers to the US credit system.",
    navBack: "← Glossary",
    ctaTitle: "Not sure where you stand?",
    ctaDesc: "Use our free Dual Score Estimator to see your current credit picture and get a clear plan to build history.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What counts as a thin file?",
        answer: "There's no single official cutoff, but generally a credit file is considered \"thin\" if it has fewer than 5 accounts, or accounts open for less than 2 years, making it hard for scoring models to generate a reliable score.",
      },
      {
        question: "Why can't I get approved with a thin file?",
        answer: "Lenders rely on your credit history to predict how you'll handle new credit. With too little data, some scoring models can't generate a score at all, and many lenders default to rejecting the application rather than taking on unknown risk.",
      },
      {
        question: "How do I fix a thin file?",
        answer: "The fastest paths are becoming an authorized user on someone else's established card, opening a secured credit card, or using rent and utility reporting services that add your payment history to your credit file.",
      },
      {
        question: "Do newer scoring models help with thin files?",
        answer: "Yes. Models like FICO 10T and VantageScore 4.0 can incorporate alternative data — like on-time rent and utility payments — that traditional models ignore, which helps build a file faster.",
      },
    ],
  },
  es: {
    title: "Thin File (Historial Delgado)",
    subtitle: "Un reporte de crédito con muy poco historial para que los modelos generen un puntaje confiable — común entre quienes son nuevos en el sistema de crédito de EE.UU.",
    navBack: "← Glosario",
    ctaTitle: "¿No sabes cómo estás?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito para ver tu panorama de crédito actual y un plan claro para construir historial.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué se considera un thin file?",
        answer: "No hay un límite oficial único, pero generalmente un archivo se considera \"delgado\" si tiene menos de 5 cuentas, o cuentas abiertas por menos de 2 años, lo que dificulta que los modelos generen un puntaje confiable.",
      },
      {
        question: "¿Por qué no me aprueban con un thin file?",
        answer: "Los prestamistas dependen de tu historial para predecir cómo manejarás crédito nuevo. Con muy pocos datos, algunos modelos no pueden generar un puntaje, y muchos prestamistas prefieren rechazar la solicitud antes que asumir un riesgo desconocido.",
      },
      {
        question: "¿Cómo arreglo un thin file?",
        answer: "Los caminos más rápidos son volverte usuario autorizado en una tarjeta establecida de otra persona, abrir una tarjeta de crédito garantizada, o usar servicios de reporte de renta y servicios que agregan tu historial de pagos a tu archivo de crédito.",
      },
      {
        question: "¿Los modelos nuevos ayudan con thin files?",
        answer: "Sí. Modelos como FICO 10T y VantageScore 4.0 pueden incorporar datos alternativos — como pagos puntuales de renta y servicios — que los modelos tradicionales ignoran, lo que ayuda a construir un archivo más rápido.",
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

export default async function ThinFilePage({
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

      <DetailPageHeader
        backHref={`/${locale}/glossary`}
        backLabel={t.navBack}
        otherLocaleHref={`/${otherLocale}/glossary/${SLUG}`}
        isEs={isEs}
      />

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
                <p>Un thin file es un reporte de crédito con muy pocas cuentas o muy poca antigüedad para que los modelos de puntaje generen un resultado confiable. Es común entre personas jóvenes, inmigrantes recientes, o cualquiera que nunca haya usado crédito formal en EE.UU.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Por Qué Es un Problema</h2>
                <p>Los prestamistas dependen de tu historial para predecir riesgo. Sin suficientes datos, algunos modelos ni siquiera pueden calcular un puntaje — y muchos prestamistas prefieren rechazar la solicitud antes que asumir un riesgo desconocido, sin importar tus ingresos.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Dato</p>
                  <p className="text-sm text-[#c8d0dc]">Pagar renta y servicios puntualmente por años no contaba tradicionalmente para tu historial — pero eso está cambiando con los nuevos modelos de puntaje.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo Construir Historial Rápido</h2>
                <ul className="space-y-2 list-none">
                  {["Volverte usuario autorizado en una tarjeta establecida de un familiar", "Abrir una tarjeta de crédito garantizada (secured card)", "Activar servicios de reporte de renta y servicios", "Considerar un préstamo de construcción de crédito (credit-builder loan)"].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#c8d0dc]">
                      <span className="text-[#06d6a0] flex-shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Quick Definition</h2>
                <p>A thin file is a credit report with too few accounts or too little history for scoring models to generate a reliable result. It's common among young people, recent immigrants, or anyone who's never used formal credit in the US.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Why It's a Problem</h2>
                <p>Lenders rely on your history to predict risk. Without enough data, some models can't even calculate a score — and many lenders default to rejecting the application rather than taking on unknown risk, regardless of your income.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Good to Know</p>
                  <p className="text-sm text-[#c8d0dc]">Paying rent and utilities on time for years never traditionally counted toward your history — but that's changing with newer scoring models.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How to Build History Fast</h2>
                <ul className="space-y-2 list-none">
                  {["Become an authorized user on a family member's established card", "Open a secured credit card", "Activate rent and utility reporting services", "Consider a credit-builder loan"].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#c8d0dc]">
                      <span className="text-[#06d6a0] flex-shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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

        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#8892a4] mb-4">
            {isEs ? "Lee el artículo relacionado" : "Read the related article"}
          </h3>
          <a
            href={`/${locale}/blog/rent-utilities-credit-score`}
            className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-[10px] font-medium uppercase tracking-[1px] text-[#7ba7ff]">Blog</span>
            <h4 className="text-sm font-bold text-[#f0f2f7] mt-1.5">
              {isEs ? "Cómo tu Renta y Servicios Pueden Subir tu Credit Score" : "How Your Rent and Utility Bills Can Raise Your Credit Score"}
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
