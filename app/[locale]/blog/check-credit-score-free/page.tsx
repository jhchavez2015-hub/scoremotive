import type { Metadata } from "next";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD, OG_IMAGES, TWITTER_IMAGES } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";
import DetailPageHeader from "@/components/DetailPageHeader";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

type Locale = "en" | "es";

const SLUG = "check-credit-score-free";
const PINNED_RELATED_SLUG = "raise-credit-score-100-points";

const affiliateClass = "text-[#06d6a0] underline hover:text-[#4f7cff] transition-colors";
const linkClass = "text-[#7ba7ff] underline hover:text-[#4f7cff] transition-colors";

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
  faqTitle: string;
  faqs: { question: string; answer: string }[];
}> = {
  en: {
    title: "How to Check Your Credit Score for Free (Without Hurting It)",
    subtitle: "Checking your own credit is free and won't lower your score. See where to get your score and reports at no cost, and when paid monitoring is worth it.",
    readSuffix: "min read",
    ctaTitle: "Want to see where your score stands right now?",
    ctaDesc: "Use our free Dual Score Estimator — it estimates your score on both models and tells you exactly which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "This article is for educational purposes only and is not financial or legal advice. Scores, features and offers change; confirm details with each provider.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        question: "Does checking my credit score lower it?",
        answer: "No. Checking your own score or report is a soft inquiry and does not affect your score.",
      },
      {
        question: "Is there really a free credit score?",
        answer: "Yes. Several services offer a free VantageScore, and some banks show a free score in their apps.",
      },
      {
        question: "How often can I get my free credit reports?",
        answer: "Weekly, from each of the three bureaus, at AnnualCreditReport.com.",
      },
      {
        question: "Why is my score different on each site?",
        answer: "Different scoring models and different bureau data. A small difference is normal.",
      },
      {
        question: "Do I need to pay to see my credit score?",
        answer: "No. Paid services add features such as three-bureau monitoring, but you don't have to pay to see your score.",
      },
    ],
  },
  es: {
    title: "Cómo ver tu puntaje de crédito gratis y sin afectarlo",
    subtitle: "Ver tu propio crédito es gratis y no baja tu puntaje. Descubre dónde ver tu puntaje y tus reportes sin costo, y cuándo conviene pagar por monitoreo.",
    readSuffix: "min lectura",
    ctaTitle: "¿Quieres ver cómo está tu puntaje ahora mismo?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — estima tu puntaje en ambos modelos y te dice exactamente qué factores mejorar primero.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "Este artículo es solo educativo y no constituye asesoría financiera ni legal. Los puntajes, funciones y ofertas cambian; confirma los detalles con cada proveedor.",
    toolsLabel: "Herramientas",
    relatedTitle: "Artículos Relacionados",
    faqTitle: "Preguntas Frecuentes",
    faqs: [
      {
        question: "¿Ver mi puntaje de crédito lo baja?",
        answer: "No. Consultar tu propio puntaje o reporte es una consulta suave y no afecta tu puntaje.",
      },
      {
        question: "¿De verdad existe un puntaje gratis?",
        answer: "Sí. Varios servicios ofrecen un VantageScore gratis, y algunos bancos muestran un puntaje gratis en sus apps.",
      },
      {
        question: "¿Con qué frecuencia puedo pedir mis reportes gratis?",
        answer: "Cada semana, de cada uno de los tres burós, en AnnualCreditReport.com.",
      },
      {
        question: "¿Por qué mi puntaje es distinto en cada sitio?",
        answer: "Por modelos de puntaje distintos y datos de buró distintos. Una diferencia pequeña es normal.",
      },
      {
        question: "¿Tengo que pagar para ver mi puntaje?",
        answer: "No. Los servicios de pago añaden funciones como el monitoreo de los tres burós, pero no tienes que pagar para ver tu puntaje.",
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
      images: OG_IMAGES,
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.subtitle,
      images: TWITTER_IMAGES,
    },
  };
}

