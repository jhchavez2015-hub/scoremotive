import type { Metadata } from "next";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";
import DetailPageHeader from "@/components/DetailPageHeader";

type Locale = "en" | "es";

const SLUG = "tax-lien";

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
    title: "Tax Lien",
    subtitle: "A legal claim the government files against your property when you don't pay a tax debt — it no longer appears on your credit report, but it can still block you from lending.",
    navBack: "← Glossary",
    ctaTitle: "Owe back taxes and other debt at the same time?",
    ctaDesc: "Use our free Debt Accelerator to build a payoff plan that prioritizes what actually protects your credit and your finances first.",
    ctaBtn: "Build My Payoff Plan Free",
    disclaimerText: "ScoreMotive is an educational tool, not a tax or legal advisor. Tax lien resolution depends on your specific situation — consult a tax attorney, CPA, or enrolled agent before taking action with the IRS.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What is a tax lien?",
        answer: "A tax lien is the government's legal claim against your property — real estate, vehicles, bank accounts — when you fail to pay a tax debt. It's filed by the IRS (federal) or your state tax agency.",
      },
      {
        question: "Does a tax lien affect my credit score?",
        answer: "Not directly. Since April 2018, all three credit bureaus stopped including tax liens on consumer credit reports. But the lien is still public record and can affect lending decisions outside your credit report.",
      },
      {
        question: "What's the difference between a lien and a levy?",
        answer: "A lien is the government's legal claim to your property as security for the debt. A levy is the actual seizure of that property. A lien can exist for years without ever becoming a levy.",
      },
      {
        question: "How do I remove a tax lien?",
        answer: "Paying the debt in full triggers an automatic \"release\" about 30 days later. To fully erase the public record, you need to request a \"withdrawal\" using IRS Form 12277, if you qualify.",
      },
    ],
  },
  es: {
    title: "Tax Lien (Gravamen Fiscal)",
    subtitle: "Una reclamación legal que el gobierno presenta contra tu propiedad cuando no pagas una deuda fiscal — ya no aparece en tu reporte de crédito, pero te puede seguir bloqueando para conseguir crédito.",
    navBack: "← Glosario",
    ctaTitle: "¿Debes impuestos atrasados y otras deudas al mismo tiempo?",
    ctaDesc: "Usa nuestro Acelerador de Deudas gratuito para armar un plan de pago que priorice lo que realmente protege tu crédito y tus finanzas primero.",
    ctaBtn: "Armar mi Plan de Pago Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa, no un asesor fiscal o legal. La resolución de un tax lien depende de tu situación específica — consulta a un abogado fiscal, CPA o enrolled agent antes de tomar acción con el IRS.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué es un tax lien?",
        answer: "Un tax lien es la reclamación legal del gobierno contra tu propiedad — bienes raíces, vehículos, cuentas bancarias — cuando no pagas una deuda de impuestos. Lo presenta el IRS (federal) o tu agencia estatal.",
      },
      {
        question: "¿Un tax lien afecta mi puntaje de crédito?",
        answer: "No directamente. Desde abril de 2018, las tres agencias de crédito dejaron de incluir tax liens en los reportes de consumidores. Pero sigue siendo registro público y puede afectar decisiones de préstamo por fuera de tu reporte.",
      },
      {
        question: "¿Cuál es la diferencia entre un lien y un levy?",
        answer: "Un lien es la reclamación legal del gobierno sobre tu propiedad como garantía de la deuda. Un levy es la toma real de esa propiedad. Un lien puede existir años sin convertirse nunca en levy.",
      },
      {
        question: "¿Cómo elimino un tax lien?",
        answer: "Pagar la deuda completa genera un \"release\" automático unos 30 días después. Para borrar el registro público por completo, necesitas solicitar un \"withdrawal\" con el Form 12277 del IRS, si calificas.",
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

export default async function TaxLienGlossaryPage({
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
  const priorityRelated = ["lien-withdrawal", "lien-release"];
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
                <p>Un tax lien es la reclamación legal del gobierno (federal o estatal) sobre tu propiedad cuando no pagas una deuda de impuestos. No es lo mismo que un embargo (levy) — el lien es la reclamación, el levy es cuando efectivamente toman la propiedad.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Impacto en tu Puntaje</h2>
                <p>Desde abril de 2018, los tax liens ya no aparecen en tu reporte de crédito ni afectan tu puntaje directamente. Pero sigue siendo registro público, y los prestamistas hipotecarios lo pueden encontrar por otras vías.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">Si vas a pedir una hipoteca, no asumas que un lien &quot;no cuenta&quot; solo porque tu score se ve bien — pregúntale a tu prestamista si hacen búsqueda de registros públicos.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo se Resuelve</h2>
                <p>Se resuelve pagando la deuda (lo cual genera un &quot;release&quot; automático) o, si calificas, solicitando un &quot;withdrawal&quot; que borra el registro público por completo.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Quick Definition</h2>
                <p>A tax lien is the government&apos;s (federal or state) legal claim against your property when you fail to pay a tax debt. It&apos;s not the same as a levy — the lien is the claim, the levy is when the property is actually seized.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Impact on Your Score</h2>
                <p>Since April 2018, tax liens no longer appear on your credit report or affect your score directly. But it&apos;s still public record, and mortgage lenders can find it through other channels.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">If you&apos;re applying for a mortgage, don&apos;t assume a lien &quot;doesn&apos;t count&quot; just because your score looks good — ask your lender if they run a public records search.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How It Gets Resolved</h2>
                <p>It&apos;s resolved by paying the debt (which triggers an automatic &quot;release&quot;) or, if you qualify, requesting a &quot;withdrawal&quot; that erases the public record entirely.</p>
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
