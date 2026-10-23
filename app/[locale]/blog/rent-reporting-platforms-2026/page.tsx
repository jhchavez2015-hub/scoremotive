import type { Metadata } from "next";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD, OG_IMAGES, TWITTER_IMAGES } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";
import DetailPageHeader from "@/components/DetailPageHeader";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";
import AffiliateLink from "@/components/AffiliateLink";

type Locale = "en" | "es";

const SLUG = "rent-reporting-platforms-2026";

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
  reviewedNote: string;
}> = {
  en: {
    title: "10 Rent Reporting Platforms Compared (2026)",
    subtitle: "A side-by-side look at what each platform says it reports. Check each provider's site for current prices and details.",
    readSuffix: "min read",
    ctaTitle: "Want to know how much your score can improve?",
    ctaDesc: "Use our free Dual Score Estimator — it shows your estimated score in FICO 8 and FICO 10T and which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. This article contains affiliate links. Platform prices and features may change. Always verify information directly with each service before signing up. Consult a CFP before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
    reviewedNote: "Last updated: October 23, 2026. Prices and features change; confirm details with each provider.",
  },
  es: {
    title: "10 plataformas de reporte de renta comparadas (2026)",
    subtitle: "Una comparación lado a lado de lo que cada plataforma dice reportar. Consulta el sitio de cada proveedor para ver precios y detalles actuales.",
    readSuffix: "min lectura",
    ctaTitle: "¿Quieres saber cuánto puede subir tu puntaje?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — te muestra tu puntaje estimado en FICO 8 y FICO 10T y qué factores mejorar primero.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Este artículo contiene enlaces de afiliado. Los precios y características de las plataformas pueden cambiar. Verifica siempre la información directamente con cada servicio antes de registrarte. Consulta a un CFP antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Artículos Relacionados",
    reviewedNote: "Última actualización: 23 de octubre de 2026. Los precios y las funciones cambian; confirma los detalles con cada proveedor.",
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

export default async function PlatformsArticlePage({
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
    datePublished: "2026-06-16",
    dateModified: "2026-10-23",
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const platforms = [
    {
      name: "Experian Boost",
      burós: "Experian",
      renta: true,
      servicios: true,
      precio: isEs ? "Gratis" : "Free",
      afiliado: true,
      destacado: isEs ? "Opción gratuita para servicios" : "Free option for utility bills",
      color: "#4f7cff",
      bg: "rgba(79,124,255,0.05)",
      border: "rgba(79,124,255,0.15)",
      descEs: "Conecta tu cuenta bancaria y Experian detecta automáticamente tus pagos de luz, agua, teléfono y servicios de streaming. Solo afecta tu reporte de Experian, pero es completamente gratis.",
      descEn: "Connect your bank account and Experian automatically detects your utility, water, phone, and streaming payments. Only affects your Experian report, but it's completely free.",
      proEs: ["Completamente gratis", "Sin necesidad de que el arrendador participe", "Reporta historial de hasta 2 años gratis"],
      proEn: ["Completely free", "No landlord participation required", "Reports up to 2 years of history free"],
      contraEs: ["Solo reporta a Experian — no a Equifax ni TransUnion"],
      contraEn: ["Only reports to Experian — not Equifax or TransUnion"],
    },
    {
      name: "Self",
      burós: isEs ? "3 burós (renta)" : "3 bureaus (rent)",
      renta: true,
      servicios: true,
      precio: isEs ? "Gratis (renta) / $6.95/mes (servicios)" : "Free (rent) / $6.95/mo (utilities)",
      afiliado: true,
      destacado: isEs ? "Renta + servicios + tarjeta asegurada" : "Rent + utilities + secured card",
      color: "#06d6a0",
      bg: "rgba(6,214,160,0.05)",
      border: "rgba(6,214,160,0.15)",
      descEs: "Self reporta renta a los tres burós de forma gratuita. Por $6.95 al mes también reporta servicios y teléfono a TransUnion. Además ofrece cuentas de construcción de crédito y una tarjeta asegurada.",
      descEn: "Self reports rent to all three bureaus for free. For $6.95/month it also reports utilities and phone to TransUnion. It also offers credit builder accounts and a secured card.",
      proEs: ["Renta gratis a los 3 burós"],
      proEn: ["Free rent reporting to all 3 bureaus"],
      contraEs: ["Servicios solo reportan a TransUnion (plan de pago)", "No tiene herramientas de análisis de crédito personalizadas"],
      contraEn: ["Utilities only report to TransUnion (paid plan)", "No personalized credit analysis tools"],
    },
    {
      name: "Kikoff",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "Consulta el precio actual en su sitio" : "Check current pricing on their site",
      afiliado: true,
      destacado: isEs ? "Renta + línea de crédito" : "Rent + credit line",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.05)",
      border: "rgba(124,58,237,0.15)",
      descEs: "Kikoff combina reporte de renta con una línea de crédito sin interés, lo que te da dos fuentes de historial positivo al mismo tiempo.",
      descEn: "Kikoff combines rent reporting with a no-interest credit line, giving you two sources of positive history at the same time.",
      proEs: ["Dos fuentes de crédito en una plataforma"],
      proEn: ["Two credit sources on one platform"],
      contraEs: ["Consulta en su sitio qué burós y qué plan incluyen el reporte de renta"],
      contraEn: ["Check their site for which bureaus and which plan include rent reporting"],
    },
    {
      name: "Boom",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "Consulta el precio actual en su sitio" : "Check current pricing on their site",
      afiliado: true,
      destacado: isEs ? "Reporte de renta, con opción de pagos pasados" : "Rent reporting, with an option for past payments",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.05)",
      border: "rgba(245,158,11,0.15)",
      descEs: "Boom reporta tus pagos de renta y permite incluir pagos pasados. Consulta el precio actual en su sitio. No requiere que tu arrendador participe.",
      descEn: "Boom reports your rent payments and lets you include past payments. Check current pricing on their site. No landlord participation required.",
      proEs: ["Permite reportar pagos pasados", "No requiere participación del arrendador"],
      proEn: ["Lets you report past payments", "No landlord participation required"],
      contraEs: [],
      contraEn: [],
    },
    {
      name: "RentReporters",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "Consulta el precio actual en su sitio" : "Check current pricing on their site",
      afiliado: true,
      destacado: isEs ? "Incluye pagos pasados" : "Includes past payments",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.05)",
      border: "rgba(244,63,94,0.15)",
      descEs: "RentReporters permite incluir pagos pasados. Consulta en su sitio el precio actual y qué burós reciben tus datos.",
      descEn: "RentReporters allows past payments to be included. Check their site for current pricing and which bureaus receive your data.",
      proEs: ["Incluye historial pasado en el plan"],
      proEn: ["Past history included in plan"],
      contraEs: [],
      contraEn: [],
    },
    {
      name: "Piñata",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "Consulta el precio actual en su sitio" : "Check current pricing on their site",
      afiliado: false,
      destacado: isEs ? "Recompensas por pagar a tiempo" : "Rewards for on-time payments",
      color: "#06d6a0",
      bg: "rgba(6,214,160,0.05)",
      border: "rgba(6,214,160,0.15)",
      descEs: "Piñata agrega una capa de gamificación al reporte de renta: acumulas puntos por cada pago puntual y los canjas por tarjetas de regalo o productos de construcción de crédito.",
      descEn: "Piñata adds a gamification layer to rent reporting: you earn points for every on-time payment and redeem them for gift cards or credit-building products.",
      proEs: ["Sistema de recompensas por pagar a tiempo", "Educación financiera incluida"],
      proEn: ["Rewards system for on-time payments", "Financial education included"],
      contraEs: [],
      contraEn: [],
    },
    {
      name: "WalletHub",
      slug: "reporte-renta-servicios",
      burós: "TransUnion + Experian",
      renta: true,
      servicios: true,
      precio: isEs ? "Cuenta gratuita; Credit Builder en planes Plus y Premium" : "Free account; Credit Builder on Plus and Premium plans",
      afiliado: true,
      destacado: isEs ? "Premium agrega protección de identidad" : "Premium adds identity protection",
      color: "#4f7cff",
      bg: "rgba(79,124,255,0.05)",
      border: "rgba(79,124,255,0.15)",
      descEs: "El reporte de renta y servicios de WalletHub es parte de Credit Builder, disponible para miembros de WalletHub Plus y Premium. Reporta pagos de renta elegibles a TransUnion y Experian, y pagos de servicios elegibles (teléfono, luz, gas y agua) a TransUnion. No todos los pagos son elegibles. La cuenta gratuita incluye tu puntaje VantageScore 3.0 y reportes de crédito. El plan Premium de pago agrega bloqueo de crédito de TransUnion, seguro contra robo de identidad y monitoreo de la dark web.",
      descEn: "WalletHub's rent and utility reporting is part of Credit Builder, available to WalletHub Plus and Premium members. It reports eligible rent payments to TransUnion and Experian, and eligible bill payments (phone, electric, gas and water) to TransUnion. Not all payments are eligible. The free account includes your VantageScore 3.0 and credit reports. The paid Premium plan adds a TransUnion credit lock, identity theft insurance and dark web monitoring.",
      proEs: ["Reporta renta elegible a TransUnion y Experian", "Reporta servicios elegibles a TransUnion", "La cuenta gratuita incluye puntaje VantageScore 3.0 y reportes de crédito", "El plan Premium de pago agrega protección de identidad"],
      proEn: ["Reports eligible rent to TransUnion and Experian", "Reports eligible bills to TransUnion", "Free account includes VantageScore 3.0 and credit reports", "The paid Premium plan adds identity protection"],
      contraEs: ["Reportar renta y servicios requiere ser miembro Plus o Premium", "No todos los pagos son elegibles", "Requiere sincronizar una cuenta bancaria"],
      contraEn: ["Reporting rent and bills requires a Plus or Premium membership", "Not all payments are eligible", "Requires syncing a bank account"],
    },
    {
      name: "LevelCredit",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "De pago" : "Paid",
      afiliado: false,
      destacado: isEs ? "Consulta precio y condiciones en su sitio" : "Check price and terms on their site",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.05)",
      border: "rgba(124,58,237,0.15)",
      descEs: "Consulta en su sitio qué pagos y burós incluye LevelCredit.",
      descEn: "Check their site for which payments and bureaus LevelCredit includes.",
      proEs: [],
      proEn: [],
      contraEs: ["Consulta el precio actual en su sitio"],
      contraEn: ["Check current pricing on their site"],
    },
    {
      name: "Rental Kharma",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "Consulta el precio actual en su sitio" : "Check current pricing on their site",
      afiliado: false,
      destacado: isEs ? "Consulta precio y condiciones en su sitio" : "Check price and terms on their site",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.05)",
      border: "rgba(245,158,11,0.15)",
      descEs: "Rental Kharma reporta pagos de renta. Consulta en su sitio el precio actual, los burós y las condiciones.",
      descEn: "Rental Kharma reports rent payments. Check their site for current pricing, bureaus and terms.",
      proEs: [],
      proEn: [],
      contraEs: ["Consulta en su sitio qué pagos y burós incluye"],
      contraEn: ["Check their site for which payments and bureaus it includes"],
    },
    {
      name: "RentTrack",
      burós: isEs ? "Consulta en su sitio" : "Check their site",
      renta: true,
      servicios: null,
      precio: isEs ? "De pago" : "Paid",
      afiliado: false,
      destacado: isEs ? "Para arrendadores y arrendatarios" : "For landlords and tenants",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.05)",
      border: "rgba(244,63,94,0.15)",
      descEs: "RentTrack está diseñado tanto para arrendadores como para inquilinos. Verifica el pago y lo reporta. Es una opción cuando el arrendador también participa en el proceso.",
      descEn: "RentTrack is designed for both landlords and tenants. It verifies payment and reports it. An option when the landlord also participates in the process.",
      proEs: ["Para cuando el arrendador usa el sistema"],
      proEn: ["For when the landlord uses the system"],
      contraEs: ["Requiere coordinación con el arrendador en algunos casos", "Consulta el precio actual en su sitio"],
      contraEn: ["May require landlord coordination in some cases", "Check current pricing on their site"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-[11px] text-[#8892a4]">June 2026 · 8 {t.readSuffix}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {t.subtitle}
          </p>
          <p className="text-xs text-[#8892a4] mt-3">{t.reviewedNote}</p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <AffiliateDisclosure locale={isEs ? "es" : "en"} variant="multi" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {isEs ? "¿Vale la Pena Pagar por Reportar tu Renta?" : "Is It Worth Paying to Report Your Rent?"}
            </h2>
            <p>
              {isEs
                ? "La respuesta corta: depende de tu situación. Si tienes crédito limitado o un puntaje bajo, usar una plataforma de reporte puede traducirse en ahorros futuros — en forma de tasas de interés más bajas en préstamos, mejor acceso a apartamentos o mejores condiciones en tarjetas de crédito. Consulta el precio actual de cada plataforma en su sitio."
                : "The short answer: it depends on your situation. If you have limited credit or a low score, using a reporting platform can translate into future savings — in the form of lower interest rates on loans, better access to apartments, or better credit card terms. Check each platform's current price on its site."}
            </p>
            <p className="mt-3">
              {isEs
                ? "Un ejemplo ilustrativo: en un préstamo de auto de $20,000 a 60 meses, una tasa de 6% en lugar de 7% son unos $562 de diferencia en intereses durante la vida del préstamo. Es solo un ejemplo con esos supuestos; tu ahorro real depende de tu préstamo y de tu tasa."
                : "An illustrative example: on a $20,000 auto loan over 60 months, a 6% rate instead of 7% means about $562 less in interest over the life of the loan. It's only an example with those assumptions; your actual savings depend on your loan and your rate."}
            </p>

            <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
              <p className="text-sm font-bold text-[#f0f2f7] mb-3">
                {isEs ? "¿Cuándo tiene sentido pagar?" : "When does it make sense to pay?"}
              </p>
              <div className="space-y-2">
                {(isEs ? [
                  "Quieres mejorar tu puntaje pronto",
                  "Planeas pedir un préstamo de auto o hipoteca en los próximos 12 meses",
                  "Tienes historial de renta pero nunca ha sido reportado",
                  "Quieres reportar a los 3 burós, no solo a uno",
                  "Quieres agregar historial pasado de forma retroactiva",
                ] : [
                  "You want to improve your score soon",
                  "You plan to apply for an auto loan or mortgage in the next 12 months",
                  "You have rental history that has never been reported",
                  "You want to report to all 3 bureaus, not just one",
                  "You want to add past history retroactively",
                ]).map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="text-[#06d6a0] flex-shrink-0">✓</span>
                    <span className="text-[#8892a4]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Platform cards */}
          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {isEs ? "Comparación de Plataformas" : "Platform Comparison"}
            </h2>
            <div className="space-y-5">
              {platforms.map((p, idx) => (
                <div key={p.name} className="rounded-2xl p-6" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-[#f0f2f7] text-lg">
                          #{idx + 1} {p.slug ? (
                            <AffiliateLink slug={p.slug} className="underline hover:text-[#4f7cff] transition-colors">{p.name}</AffiliateLink>
                          ) : p.name}
                        </span>

                      </div>
                      <p className="text-[11px] font-medium" style={{ color: p.color }}>{p.destacado}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#8892a4] mb-0.5">{isEs ? "Precio" : "Price"}</p>
                      <p className="text-sm font-bold text-[#f0f2f7]">{p.precio}</p>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>
                      {isEs ? "Burós:" : "Bureaus:"} {p.burós}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${p.renta ? 'bg-[rgba(6,214,160,0.1)] text-[#06d6a0]' : 'bg-[rgba(244,63,94,0.1)] text-[#f43f5e]'}`}>
                      {isEs ? "Renta:" : "Rent:"} {p.renta ? '✓' : '✗'}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${p.servicios === null ? 'bg-white/[0.06] text-[#8892a4]' : p.servicios ? 'bg-[rgba(6,214,160,0.1)] text-[#06d6a0]' : 'bg-[rgba(244,63,94,0.1)] text-[#f43f5e]'}`}>
                      {isEs ? "Servicios:" : "Utilities:"} {p.servicios === null ? (isEs ? "Consulta en su sitio" : "Check their site") : p.servicios ? '✓' : '✗'}
                    </span>
                  </div>

                  <p className="text-sm text-[#8892a4] leading-relaxed mb-4">
                    {isEs ? p.descEs : p.descEn}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(isEs ? p.proEs : p.proEn).length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-[#06d6a0] uppercase tracking-wide mb-2">
                          {isEs ? "Ventajas" : "Pros"}
                        </p>
                        <ul className="space-y-1">
                          {(isEs ? p.proEs : p.proEn).map((item, i) => (
                            <li key={i} className="flex gap-1.5 text-[11px] text-[#8892a4]">
                              <span className="text-[#06d6a0] flex-shrink-0">+</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {(isEs ? p.contraEs : p.contraEn).length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-[#f43f5e] uppercase tracking-wide mb-2">
                          {isEs ? "Limitaciones" : "Cons"}
                        </p>
                        <ul className="space-y-1">
                          {(isEs ? p.contraEs : p.contraEn).map((item, i) => (
                            <li key={i} className="flex gap-1.5 text-[11px] text-[#8892a4]">
                              <span className="text-[#f43f5e] flex-shrink-0">−</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {p.slug && (
                    <div className="mt-4 pt-3 border-t border-white/[0.05]" style={{ color: p.color }}>
                      <AffiliateLink slug={p.slug} className="inline-flex items-center gap-1.5 text-xs font-bold">
                        {isEs ? `Visitar ${p.name} →` : `Visit ${p.name} →`}
                      </AffiliateLink>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Which one to choose */}
          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {isEs ? "¿Cuál Deberías Elegir?" : "Which One Should You Choose?"}
            </h2>
            <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-3">
              {(isEs ? [
                { caso: "Quieres empezar gratis", rec: "Experian Boost y Self tienen opciones gratuitas. WalletHub tiene una cuenta gratuita, pero reportar renta con Credit Builder requiere plan Plus o Premium. Revisa en cada sitio qué incluye el plan gratuito." },
                { caso: "Quieres agregar historial pasado", rec: "RentReporters o Boom — permiten incluir pagos pasados. Consulta el precio y las condiciones actuales en su sitio." },
                { caso: "Quieres motivación adicional", rec: "Piñata — acumulas puntos y recompensas por pagar a tiempo." },
                { caso: "Eres nuevo en el crédito y quieres dos fuentes a la vez", rec: "Kikoff — combina reporte de renta con una línea de crédito sin interés." },
              ] : [
                { caso: "You want to start for free", rec: "Experian Boost and Self have free options. WalletHub has a free account, but reporting rent with Credit Builder requires a Plus or Premium plan. Check each site to see what the free plan includes." },
                { caso: "You want to add past history", rec: "RentReporters or Boom — let you include past payments. Check current pricing and terms on their site." },
                { caso: "You want extra motivation", rec: "Piñata — earn points and rewards for paying on time." },
                { caso: "You're new to credit and want two sources at once", rec: "Kikoff — combines rent reporting with a no-interest credit line." },
              ]).map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-[#4f7cff] font-bold text-sm flex-shrink-0">→</span>
                  <div>
                    <p className="text-sm font-bold text-[#f0f2f7]">{item.caso}</p>
                    <p className="text-sm text-[#8892a4] mt-0.5">{item.rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {isEs ? "Lo Más Importante" : "The Takeaway"}
            </h2>
            <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">
              {isEs
                ? "No existe una plataforma perfecta para todos — existe la perfecta para ti."
                : "There is no perfect platform for everyone — there's the perfect one for you."}
            </p>
            <p className="mt-3">
              {isEs
                ? "Si tienes presupuesto limitado, empieza con las opciones gratuitas y agrega una de pago cuando veas resultados. Si estás a meses de pedir un préstamo importante, compara en su sitio qué incluye cada plataforma."
                : "If you have a limited budget, start with the free options and add a paid one when you see results. If you're months away from applying for an important loan, compare what each platform includes on its site."}
            </p>
            <p className="mt-2">
              {isEs
                ? "Cada pago puntual que ya haces merece contar. Hoy puedes activar eso."
                : "Every on-time payment you already make deserves to count. You can activate that today."}
            </p>
          </section>

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
