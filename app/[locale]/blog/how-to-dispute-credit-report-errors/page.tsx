import type { Metadata } from "next";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";
import DetailPageHeader from "@/components/DetailPageHeader";

type Locale = "en" | "es";

const SLUG = "how-to-dispute-credit-report-errors";

const content: Record<Locale, {
  title: string;
  subtitle: string;
  readSuffix: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  disclaimerText: string;
  toolsLabel: string;
  relatedTitle: string;
}> = {
  en: {
    title: "How to Dispute Credit Report Errors (Step by Step, for Free)",
    subtitle: "1 in 5 credit reports has an error. Here's exactly what to check, how to pull your free report, and how to dispute mistakes directly with the bureaus — no paid service needed.",
    readSuffix: "min read",
    ctaTitle: "Want to see how a correction could move your score?",
    ctaDesc: "Use our free Dual Score Estimator — it estimates your score on both models and tells you exactly which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
  },
  es: {
    title: "Cómo Disputar Errores en tu Reporte de Crédito (Paso a Paso y Gratis)",
    subtitle: "1 de cada 5 reportes de crédito tiene un error. Aquí te decimos exactamente qué revisar, cómo pedir tu reporte gratis y cómo disputar errores directo con los burós — sin pagar a nadie.",
    readSuffix: "min lectura",
    ctaTitle: "¿Quieres ver cómo una corrección podría mover tu puntaje?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — estima tu puntaje en ambos modelos y te dice exactamente qué factores mejorar primero.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Artículos Relacionados",
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
  const url = `${baseUrl}/${locale}/blog/${SLUG}`;

  return {
    title: t.title,
    description: t.subtitle,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/blog/${SLUG}`,
        es: `${baseUrl}/es/blog/${SLUG}`,
        "x-default": `${baseUrl}/en/blog/${SLUG}`,
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

export default async function DisputeArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";
  const url = `${baseUrl}/${locale}/blog/${SLUG}`;
  const currentTag = blogPosts.find((p) => p.slug === SLUG)?.tag;
  const sameTag = blogPosts.filter((p) => p.slug !== SLUG && p.tag === currentTag);
  const otherTag = blogPosts.filter((p) => p.slug !== SLUG && p.tag !== currentTag);
  const related = [...sameTag, ...otherTag].slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.subtitle,
    datePublished: "2026-08-08",
    dateModified: "2026-08-08",
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isEs ? "¿Disputar un error en mi reporte de crédito cuesta dinero?" : "Does disputing a credit report error cost money?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEs
            ? "No. Disputar directamente con Experian, Equifax o TransUnion es gratis y es un derecho garantizado por la Ley de Reporte Justo de Crédito (FCRA)."
            : "No. Disputing directly with Experian, Equifax, or TransUnion is free and is a right guaranteed under the Fair Credit Reporting Act (FCRA).",
        },
      },
      {
        "@type": "Question",
        name: isEs ? "¿Cuánto tiempo tarda una disputa de crédito?" : "How long does a credit dispute take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEs
            ? "Por ley, el buró tiene 30 días para investigar y responder por escrito."
            : "By law, the bureau has 30 days to investigate and respond in writing.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <DetailPageHeader
        backHref={`/${locale}/blog`}
        backLabel="← Blog"
        otherLocaleHref={`/${otherLocale}/blog/${SLUG}`}
        isEs={isEs}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(79,124,255,0.1)] text-[#7ba7ff]">
              Credit Score
            </span>
            <span className="text-[11px] text-[#8892a4]">August 2026 · 6 {t.readSuffix}</span>
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Un Error que Probablemente No Sabes que Tienes</h2>
                <p>Has pagado a tiempo. Tienes tus balances bajo control. Y aun así tu puntaje no lo refleja.</p>
                <p>Aquí hay algo que la mayoría nunca revisa: <strong className="text-[#f0f2f7]">1 de cada 5 reportes de crédito tiene un error</strong> — un balance incorrecto, una cuenta que no es tuya, un pago marcado como tardío cuando no lo fue. Cualquiera de estos puede estarte costando puntos en silencio.</p>
                <p>La buena noticia: corregirlo no cuesta nada, y no necesitas una empresa de reparación de crédito. Toma unos 20 minutos y unos cuantos clics.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Paso 1: Pide tu Reporte Gratis</h2>
                <p>Tienes derecho a un reporte de crédito gratis de cada uno de los tres burós — Experian, Equifax y TransUnion — a través del único sitio autorizado por ley federal para esto: <strong className="text-[#f0f2f7]">AnnualCreditReport.com</strong>.</p>
                <p>Desde 2020, puedes acceder semanalmente en lugar de solo una vez al año. Pide los tres — los errores no siempre aparecen en los tres burós al mismo tiempo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Paso 2: Sabe Exactamente Qué Buscar</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "Cuentas que no reconoces", desc: "El más grave — puede significar robo de identidad. Si ves una tarjeta, préstamo o cobranza que nunca abriste, repórtalo de inmediato.", color: "#f43f5e" },
                    { num: "2", titulo: "Historial de pagos", desc: "Un solo pago marcado como \"30 días tarde\" que en realidad fue puntual puede bajar tu puntaje considerablemente, sobre todo en modelos como FICO 10T.", color: "#f59e0b" },
                    { num: "3", titulo: "Límites de crédito y balances", desc: "Si tu límite aparece más bajo de lo real, tu utilización se ve peor de lo que es — y la utilización es uno de los factores más grandes del puntaje.", color: "#06d6a0" },
                    { num: "4", titulo: "Información personal", desc: "Direcciones o nombres mal escritos suelen ser la primera señal de que tu archivo se mezcló con el de otra persona.", color: "#4f7cff" },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${item.color}20`, color: item.color }}>{item.num}</span>
                      <div>
                        <p className="text-sm font-bold text-[#f0f2f7] mb-1">{item.titulo}</p>
                        <p className="text-sm text-[#8892a4]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Paso 3: Presenta la Disputa — Directo y Gratis</h2>
                <p>Una vez que encuentres algo incorrecto, disputas directo con el buró que lo está reportando. Necesitarás identificar el elemento específico, explicar qué está mal y — si la tienes — adjuntar documentación de apoyo.</p>
                <p>No necesitas un abogado, un servicio de reparación de crédito, ni pagarle a nadie. Este es un derecho garantizado bajo la Ley de Reporte Justo de Crédito (FCRA).</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Paso 4: Qué Pasa Después</h2>
                <p>Por ley, el buró tiene <strong className="text-[#f0f2f7]">30 días</strong> para investigar. Contactarán a la empresa que reportó la información y le pedirán que la verifique.</p>
                <p>Si no pueden verificarla o confirman que está mal, se corrige o se elimina, y tu puntaje puede actualizarse en ese mismo ciclo. Si la confirman como correcta, tienes derecho a agregar una breve declaración de disputa a tu archivo.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Qué Evitar</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Evita cualquier empresa que prometa "borrar" información negativa que sí es correcta — eso no es legal, y usualmente es una estafa.</p>
                <p className="mt-3">También evita pagar por servicios de "reparación de crédito" para que presenten las disputas por ti; estarías pagando por exactamente lo mismo que puedes hacer tú, gratis, en menos tiempo del que toma inscribirte a su servicio.</p>
                <p className="mt-2">Revisar tu reporte no es una solución de una sola vez — es un hábito que vale la pena construir junto con lo básico: pagar a tiempo, mantener la utilización baja y dejar que las cuentas envejezcan.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">An Error You Probably Don&apos;t Know You Have</h2>
                <p>You&apos;ve been paying on time. Your balances are under control. And your score still doesn&apos;t reflect it.</p>
                <p>Here&apos;s something most people never check: <strong className="text-[#f0f2f7]">1 in 5 credit reports contains an error</strong> — a wrong balance, an account that isn&apos;t yours, a payment marked late when it wasn&apos;t. Any one of these can quietly cost you points.</p>
                <p>The good news: fixing it doesn&apos;t cost anything, and it doesn&apos;t take a credit repair company. It takes about 20 minutes and a few clicks.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Step 1: Pull Your Free Report</h2>
                <p>You&apos;re entitled to a free credit report from each of the three bureaus — Experian, Equifax, and TransUnion — through the only site authorized by federal law for this: <strong className="text-[#f0f2f7]">AnnualCreditReport.com</strong>.</p>
                <p>Since 2020, you can access this weekly instead of just once a year. Pull all three — errors don&apos;t always show up on all bureaus at once.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Step 2: Know Exactly What to Look For</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "Accounts you don't recognize", desc: "The most serious one — it can mean identity theft. If you see a card, loan, or collection account you never opened, flag it immediately.", color: "#f43f5e" },
                    { num: "2", titulo: "Payment history", desc: "A single payment marked \"30 days late\" that was actually on time can drop your score significantly, especially on models like FICO 10T.", color: "#f59e0b" },
                    { num: "3", titulo: "Credit limits and balances", desc: "If your limit is reported lower than it actually is, your utilization looks worse than reality — and utilization is one of the biggest score factors.", color: "#06d6a0" },
                    { num: "4", titulo: "Personal information", desc: "Wrong addresses or misspelled names are often the first sign your file has gotten mixed up with someone else's.", color: "#4f7cff" },
                  ].map((item) => (
                    <div key={item.num} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `${item.color}20`, color: item.color }}>{item.num}</span>
                      <div>
                        <p className="text-sm font-bold text-[#f0f2f7] mb-1">{item.titulo}</p>
                        <p className="text-sm text-[#8892a4]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Step 3: File the Dispute — Directly, for Free</h2>
                <p>Once you&apos;ve found something wrong, you dispute it directly with the bureau that&apos;s reporting it. You&apos;ll need to identify the specific item, explain what&apos;s wrong, and — if you have it — attach supporting documentation.</p>
                <p>You don&apos;t need a lawyer, a credit repair service, or to pay anyone. This is a right guaranteed under the Fair Credit Reporting Act (FCRA).</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Step 4: What Happens Next</h2>
                <p>By law, the bureau has <strong className="text-[#f0f2f7]">30 days</strong> to investigate. They&apos;ll contact the company that reported the information and ask them to verify it.</p>
                <p>If it can&apos;t be verified or is confirmed wrong, it gets corrected or removed, and your score can update within that same cycle. If it&apos;s confirmed accurate, you have the right to add a short statement of dispute to your file.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What to Avoid</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Skip any company that promises to &quot;erase&quot; accurate negative information — that&apos;s not legal, and it&apos;s usually a scam.</p>
                <p className="mt-3">Also skip paying for &quot;credit repair&quot; services to file disputes for you; you&apos;re doing the exact same thing they would, for free, in less time than it takes to sign up for their service.</p>
                <p className="mt-2">Checking your report isn&apos;t a one-time fix — it&apos;s a habit worth building alongside the basics: paying on time, keeping utilization low, and letting accounts age.</p>
              </section>
            </>
          )}

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">
            {t.ctaTitle}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {t.ctaDesc}
          </p>
          <a href={`/${locale}/tools`} className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {t.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-wide text-[#8892a4] mb-4">
            {t.relatedTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((post) => (
              <a
                key={post.slug}
                href={`/${locale}/blog/${post.slug}`}
                className="block bg-[#0d1220] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span className="text-[10px] font-medium uppercase tracking-[1px] text-[#7ba7ff]">{post.tag}</span>
                <h4 className="text-sm font-bold text-[#f0f2f7] mt-1.5 leading-snug group-hover:text-[#4f7cff] transition-colors">
                  {isEs ? post.titleEs : post.titleEn}
                </h4>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl">
          <p className="text-[11px] text-[#8892a4] leading-relaxed">
            ⚠️ {t.disclaimerText}
          </p>
        </div>

      </article>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">© 2026 ScoreMotive</span>
          <div className="flex gap-6">
            <a href={`/${locale}/blog`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Blog</a>
            <a href={`/${locale}/glossary`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{isEs ? "Glosario" : "Glossary"}</a>
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.toolsLabel}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
