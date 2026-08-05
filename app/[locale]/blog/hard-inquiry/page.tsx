import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_TYPE_ARTICLE, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { blogPosts } from "../posts-meta";

type Locale = "en" | "es";

const SLUG = "hard-inquiry";

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
  faqs: { question: string; answer: string }[];
}> = {
  en: {
    title: "What Is a Hard Inquiry? How It Affects Your Credit Score",
    subtitle: "A hard inquiry can lower your score by a few points — but not as much, or for as long, as most people think.",
    readSuffix: "min read",
    ctaTitle: "Want to see where your score stands right now?",
    ctaDesc: "Use our free Dual Score Estimator — it estimates your score on both models and tells you exactly which factors to improve first.",
    ctaBtn: "Analyze My Score Free",
    disclaimerText: "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions.",
    toolsLabel: "Tools",
    relatedTitle: "Related Articles",
    faqs: [
      {
        question: "What is a hard inquiry?",
        answer: "A hard inquiry — also called a \"hard pull\" — happens when a lender checks your full credit report because you applied for new credit: a credit card, an auto loan, a mortgage, or a personal loan.",
      },
      {
        question: "How much does a hard inquiry lower my score?",
        answer: "Most hard inquiries lower your FICO or VantageScore by about 5 to 10 points. The exact hit depends on your overall credit profile — a thinner credit file tends to see a bigger dip than someone with years of established accounts.",
      },
      {
        question: "How long does a hard inquiry stay on my report?",
        answer: "Hard inquiries stay on your credit report for two years. But they stop affecting your score much sooner — usually after about 12 months.",
      },
      {
        question: "Does a soft inquiry affect my credit score?",
        answer: "Soft inquiries never affect your credit score — no matter how many you have. Only hard inquiries, tied to an actual credit application, do.",
      },
    ],
  },
  es: {
    title: "¿Qué es un Hard Inquiry? Cómo Afecta tu Credit Score",
    subtitle: "Un hard inquiry puede bajar tu puntaje unos pocos puntos — pero no tanto, ni por tanto tiempo, como mucha gente cree.",
    readSuffix: "min lectura",
    ctaTitle: "¿Quieres ver cómo está tu puntaje ahora mismo?",
    ctaDesc: "Usa nuestro Estimador de Score Dual gratuito — estima tu puntaje en ambos modelos y te dice exactamente qué factores mejorar primero.",
    ctaBtn: "Analizar mi Score Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes.",
    toolsLabel: "Herramientas",
    relatedTitle: "Artículos Relacionados",
    faqs: [
      {
        question: "¿Qué es un hard inquiry?",
        answer: "Un hard inquiry — también llamado \"consulta dura\" — ocurre cuando un prestamista revisa tu reporte de crédito completo porque solicitaste crédito nuevo: una tarjeta de crédito, un préstamo de auto, una hipoteca o un préstamo personal.",
      },
      {
        question: "¿Cuánto baja mi puntaje?",
        answer: "La mayoría de los hard inquiries bajan tu FICO o VantageScore entre 5 y 10 puntos. El impacto exacto depende de tu perfil de crédito general — un historial más delgado suele ver una caída mayor que alguien con años de cuentas establecidas.",
      },
      {
        question: "¿Cuánto dura en mi reporte?",
        answer: "Los hard inquiries permanecen en tu reporte de crédito durante dos años. Pero dejan de afectar tu puntaje mucho antes — normalmente después de unos 12 meses.",
      },
      {
        question: "¿Un soft inquiry afecta mi puntaje?",
        answer: "Los soft inquiries nunca afectan tu puntaje de crédito — sin importar cuántos tengas. Solo los hard inquiries, ligados a una solicitud real de crédito, sí lo hacen.",
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
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.subtitle,
    },
  };
}

export default async function HardInquiryArticlePage({
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
  const related = blogPosts.filter((p) => p.slug !== SLUG).slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.title,
    description: t.subtitle,
    datePublished: "2026-08-05",
    dateModified: "2026-08-05",
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
            <span className="text-[11px] text-[#8892a4]">August 2026 · 3 {t.readSuffix}</span>
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Qué es un Hard Inquiry?</h2>
                <p>Un hard inquiry — también llamado &quot;consulta dura&quot; — ocurre cuando un prestamista revisa tu reporte de crédito completo porque solicitaste crédito nuevo: una tarjeta de crédito, un préstamo de auto, una hipoteca o un préstamo personal.</p>
                <p>Solo sucede cuando le diste permiso al prestamista para consultar tu archivo como parte de una solicitud. Simplemente entrar a la app de tu banco o revisar tu propio puntaje no cuenta.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Cuánto Baja tu Puntaje?</h2>
                <p>La mayoría de los hard inquiries bajan tu FICO o VantageScore entre 5 y 10 puntos. El impacto exacto depende de tu perfil de crédito general — un historial más delgado suele ver una caída mayor que alguien con años de cuentas establecidas.</p>
                <p>Una sola consulta casi nunca mueve mucho la aguja. Lo que realmente enciende alertas para los prestamistas son varias consultas duras para tipos de crédito distintos en poco tiempo.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">Si estás comparando tasas para una hipoteca o un préstamo de auto, varias consultas duras dentro de una ventana de 14 a 45 días (según el modelo de puntaje) generalmente cuentan como una sola. Los modelos están diseñados para no penalizarte por comparar precios.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Dos Líneas de Tiempo Distintas</h2>
                <p>Los hard inquiries permanecen en tu reporte de crédito durante dos años. Pero dejan de afectar tu puntaje mucho antes — normalmente después de unos 12 meses.</p>
                <p>Así que una consulta de hace ocho meses todavía puede estar restando un poco a tu puntaje, mientras que una de hace 14 meses ya solo queda como registro, sin impacto real.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Hard Inquiry vs Soft Inquiry</h2>
                <p>Aquí es donde ocurre la mayor confusión.</p>
                <p>Un soft inquiry (o &quot;consulta blanda&quot;) ocurre cuando revisas tu propio reporte de crédito, cuando una empresa te evalúa para una oferta pre-aprobada, o cuando un empleador hace una verificación de antecedentes.</p>
                <p>Los soft inquiries nunca afectan tu puntaje de crédito — sin importar cuántos tengas. Solo los hard inquiries, ligados a una solicitud real de crédito, sí lo hacen.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Qué Genera un Hard Inquiry — y Qué No?</h2>
                <p className="mb-4">¿No sabes si algo va a afectar tu puntaje? Aquí está el resumen rápido:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl p-5" style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: "#f43f5e" }}>Sí genera un hard inquiry</p>
                    <ul className="space-y-2">
                      {["Solicitar una tarjeta de crédito", "Solicitar un préstamo de auto", "Solicitar una hipoteca", "Solicitar un préstamo personal"].map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#8892a4]">
                          <span style={{ color: "#f43f5e" }} className="flex-shrink-0 mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: "rgba(6,214,160,0.05)", border: "1px solid rgba(6,214,160,0.15)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: "#06d6a0" }}>NO genera un hard inquiry</p>
                    <ul className="space-y-2">
                      {["Revisar tu propio reporte o puntaje", "Ofertas de pre-calificación o pre-aprobación", "Verificaciones de antecedentes de un empleador", "La mayoría de cotizaciones de seguro"].map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#8892a4]">
                          <span style={{ color: "#06d6a0" }} className="flex-shrink-0 mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">En Resumen</h2>
                <p>Solicitar responsablemente un solo préstamo o tarjeta no le hace daño real a tu puntaje. Lo que importa es espaciar tus solicitudes y pedir crédito solo cuando de verdad lo necesitas.</p>
                <p className="mt-2">Si quieres ver exactamente cómo está tu puntaje antes de solicitar algo nuevo, corre el estimador gratuito abajo.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Is a Hard Inquiry?</h2>
                <p>A hard inquiry — also called a &quot;hard pull&quot; — happens when a lender checks your full credit report because you applied for new credit: a credit card, an auto loan, a mortgage, or a personal loan.</p>
                <p>It only happens when you&apos;ve given a lender permission to pull your file as part of an application. Simply logging into your bank app or checking your own score doesn&apos;t count.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How Much Does It Lower Your Score?</h2>
                <p>Most hard inquiries lower your FICO or VantageScore by about 5 to 10 points. The exact hit depends on your overall credit profile — a thinner credit file tends to see a bigger dip than someone with years of established accounts.</p>
                <p>One inquiry rarely moves the needle much. What actually raises red flags for lenders is several hard inquiries for unrelated credit in a short window.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">If you&apos;re shopping for a mortgage or auto loan, multiple hard inquiries within a 14–45 day window (depending on the scoring model) usually count as just one. The models are built to not penalize you for comparing rates.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Two Different Timelines</h2>
                <p>Hard inquiries stay on your credit report for two years. But they stop affecting your score much sooner — usually after about 12 months.</p>
                <p>So an inquiry from eight months ago might still be dragging your score down slightly, while one from 14 months ago is just sitting there as a record, with no real impact anymore.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Hard Inquiry vs Soft Inquiry</h2>
                <p>This is where most of the confusion happens.</p>
                <p>A soft inquiry (or &quot;soft pull&quot;) happens when you check your own credit report, when a company checks you for a pre-approved offer, or when an employer runs a background check.</p>
                <p>Soft inquiries never affect your credit score — no matter how many you have. Only hard inquiries, tied to an actual credit application, do.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Triggers One — and What Doesn&apos;t</h2>
                <p className="mb-4">Not sure if something will ding your score? Here&apos;s the quick breakdown:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl p-5" style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.15)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: "#f43f5e" }}>Triggers a hard inquiry</p>
                    <ul className="space-y-2">
                      {["Applying for a credit card", "Applying for an auto loan", "Applying for a mortgage", "Applying for a personal loan"].map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#8892a4]">
                          <span style={{ color: "#f43f5e" }} className="flex-shrink-0 mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl p-5" style={{ background: "rgba(6,214,160,0.05)", border: "1px solid rgba(6,214,160,0.15)" }}>
                    <p className="text-[11px] font-bold uppercase tracking-wide mb-3" style={{ color: "#06d6a0" }}>Does NOT trigger one</p>
                    <ul className="space-y-2">
                      {["Checking your own credit report or score", "Pre-qualification or pre-approval offers", "Employer background checks", "Most insurance quote requests"].map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-[#8892a4]">
                          <span style={{ color: "#06d6a0" }} className="flex-shrink-0 mt-0.5">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Bottom Line</h2>
                <p>Responsibly applying for a single loan or card won&apos;t hurt your score in any real way. What matters is spacing out applications and only applying when you actually need the credit.</p>
                <p className="mt-2">If you want to see exactly where your score stands before applying for anything new, run it through our free estimator below.</p>
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
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.toolsLabel}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
