import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";

type Locale = "en" | "es";

const SLUG = "credit-utilization";

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
    title: "Credit Utilization",
    subtitle: "The percentage of your available credit you're currently using — and one of the fastest levers you can pull to raise your score.",
    navBack: "← Glossary",
    ctaTitle: "Want to see your utilization right now?",
    ctaDesc: "Use our free Dual Score Estimator — it factors in your utilization automatically and shows you exactly how it's affecting your score.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What is credit utilization?",
        answer: "Credit utilization is the percentage of your total available revolving credit (mainly credit cards) that you're currently using. If you have a $1,000 limit and a $300 balance, your utilization is 30%.",
      },
      {
        question: "What's a good utilization ratio?",
        answer: "Under 30% is generally considered safe. Under 10% is where you start seeing the strongest positive impact on your score. Some people aiming for an excellent score keep it under 5%.",
      },
      {
        question: "Does utilization reset every month?",
        answer: "Yes — utilization is a snapshot, not a running total. It's typically calculated from the balance reported to the bureaus on your statement closing date, so paying down your balance before that date can lower your reported utilization immediately.",
      },
      {
        question: "Does closing a credit card hurt my utilization?",
        answer: "It can. Closing a card removes its credit limit from your total available credit, which raises your overall utilization percentage even if your spending hasn't changed. It's often better to keep old cards open and unused.",
      },
    ],
  },
  es: {
    title: "Utilización de Crédito",
    subtitle: "El porcentaje de tu crédito disponible que estás usando actualmente — una de las palancas más rápidas para subir tu puntaje.",
    navBack: "← Glosario",
    ctaTitle: "¿Quieres ver tu utilización ahora mismo?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — considera tu utilización automáticamente y te muestra exactamente cómo está afectando tu puntaje.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué es la utilización de crédito?",
        answer: "La utilización de crédito es el porcentaje de tu crédito rotativo total disponible (principalmente tarjetas) que estás usando actualmente. Si tienes un límite de $1,000 y un balance de $300, tu utilización es 30%.",
      },
      {
        question: "¿Cuál es un buen nivel de utilización?",
        answer: "Menos del 30% generalmente se considera seguro. Menos del 10% es donde empiezas a ver el impacto positivo más fuerte en tu puntaje. Algunas personas que buscan un puntaje excelente la mantienen por debajo del 5%.",
      },
      {
        question: "¿La utilización se reinicia cada mes?",
        answer: "Sí — la utilización es una fotografía, no un acumulado. Normalmente se calcula del balance reportado al buró en la fecha de corte de tu estado de cuenta, así que pagar tu balance antes de esa fecha puede bajar tu utilización reportada de inmediato.",
      },
      {
        question: "¿Cerrar una tarjeta afecta mi utilización?",
        answer: "Puede afectarla. Cerrar una tarjeta elimina su límite de tu crédito total disponible, lo que sube tu porcentaje de utilización general aunque tu gasto no haya cambiado. Muchas veces es mejor mantener tarjetas antiguas abiertas y sin usar.",
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

export default async function CreditUtilizationPage({
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Qué es la Utilización de Crédito?</h2>
                <p>Es el porcentaje de tu crédito rotativo total disponible (principalmente tarjetas) que estás usando actualmente. Si tienes un límite de $1,000 y un balance de $300, tu utilización es 30%.</p>
                <p>Los modelos de puntaje calculan dos versiones: tu utilización general (todas las tarjetas juntas) y tu utilización por tarjeta individual. Ambas importan.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Cuál es un Buen Nivel?</h2>
                <p>Menos del 30% generalmente se considera seguro. Menos del 10% es donde empiezas a ver el impacto positivo más fuerte en tu puntaje.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">La utilización se calcula del balance reportado en tu fecha de corte, no de tu fecha de pago. Pagar antes de esa fecha —no solo antes de la fecha límite— es la forma más rápida de bajar tu utilización reportada.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Por Qué Importa Tanto</h2>
                <p>La utilización es el segundo factor más importante en tu puntaje FICO, después del historial de pagos. A diferencia de la antigüedad de tus cuentas, es algo que puedes cambiar en semanas, no en años.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo Bajarla Rápido</h2>
                <ul className="space-y-2 list-none">
                  {["Paga tu balance antes de la fecha de corte, no solo antes de la fecha límite", "Pide un aumento de límite (sin usarlo)", "Reparte el gasto entre varias tarjetas en vez de una sola", "Mantén tarjetas antiguas abiertas aunque no las uses"].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#c8d0dc]">
                      <span className="text-[#06d6a0] flex-shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">En Resumen</h2>
                <p>La utilización es una de las pocas variables de tu puntaje que puedes mover rápido. Bajarla del 60% al 25% puede subir tu puntaje 50 a 80 puntos en un solo ciclo de facturación.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Is Credit Utilization?</h2>
                <p>It's the percentage of your total available revolving credit (mainly credit cards) that you're currently using. If you have a $1,000 limit and a $300 balance, your utilization is 30%.</p>
                <p>Scoring models calculate two versions: your overall utilization (all cards combined) and your per-card utilization. Both matter.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What's a Good Ratio?</h2>
                <p>Under 30% is generally considered safe. Under 10% is where you start seeing the strongest positive impact on your score.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">Utilization is calculated from the balance reported on your statement closing date, not your due date. Paying before that date — not just before the due date — is the fastest way to lower your reported utilization.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Why It Matters So Much</h2>
                <p>Utilization is the second most important factor in your FICO score, after payment history. Unlike account age, it's something you can change in weeks, not years.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How to Lower It Fast</h2>
                <ul className="space-y-2 list-none">
                  {["Pay your balance before your statement closing date, not just the due date", "Ask for a credit limit increase (without using it)", "Spread spending across multiple cards instead of one", "Keep old cards open even if you don't use them"].map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-[#c8d0dc]">
                      <span className="text-[#06d6a0] flex-shrink-0 mt-0.5">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Bottom Line</h2>
                <p>Utilization is one of the few variables in your score you can move quickly. Dropping it from 60% to 25% can raise your score 50 to 80 points in a single billing cycle.</p>
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