export default async function CheckCreditScoreFreePage({
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
  const pinned = blogPosts.filter((p) => p.slug === PINNED_RELATED_SLUG);
  const rest = blogPosts.filter((p) => p.slug !== SLUG && p.slug !== PINNED_RELATED_SLUG);
  const sameTag = rest.filter((p) => p.tag === currentTag);
  const otherTag = rest.filter((p) => p.tag !== currentTag);
  const related = [...pinned, ...sameTag, ...otherTag].slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.subtitle,
    datePublished: "2026-10-23",
    dateModified: "2026-10-23",
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
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
            <span className="text-[11px] text-[#8892a4]">October 2026 · 5 {t.readSuffix}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {t.subtitle}
          </p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <AffiliateDisclosure locale={isEs ? "es" : "en"} variant="multi" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">

          {isEs ? (
            <>
              <section className="rounded-xl p-5" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Respuesta rápida</p>
                <p className="text-sm text-[#c8d0dc]">Puedes ver tu puntaje y tus reportes de crédito gratis, y hacerlo nunca baja tu puntaje. Usa AnnualCreditReport.com para tus reportes de los tres burós, y una herramienta gratuita como WalletHub para ver tu puntaje.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Ver Mi Propio Puntaje lo Afecta?</h2>
                <p>No. Cuando consultas tu propio puntaje o reporte, se registra como una <strong className="text-[#f0f2f7]">consulta suave</strong> (soft inquiry). Solo tú la ves y no afecta tu puntaje.</p>
                <p className="mt-3">Una <strong className="text-[#f0f2f7]">consulta dura</strong> (<a href={`/${locale}/glossary/hard-inquiry`} className={linkClass}>hard inquiry</a>) ocurre cuando un prestamista revisa tu crédito porque solicitaste un préstamo o tarjeta. Esas sí pueden bajar tu puntaje un poco. Mirar tu propio crédito nunca es una de ellas.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Tu Puntaje y tu Reporte No Son lo Mismo</h2>
                <ul className="space-y-2 my-3">
                  <li><strong className="text-[#f0f2f7]">Reporte de crédito:</strong> el historial detallado de tus cuentas, saldos, pagos y consultas, que guarda cada buró (Equifax, Experian, TransUnion).</li>
                  <li><strong className="text-[#f0f2f7]">Puntaje de crédito:</strong> un número calculado a partir de ese reporte.</li>
                </ul>
                <p>Necesitas ambos. El reporte te muestra <em>por qué</em> tu puntaje es el que es, y ahí es donde se esconden los errores.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Formas Gratis de Verlo</h2>

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">1. <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className={linkClass}>AnnualCreditReport.com</a> (tus reportes)</h3>
                <p>Es el único sitio autorizado por la ley federal para darte reportes de crédito gratis. Los tres burós ahora ofrecen reportes gratis cada semana, y el programa es permanente. Ojo: son reportes, no puntajes. Cuidado con sitios parecidos que cobran.</p>

                <AffiliateDisclosure locale="es" variant="reminder" />

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">2. <AffiliateLink slug="puntaje-gratis" className={affiliateClass}>WalletHub</AffiliateLink> (tu puntaje)</h3>
                <p>WalletHub ofrece gratis un puntaje VantageScore 3.0 basado en tu reporte de TransUnion, además de reportes de crédito y monitoreo de crédito gratuitos. Revisa en el sitio de WalletHub qué incluye hoy el plan gratuito. Es una buena manera de seguir tu progreso sin pagar.</p>

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">3. La app de tu banco o tarjeta</h3>
                <p>Muchos emisores muestran un puntaje gratis en su app. Revisa qué modelo usan, porque unos muestran VantageScore y otros FICO.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Por Qué tu Puntaje Gratis Puede No Coincidir con el de tu Prestamista</h2>
                <p>Existen muchos modelos de puntaje. La mayoría de las herramientas gratis muestran VantageScore. Muchos prestamistas usan FICO, y los hipotecarios han usado tradicionalmente versiones específicas de FICO. Tus números pueden diferir unos puntos, o más, según el modelo y el buró.</p>
                <p className="mt-3">Piensa en un puntaje gratis como una <em>dirección</em> confiable: ¿sube o baja, y por qué? No es el número exacto que verá un prestamista. Nuestro artículo sobre <a href={`/${locale}/blog/fico-8-vs-fico-10t`} className={linkClass}>FICO 8 vs FICO 10T</a> explica por qué importa el modelo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Cuándo Vale la Pena Pagar por Monitoreo?</h2>
                <p>La mayoría de las personas no lo necesita solo para ver su puntaje. Un servicio de pago tiene sentido si quieres puntajes y reportes de <strong className="text-[#f0f2f7]">los tres burós en un solo lugar</strong>, alertas continuas o protección adicional contra robo de identidad.</p>

                <AffiliateDisclosure locale="es" variant="reminder" />

                <p>Una opción de pago que puedes comparar es <AffiliateLink slug="monitoreo-3-buros" className={affiliateClass}>SmartCredit</AffiliateLink>. Con cualquier servicio de pago, lee los términos antes de ingresar una tarjeta, revisa el precio actual y anota la fecha en que una prueba se renovaría para cancelar a tiempo si no quieres continuar.</p>
                <p className="mt-3">Si lo que buscas es sobre todo protección de identidad, <AffiliateLink slug="identidad-premium" className={affiliateClass}>WalletHub Premium</AffiliateLink> es una opción de pago que añade seguro contra robo de identidad, monitoreo de la dark web y un bloqueo de crédito de TransUnion. Las condiciones de cobertura, las funciones y el precio pueden cambiar, así que revisa los detalles actuales y las condiciones de renovación antes de decidir.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Qué Hacer Después de Ver tu Puntaje</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong className="text-[#f0f2f7]">Lee tus reportes en busca de errores.</strong> Saldos incorrectos, cuentas que no son tuyas o pagos tardíos reportados por error pueden bajar tu puntaje. Puedes <a href={`/${locale}/blog/how-to-dispute-credit-report-errors`} className={linkClass}>disputar errores gratis</a>.</li>
                  <li><strong className="text-[#f0f2f7]">Mira tu <a href={`/${locale}/glossary/credit-utilization`} className={linkClass}>utilización</a>.</strong> Usar un porcentaje alto de tus límites es de lo más rápido de mejorar.</li>
                  <li><strong className="text-[#f0f2f7]">Revisa tus pagos a tiempo.</strong> El historial de pagos pesa más que todo lo demás.</li>
                  <li><strong className="text-[#f0f2f7]">Estima tu próximo paso</strong> con nuestro <a href={`/${locale}/tools`} className={linkClass}>Dual Score Estimator</a> gratis.</li>
                </ol>
              </section>
            </>
          ) : (
            <>
              <section className="rounded-xl p-5" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Quick Answer</p>
                <p className="text-sm text-[#c8d0dc]">You can see your credit score and your credit reports for free, and doing it never lowers your score. Use AnnualCreditReport.com for your reports from all three bureaus, and a free tool like WalletHub to see your score.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Does Checking Your Own Credit Score Hurt It?</h2>
                <p>No. When you check your own score or report, it is recorded as a <strong className="text-[#f0f2f7]">soft inquiry</strong>. Soft inquiries are visible only to you and have no effect on your score.</p>
                <p className="mt-3">A <strong className="text-[#f0f2f7]"><a href={`/${locale}/glossary/hard-inquiry`} className={linkClass}>hard inquiry</a></strong> happens when a lender checks your credit because you applied for a loan or card. Those can lower your score slightly and stay on your report. Looking at your own credit is never one of them.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Your Score and Your Report Are Not the Same Thing</h2>
                <ul className="space-y-2 my-3">
                  <li><strong className="text-[#f0f2f7]">Credit report:</strong> the detailed history of your accounts, balances, payments and inquiries, kept by each bureau (Equifax, Experian, TransUnion).</li>
                  <li><strong className="text-[#f0f2f7]">Credit score:</strong> a number calculated from that report.</li>
                </ul>
                <p>You need both. The report shows <em>why</em> your score is what it is, and it is where errors hide.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Free Ways to Check</h2>

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">1. <a href="https://www.annualcreditreport.com" target="_blank" rel="noopener noreferrer" className={linkClass}>AnnualCreditReport.com</a> (your reports)</h3>
                <p>This is the only site authorized by federal law to give you free credit reports. The three bureaus now offer free weekly reports, and this program is permanent. Important: these are reports, not scores. Be careful with look-alike sites that charge you.</p>

                <AffiliateDisclosure locale="en" variant="reminder" />

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">2. <AffiliateLink slug="puntaje-gratis" className={affiliateClass}>WalletHub</AffiliateLink> (your score)</h3>
                <p>WalletHub offers a free VantageScore 3.0 score based on your TransUnion credit report, plus free credit reports and credit monitoring. Check what the free plan currently includes on WalletHub&apos;s site. It is a good way to watch your progress without paying.</p>

                <h3 className="text-sm font-bold text-[#f0f2f7] mt-4 mb-1">3. Your bank or credit card app</h3>
                <p>Many issuers show a free score inside their app. Check which scoring model they use, because some show VantageScore and others show FICO.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Why Your Free Score May Not Match Your Lender&apos;s</h2>
                <p>There are many scoring models. Most free tools show VantageScore. Many lenders use FICO, and mortgage lenders have traditionally used specific FICO versions. Your numbers can differ by a few points, or more, depending on the model and the bureau.</p>
                <p className="mt-3">Treat a free score as a reliable <em>direction</em>: is it going up or down, and why. It is not the exact number a lender will see. Our article on <a href={`/${locale}/blog/fico-8-vs-fico-10t`} className={linkClass}>FICO 8 vs FICO 10T</a> explains why the model matters.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">When Is Paid Monitoring Worth It?</h2>
                <p>Most people don&apos;t need it just to see their score. Paid services make sense if you want scores and reports from <strong className="text-[#f0f2f7]">all three bureaus in one place</strong>, ongoing alerts, or extra identity protection.</p>

                <AffiliateDisclosure locale="en" variant="reminder" />

                <p>One paid option you can compare is <AffiliateLink slug="monitoreo-3-buros" className={affiliateClass}>SmartCredit</AffiliateLink>. With any paid service, read the terms before entering a card, check the current price, and note the date any trial would renew so you can cancel on time if you don&apos;t want to continue.</p>
                <p className="mt-3">If identity protection is your main goal, <AffiliateLink slug="identidad-premium" className={affiliateClass}>WalletHub Premium</AffiliateLink> is a paid option that adds identity theft insurance, dark web monitoring and a TransUnion credit lock. Coverage terms, features and price can change, so review the current details and renewal terms before you decide.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What to Do After You See Your Score</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong className="text-[#f0f2f7]">Read your reports for errors.</strong> Wrong balances, accounts that aren&apos;t yours, or late payments reported by mistake can hurt your score. You can <a href={`/${locale}/blog/how-to-dispute-credit-report-errors`} className={linkClass}>dispute errors for free</a>.</li>
                  <li><strong className="text-[#f0f2f7]">Look at your <a href={`/${locale}/glossary/credit-utilization`} className={linkClass}>utilization</a>.</strong> Using a high share of your credit limits is one of the quickest things to improve.</li>
                  <li><strong className="text-[#f0f2f7]">Check for on-time payments.</strong> Payment history carries the most weight.</li>
                  <li><strong className="text-[#f0f2f7]">Estimate your next move</strong> with our free <a href={`/${locale}/tools`} className={linkClass}>Dual Score Estimator</a>.</li>
                </ol>
              </section>
            </>
          )}

        </div>

        {/* FAQ (visible, mirrors the FAQPage JSON-LD) */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">{t.faqTitle}</h2>
          <div className="space-y-3">
            {t.faqs.map((f) => (
              <div key={f.question} className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#f0f2f7] mb-1.5">{f.question}</h3>
                <p className="text-sm text-[#8892a4] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

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
