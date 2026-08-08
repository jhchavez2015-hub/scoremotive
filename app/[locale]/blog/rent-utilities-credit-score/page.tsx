import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";

type Locale = "en" | "es";

const SLUG = "rent-utilities-credit-score";

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
    title: "How Your Rent and Utility Bills Can Raise Your Credit Score",
    subtitle: "For decades, paying rent on time didn't count toward your credit. That's changing — and it could be your most powerful financial advantage.",
    readSuffix: "min read",
    ctaTitle: "Want to see where your score stands right now?",
    ctaDesc: "Use our free Dual Score Estimator — it estimates your score on both models and tells you exactly which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
  },
  es: {
    title: "Cómo tu Renta y Servicios Pueden Subir tu Credit Score",
    subtitle: "Por décadas, pagar la renta puntualmente no contaba para tu crédito. Eso está cambiando — y puede ser tu ventaja más poderosa.",
    readSuffix: "min lectura",
    ctaTitle: "¿Quieres ver cómo está tu puntaje ahora mismo?",
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

export default async function RentArticlePage({
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
    dateModified: "2026-06-16",
    inLanguage: locale,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
            <span className="text-[11px] text-[#8892a4]">June 2026 · 6 {t.readSuffix}</span>
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Problema que Muchos No Saben que Tienen</h2>
                <p>Imagina pagar puntualmente tu renta, la luz, el internet y el celular durante años. Pero al momento de pedir un préstamo para un auto o una casa, el banco te dice: "Lo siento, no tienes suficiente historial de crédito."</p>
                <p>Frustrante. Y completamente injusto.</p>
                <p>Por décadas, el sistema financiero tradicional solo miraba si tenías tarjetas de crédito o préstamos bancarios. Si decidías vivir libre de deudas, el sistema te catalogaba como un <strong className="text-[#f0f2f7]">"thin file"</strong> — historial delgado — como si tu disciplina financiera no existiera.</p>
                <p>Afortunadamente, las reglas están cambiando.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Cambio que lo Hace Posible</h2>
                <p>Cuando solicitas crédito, los prestamistas miran tu puntaje calculado principalmente por dos empresas: <strong className="text-[#f0f2f7]">FICO</strong> y <strong className="text-[#f0f2f7]">VantageScore</strong>.</p>
                <p>Los modelos antiguos ignoraban por completo tus gastos del hogar.</p>
                <p>Los modelos nuevos — como <strong className="text-[#f0f2f7]">VantageScore 4.0</strong> y <strong className="text-[#f0f2f7]">FICO 10 / FICO 10T</strong> — están diseñados para incluir lo que se conoce como <strong className="text-[#f0f2f7]">"datos alternativos"</strong>: tu historial de pagos de servicios públicos, planes de telefonía móvil y, el cambio más importante, el pago de tu renta.</p>
                <p>Si eres un inquilino o consumidor responsable, ahora tienes una fuente de datos positivos que pueden mejorar tu puntuación sin necesidad de endeudarte.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Por Qué No Ocurre Automáticamente?</h2>
                <p>Aquí está el detalle que mucha gente no conoce.</p>
                <p>Aunque pagues tu internet puntualmente todos los meses, la compañía de cable no reporta eso al buró de crédito automáticamente. Solo lo reportan cuando <em>dejas</em> de pagar — ahí sí aparece como colección negativa.</p>
                <p>Para que tus pagos positivos cuenten, necesitas <strong className="text-[#f0f2f7]">activar las herramientas correctas</strong>.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo Hacer que tu Renta y Servicios Cuenten</h2>

                <div className="space-y-4 my-4">
                  {[
                    {
                      num: "1",
                      titulo: "Plataformas de Reporte de Renta",
                      color: "#4f7cff",
                      bg: "rgba(79,124,255,0.05)",
                      border: "rgba(79,124,255,0.15)",
                      contenido: [
                        "Si tu arrendador o administración de apartamentos usa portales de pago en línea (como RENTCafé, Zillow, o sistemas similares), es probable que tengan una opción para reportar tus pagos a las tres grandes agencias de crédito: Equifax, Experian y TransUnion.",
                        "Un historial de 12 a 24 meses de pagos de renta a tiempo demuestra una estabilidad financiera sólida ante cualquier banco.",
                        "Pregunta a tu administrador si ofrecen este servicio. A veces es gratuito, otras veces cuesta una pequeña tarifa mensual que vale completamente la pena.",
                      ]
                    },
                    {
                      num: "2",
                      titulo: "Programas de Impulso de las Agencias (Experian Boost y similares)",
                      color: "#06d6a0",
                      bg: "rgba(6,214,160,0.05)",
                      border: "rgba(6,214,160,0.15)",
                      contenido: [
                        "Existen herramientas gratuitas creadas directamente por los burós de crédito que te permiten conectar de forma segura la cuenta bancaria donde pagas tus servicios.",
                        "Estas herramientas buscan y registran tus pagos mensuales de servicios de streaming, tu plan de teléfono celular (Verizon, AT&T, T-Mobile, etc.), agua y electricidad.",
                        "Si detectan pagos consecutivos y puntuales, los añaden a tu reporte de crédito. Muchos usuarios ven un aumento de puntos de forma inmediata.",
                      ]
                    },
                  ].map((item) => (
                    <div key={item.num} className="rounded-xl p-5" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: item.color, background: `${item.color}20` }}>Opción {item.num}</span>
                        <h3 className="text-sm font-bold text-[#f0f2f7]">{item.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.contenido.map((p, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#8892a4]">
                            <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">→</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Las 3 Reglas de Oro para Dominar este Sistema</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "La puntualidad lo es todo", desc: "El historial de pagos representa el 35% de tu FICO score. Un solo pago atrasado por más de 30 días en tu servicio de luz o celular puede eliminar el progreso que tanto te costó ganar.", color: "#f43f5e" },
                    { num: "2", titulo: "Mantén las cuentas a tu nombre", desc: "Si pagas la luz del apartamento pero el contrato está a nombre de otra persona, tú no recibirás ningún beneficio. Asegúrate de que los servicios clave estén bajo tu nombre y número de identificación fiscal.", color: "#f59e0b" },
                    { num: "3", titulo: "Monitorea constantemente", desc: "No asumas que todo se está reportando correctamente. Revisa tu reporte de crédito al menos una vez al mes para verificar que esos pagos están quedando registrados.", color: "#06d6a0" },
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

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Crédito ya No es Solo para los Endeudados</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">El acceso al crédito se está democratizando.</p>
                <p className="mt-3">Ya no necesitas caer en el círculo vicioso de pedir una tarjeta con intereses altísimos solo para "empezar a construir historial".</p>
                <p className="mt-2">Tu comportamiento financiero diario — la forma en que manejas tu techo y tus servicios básicos — ahora tiene voz y voto en tu puntaje de crédito.</p>
                <p className="mt-2">Revisa hoy mismo qué herramientas puedes activar y empieza a hacer que cada pago que ya haces cuente para tu futuro financiero.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Problem Many People Don&apos;t Know They Have</h2>
                <p>Imagine paying your rent, electricity, internet, and cell phone on time for years. But when you apply for an auto loan or a mortgage, the bank tells you: &quot;Sorry, you don&apos;t have enough credit history.&quot;</p>
                <p>Frustrating. And completely unfair.</p>
                <p>For decades, the traditional financial system only looked at whether you had credit cards or bank loans. If you chose to live debt-free, the system labeled you a <strong className="text-[#f0f2f7]">&quot;thin file&quot;</strong> — as if your financial discipline didn&apos;t exist.</p>
                <p>Fortunately, the rules are changing.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Change That Makes It Possible</h2>
                <p>When you apply for credit, lenders look at your score calculated primarily by two companies: <strong className="text-[#f0f2f7]">FICO</strong> and <strong className="text-[#f0f2f7]">VantageScore</strong>.</p>
                <p>Old models completely ignored your household expenses.</p>
                <p>New models — like <strong className="text-[#f0f2f7]">VantageScore 4.0</strong> and <strong className="text-[#f0f2f7]">FICO 10 / FICO 10T</strong> — are designed to include what&apos;s known as <strong className="text-[#f0f2f7]">&quot;alternative data&quot;</strong>: your payment history for utilities, mobile phone plans, and most importantly, your rent payments.</p>
                <p>If you&apos;re a responsible renter or consumer, you now have a source of positive data that can improve your score without taking on debt.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Why It Doesn&apos;t Happen Automatically</h2>
                <p>Here&apos;s the detail most people don&apos;t know.</p>
                <p>Even if you pay your internet bill on time every month, the cable company doesn&apos;t automatically report that to the credit bureau. They only report when you <em>stop</em> paying — that&apos;s when it shows up as a negative collection.</p>
                <p>For your positive payments to count, you need to <strong className="text-[#f0f2f7]">activate the right tools</strong>.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How to Make Your Rent and Bills Count</h2>

                <div className="space-y-4 my-4">
                  {[
                    {
                      num: "1",
                      titulo: "Rent Reporting Platforms",
                      color: "#4f7cff",
                      bg: "rgba(79,124,255,0.05)",
                      border: "rgba(79,124,255,0.15)",
                      contenido: [
                        "If your landlord or apartment management uses online payment portals (like RENTCafé, Zillow, or similar systems), they may have an option to report your payments to the three major credit agencies: Equifax, Experian, and TransUnion.",
                        "A 12 to 24-month history of on-time rent payments demonstrates solid financial stability to any lender.",
                        "Ask your property manager if they offer this service. Sometimes it's free, other times it costs a small monthly fee that's completely worth it.",
                      ]
                    },
                    {
                      num: "2",
                      titulo: "Bureau Boost Programs (Experian Boost and Similar)",
                      color: "#06d6a0",
                      bg: "rgba(6,214,160,0.05)",
                      border: "rgba(6,214,160,0.15)",
                      contenido: [
                        "There are free tools created directly by credit bureaus that let you securely connect the bank account where you pay your bills.",
                        "These tools find and record your monthly payments for streaming services, your cell phone plan (Verizon, AT&T, T-Mobile, etc.), water, and electricity.",
                        "If they detect consistent, on-time payments, they add them to your credit report. Many users see an immediate score increase.",
                      ]
                    },
                  ].map((item) => (
                    <div key={item.num} className="rounded-xl p-5" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: item.color, background: `${item.color}20` }}>Option {item.num}</span>
                        <h3 className="text-sm font-bold text-[#f0f2f7]">{item.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.contenido.map((p, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#8892a4]">
                            <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">→</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The 3 Golden Rules to Master This System</h2>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-4">
                  {[
                    { num: "1", titulo: "Punctuality is everything", desc: "Payment history represents 35% of your FICO score. A single payment more than 30 days late on your electricity or cell phone bill can wipe out the progress you worked so hard to build.", color: "#f43f5e" },
                    { num: "2", titulo: "Keep accounts in your name", desc: "If you pay the apartment electricity but the contract is in someone else's name, you won't receive any benefit. Make sure key services are under your name and tax identification number.", color: "#f59e0b" },
                    { num: "3", titulo: "Monitor constantly", desc: "Don't assume everything is being reported correctly. Check your credit report at least once a month to verify those payments are being recorded.", color: "#06d6a0" },
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

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Credit Is No Longer Just for the Indebted</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Access to credit is being democratized.</p>
                <p className="mt-3">You no longer need to fall into the vicious cycle of getting a high-interest store card just to &quot;start building credit history.&quot;</p>
                <p className="mt-2">Your daily financial behavior — how you manage your housing and basic services — now has a voice in your credit score.</p>
                <p className="mt-2">Check today which tools you can activate and start making every payment you already make count toward your financial future.</p>
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
