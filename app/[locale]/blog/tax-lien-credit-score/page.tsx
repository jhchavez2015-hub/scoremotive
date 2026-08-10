import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";

type Locale = "en" | "es";

const SLUG = "tax-lien-credit-score";

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
    title: "Do Tax Liens Still Affect Your Credit Score? What Changed in 2018",
    subtitle: "Millions of people still believe a tax lien can tank their credit score. Here's what actually changed — and why a lien can still block you even if your score never moves.",
    readSuffix: "min read",
    ctaTitle: "Owe back taxes and other debt at the same time?",
    ctaDesc: "Use our free Debt Accelerator to build a payoff plan that prioritizes what actually protects your credit and your finances first.",
    ctaBtn: "Build My Payoff Plan Free",
    disclaimerText: "ScoreMotive is an educational tool, not a tax or legal advisor. Tax lien resolution depends on your specific situation — consult a tax attorney, CPA, or enrolled agent before taking action with the IRS.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
  },
  es: {
    title: "¿Los Tax Liens Todavía Afectan tu Puntaje de Crédito? Qué Cambió en 2018",
    subtitle: "Millones de personas todavía creen que un tax lien puede hundir su puntaje de crédito. Esto es lo que realmente cambió — y por qué un lien te puede seguir bloqueando aunque tu puntaje nunca se mueva.",
    readSuffix: "min lectura",
    ctaTitle: "¿Debes impuestos atrasados y otras deudas al mismo tiempo?",
    ctaDesc: "Usa nuestro Acelerador de Deudas gratuito para armar un plan de pago que priorice lo que realmente protege tu crédito y tus finanzas primero.",
    ctaBtn: "Armar mi Plan de Pago Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa, no un asesor fiscal o legal. La resolución de un tax lien depende de tu situación específica — consulta a un abogado fiscal, CPA o enrolled agent antes de tomar acción con el IRS.",
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

export default async function TaxLienArticlePage({
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
    datePublished: "2026-08-10",
    dateModified: "2026-08-10",
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
        name: isEs ? "¿Un tax lien todavía baja mi puntaje de crédito?" : "Does a tax lien still lower my credit score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEs
            ? "No directamente. Desde abril de 2018, las tres agencias de crédito (Experian, Equifax y TransUnion) dejaron de incluir tax liens en los reportes de crédito de consumidores, como parte del National Consumer Assistance Plan (NCAP)."
            : "Not directly. Since April 2018, all three credit bureaus (Experian, Equifax, and TransUnion) stopped including tax liens on consumer credit reports, as part of the National Consumer Assistance Plan (NCAP).",
        },
      },
      {
        "@type": "Question",
        name: isEs ? "¿Cuál es la diferencia entre un 'release' y un 'withdrawal' de un tax lien?" : "What's the difference between a lien release and a lien withdrawal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isEs
            ? "Un 'release' se emite automáticamente unos 30 días después de pagar la deuda, pero el registro público sigue existiendo, marcado como pagado. Un 'withdrawal' borra el registro público como si nunca se hubiera presentado — pero hay que solicitarlo activamente con el Form 12277 del IRS."
            : "A release is issued automatically about 30 days after you pay the debt, but the public record still exists, marked as satisfied. A withdrawal erases the public filing as if it never happened — but you have to actively request it using IRS Form 12277.",
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
      <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href={`/${locale}/blog`} className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors">
            ← Blog
          </a>
          <Link href={`/${otherLocale}/blog/${SLUG}`} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300">
            🌐 {isEs ? "EN" : "ES"}
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(79,124,255,0.1)] text-[#7ba7ff]">
              Credit Score
            </span>
            <span className="text-[11px] text-[#8892a4]">August 2026 · 7 {t.readSuffix}</span>
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Mito que Todavía Asusta a la Gente</h2>
                <p>Si le debes al IRS o a tu estado, es probable que hayas escuchado que un tax lien puede hundir tu puntaje de crédito 100 puntos o más. Esa creencia era cierta — hace más de siete años.</p>
                <p>Hoy, un tax lien <strong className="text-[#f0f2f7]">ya no aparece en tu reporte de crédito</strong>, y por lo tanto no toca tu puntaje directamente. Pero eso no significa que sea inofensivo — solo significa que el daño ahora ocurre por una vía distinta, y mucha gente no lo sabe hasta que le rechazan una hipoteca.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Qué Cambió Realmente en 2018</h2>
                <p>En abril de 2018, las tres agencias de crédito — Experian, Equifax y TransUnion — eliminaron todos los tax liens de los reportes de crédito de consumidores: pagados, sin pagar, federales y estatales. Fue parte del <strong className="text-[#f0f2f7]">National Consumer Assistance Plan (NCAP)</strong>, después de que el Consumer Financial Protection Bureau (CFPB) encontrara que estos registros frecuentemente se vinculaban a la persona equivocada.</p>
                <p>El resultado: millones de personas vieron subir su puntaje de la noche a la mañana, simplemente porque un registro antiguo desapareció — sin haber pagado nada.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Efecto que Sí Es Real</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "Sigue siendo registro público", desc: "El lien no desaparece — sigue archivado en tu condado o secretaría estatal. Prestamistas y otros pueden encontrarlo por fuera de tu reporte de crédito.", color: "#f43f5e" },
                    { num: "2", titulo: "Los prestamistas hipotecarios lo verifican aparte", desc: "Al pedir una hipoteca o refinanciar, es común que el prestamista haga una búsqueda de registros públicos independiente del reporte de crédito — ahí es donde el lien sí puede bloquearte.", color: "#f59e0b" },
                    { num: "3", titulo: "No puedes vender ni refinanciar la propiedad afectada", desc: "Si el lien está sobre una propiedad específica, esa propiedad queda atada hasta que se pague y se libere el lien.", color: "#06d6a0" },
                    { num: "4", titulo: "El IRS conserva su derecho legal sobre tus bienes", desc: "Mientras el lien exista, el gobierno mantiene una reclamación legal sobre tu propiedad, ingresos y otros activos.", color: "#4f7cff" },
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Release vs. Withdrawal: La Diferencia que Importa</h2>
                <p>Cuando pagas la deuda, el IRS emite automáticamente un <strong className="text-[#f0f2f7]">"release"</strong> unos 30 días después — pero el registro público sigue existiendo, solo que marcado como "satisfecho". Sigue siendo visible si alguien busca.</p>
                <p>Un <strong className="text-[#f0f2f7]">"withdrawal"</strong> es distinto: borra el registro público por completo, como si el lien nunca se hubiera presentado. Pero no es automático — tienes que solicitarlo activamente con el <strong className="text-[#f0f2f7]">Form 12277 del IRS</strong>.</p>
                <p>Bajo el Fresh Start Initiative del IRS, puedes calificar para un withdrawal si tu saldo es de $25,000 o menos, lo estás pagando por Direct Debit Installment Agreement, y llevas al menos tres pagos consecutivos a tiempo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo Saber si Tienes un Tax Lien Activo</h2>
                <p>Como ya no aparece en tu reporte de crédito, tu reporte no te va a avisar. Si crees que puedes tener uno, revisa directamente con el IRS (si es federal) o con la agencia de impuestos de tu estado. También puedes verificar registros públicos de tu condado, donde el lien se archiva.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Qué Hacer si Tienes un Tax Lien</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Pagar la deuda completa es el camino más directo — el "release" llega automáticamente, y de ahí puedes solicitar el "withdrawal" si calificas.</p>
                <p className="mt-3">Si no puedes pagar de una vez, un Installment Agreement con el IRS puede ponerte en camino hacia un withdrawal sin liquidar todo el saldo de inmediato.</p>
                <p className="mt-2">Esto no es territorio para resolver solo con lectura general — cada situación fiscal es distinta, y un abogado fiscal, CPA o enrolled agent puede confirmar qué opción aplica a tu caso.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Myth That Still Scares People</h2>
                <p>If you owe the IRS or your state, you&apos;ve probably heard that a tax lien can tank your credit score by 100 points or more. That was true — over seven years ago.</p>
                <p>Today, a tax lien <strong className="text-[#f0f2f7]">no longer appears on your credit report</strong>, so it doesn&apos;t touch your score directly. But that doesn&apos;t mean it&apos;s harmless — it just means the damage now happens through a different channel, and most people don&apos;t find out until a mortgage gets denied.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Actually Changed in 2018</h2>
                <p>In April 2018, the three credit bureaus — Experian, Equifax, and TransUnion — removed all tax liens from consumer credit reports: paid, unpaid, federal, and state. It was part of the <strong className="text-[#f0f2f7]">National Consumer Assistance Plan (NCAP)</strong>, after the Consumer Financial Protection Bureau (CFPB) found these records were frequently matched to the wrong person.</p>
                <p>The result: millions of people saw their scores jump overnight, simply because an old record disappeared — without paying anything.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Effect That&apos;s Actually Real</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "It's still a public record", desc: "The lien doesn't disappear — it's still filed with your county or secretary of state. Lenders and others can find it outside your credit report.", color: "#f43f5e" },
                    { num: "2", titulo: "Mortgage lenders check it separately", desc: "When applying for a mortgage or refinancing, lenders commonly run an independent public records search separate from your credit report — that's where the lien can still block you.", color: "#f59e0b" },
                    { num: "3", titulo: "You can't sell or refinance the affected property", desc: "If the lien is on a specific property, that property stays tied up until the lien is paid and released.", color: "#06d6a0" },
                    { num: "4", titulo: "The IRS keeps its legal claim on your assets", desc: "As long as the lien exists, the government maintains a legal claim on your property, income, and other assets.", color: "#4f7cff" },
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Release vs. Withdrawal: The Difference That Matters</h2>
                <p>When you pay the debt, the IRS automatically issues a <strong className="text-[#f0f2f7]">"release"</strong> about 30 days later — but the public record still exists, just marked as satisfied. It&apos;s still visible if someone looks.</p>
                <p>A <strong className="text-[#f0f2f7]">"withdrawal"</strong> is different: it erases the public filing entirely, as if the lien had never been filed. But it&apos;s not automatic — you have to actively request it using <strong className="text-[#f0f2f7]">IRS Form 12277</strong>.</p>
                <p>Under the IRS Fresh Start Initiative, you may qualify for a withdrawal if your balance is $25,000 or less, you&apos;re paying it through a Direct Debit Installment Agreement, and you&apos;ve made at least three consecutive on-time payments.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How to Know If You Have an Active Tax Lien</h2>
                <p>Since it no longer shows on your credit report, your report won&apos;t tell you. If you think you might have one, check directly with the IRS (for federal liens) or your state tax agency. You can also check your county&apos;s public records, where the lien is filed.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What to Do If You Have a Tax Lien</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Paying the debt in full is the most direct path — the release comes automatically, and from there you can request a withdrawal if you qualify.</p>
                <p className="mt-3">If you can&apos;t pay it all at once, an IRS Installment Agreement can put you on a path toward a withdrawal without settling the full balance right away.</p>
                <p className="mt-2">This isn&apos;t territory to figure out from general reading alone — every tax situation is different, and a tax attorney, CPA, or enrolled agent can confirm which option applies to your case.</p>
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
