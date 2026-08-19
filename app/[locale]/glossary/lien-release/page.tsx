import type { Metadata } from "next";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";
import DetailPageHeader from "@/components/DetailPageHeader";

type Locale = "en" | "es";

const SLUG = "lien-release";

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
    title: "Lien Release",
    subtitle: "An automatic notice the IRS issues about 30 days after a tax debt is paid, marking the lien as satisfied — though the public record still remains visible.",
    navBack: "← Glossary",
    ctaTitle: "Owe back taxes and other debt at the same time?",
    ctaDesc: "Use our free Debt Accelerator to build a payoff plan that prioritizes what actually protects your credit and your finances first.",
    ctaBtn: "Build My Payoff Plan Free",
    disclaimerText: "ScoreMotive is an educational tool, not a tax or legal advisor. Tax lien resolution depends on your specific situation — consult a tax attorney, CPA, or enrolled agent before taking action with the IRS.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What is a tax lien release?",
        answer: "A lien release is the IRS's confirmation that you've paid your tax debt in full. It updates the lien's status to \"satisfied,\" but the public filing itself stays on record.",
      },
      {
        question: "Do I have to request a release?",
        answer: "No. Unlike a withdrawal, a release is automatic — the IRS issues it about 30 days after you pay the debt in full, with no application needed.",
      },
      {
        question: "Does a release erase the lien from public records?",
        answer: "No. A release only marks the lien as paid — the filing remains visible in public records. To fully erase it, you need to request a withdrawal separately.",
      },
      {
        question: "What's the difference between a release and a withdrawal?",
        answer: "A release is automatic and just updates the lien's status to paid, while the public record stays visible. A withdrawal erases the public filing entirely and must be actively requested.",
      },
    ],
  },
  es: {
    title: "Release de un Lien (Liberación)",
    subtitle: "Un aviso automático que el IRS emite unos 30 días después de pagar una deuda fiscal, marcando el lien como satisfecho — aunque el registro público sigue siendo visible.",
    navBack: "← Glosario",
    ctaTitle: "¿Debes impuestos atrasados y otras deudas al mismo tiempo?",
    ctaDesc: "Usa nuestro Acelerador de Deudas gratuito para armar un plan de pago que priorice lo que realmente protege tu crédito y tus finanzas primero.",
    ctaBtn: "Armar mi Plan de Pago Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa, no un asesor fiscal o legal. La resolución de un tax lien depende de tu situación específica — consulta a un abogado fiscal, CPA o enrolled agent antes de tomar acción con el IRS.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué es un release de tax lien?",
        answer: "Un release es la confirmación del IRS de que pagaste tu deuda fiscal por completo. Actualiza el estatus del lien a \"satisfecho\", pero el registro público en sí sigue existiendo.",
      },
      {
        question: "¿Tengo que solicitar el release?",
        answer: "No. A diferencia de un withdrawal, el release es automático — el IRS lo emite unos 30 días después de que pagas la deuda por completo, sin necesidad de solicitud.",
      },
      {
        question: "¿El release borra el lien de los registros públicos?",
        answer: "No. Un release solo marca el lien como pagado — el registro sigue visible en los registros públicos. Para borrarlo por completo, necesitas solicitar un withdrawal por separado.",
      },
      {
        question: "¿Cuál es la diferencia entre release y withdrawal?",
        answer: "Un release es automático y solo actualiza el estatus del lien a pagado, mientras el registro público sigue visible. Un withdrawal borra el registro público por completo y debe solicitarse activamente.",
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

export default async function LienReleaseGlossaryPage({
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
  const priorityRelated = ["tax-lien", "lien-withdrawal"];
  const related = [
    ...glossaryTerms.filter((term) => priorityRelated.includes(term.slug)),
    ...glossaryTerms.filter((term) => term.slug !== SLUG && !priorityRelated.includes(term.slug)),
  ].slice(0, 3);

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
                <p>Un release es la confirmación de que pagaste tu deuda fiscal. El IRS lo emite automáticamente — no tienes que solicitarlo — pero el registro público del lien sigue existiendo, solo que actualizado como &quot;pagado&quot; en lugar de eliminarse.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cuándo Ocurre</h2>
                <p>El release se emite automáticamente unos 30 días después de pagar la deuda por completo. Es un paso pasivo — no requiere ninguna acción de tu parte.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">Si un release no es suficiente para tus planes (por ejemplo, quieres que el lien deje de aparecer en cualquier búsqueda de registros públicos), el siguiente paso es solicitar un withdrawal.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Release vs. Withdrawal</h2>
                <p>La diferencia clave: el release solo actualiza el estatus del lien a &quot;pagado&quot; mientras el registro sigue visible; el withdrawal borra el registro por completo, como si nunca hubiera existido.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Quick Definition</h2>
                <p>A release is confirmation that you&apos;ve paid your tax debt. The IRS issues it automatically — you don&apos;t have to request it — but the lien&apos;s public record still exists, just updated to &quot;paid&quot; instead of removed.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">When It Happens</h2>
                <p>The release is issued automatically about 30 days after you pay the debt in full. It&apos;s a passive step — it requires no action on your part.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">If a release isn&apos;t enough for your plans (for example, you want the lien to stop showing up in any public records search), the next step is requesting a withdrawal.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Release vs. Withdrawal</h2>
                <p>The key difference: a release just updates the lien&apos;s status to &quot;paid&quot; while the record stays visible; a withdrawal erases the record entirely, as if it never existed.</p>
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
            href={`/${locale}/blog/tax-lien-credit-score`}
            className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-[10px] font-medium uppercase tracking-[1px] text-[#7ba7ff]">Blog</span>
            <h4 className="text-sm font-bold text-[#f0f2f7] mt-1.5">
              {isEs ? "¿Los Tax Liens Todavía Afectan tu Puntaje de Crédito? Qué Cambió en 2018" : "Do Tax Liens Still Affect Your Credit Score? What Changed in 2018"}
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
