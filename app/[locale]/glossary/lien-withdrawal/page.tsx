import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_LOCALE, TWITTER_CARD } from "../../seo-defaults";
import { glossaryTerms } from "../glossary-meta";

type Locale = "en" | "es";

const SLUG = "lien-withdrawal";

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
    title: "Lien Withdrawal",
    subtitle: "An IRS action that erases the public filing of a tax lien entirely, as if it had never been recorded — different from a release, which just marks the debt as paid.",
    navBack: "← Glossary",
    ctaTitle: "Owe back taxes and other debt at the same time?",
    ctaDesc: "Use our free Debt Accelerator to build a payoff plan that prioritizes what actually protects your credit and your finances first.",
    ctaBtn: "Build My Payoff Plan Free",
    disclaimerText: "ScoreMotive is an educational tool, not a tax or legal advisor. Tax lien resolution depends on your specific situation — consult a tax attorney, CPA, or enrolled agent before taking action with the IRS.",
    toolsLabel: "Tools",
    relatedTitle: "Related Terms",
    faqs: [
      {
        question: "What is a lien withdrawal?",
        answer: "A lien withdrawal is when the IRS removes the public filing of a Notice of Federal Tax Lien entirely, as if it had never been recorded — even though you may still owe the underlying tax debt in some cases.",
      },
      {
        question: "How do I request a withdrawal?",
        answer: "You request it using IRS Form 12277, Application for Withdrawal of Filed Form 668(Y), Notice of Federal Tax Lien. It's not automatic — you have to actively apply, even after paying your debt in full.",
      },
      {
        question: "How long does the process take?",
        answer: "The IRS typically processes Form 12277 within 30 to 45 days. Once approved, they issue Form 10916(c), which you can send to credit bureaus and county recorders.",
      },
      {
        question: "Is a withdrawal the same as a release?",
        answer: "No. A release is automatic and just marks the lien as satisfied — the public record stays visible. A withdrawal erases the public filing completely and must be requested separately.",
      },
    ],
  },
  es: {
    title: "Withdrawal de un Lien (Retiro)",
    subtitle: "Una acción del IRS que borra por completo el registro público de un tax lien, como si nunca se hubiera presentado — distinto de un release, que solo marca la deuda como pagada.",
    navBack: "← Glosario",
    ctaTitle: "¿Debes impuestos atrasados y otras deudas al mismo tiempo?",
    ctaDesc: "Usa nuestro Acelerador de Deudas gratuito para armar un plan de pago que priorice lo que realmente protege tu crédito y tus finanzas primero.",
    ctaBtn: "Armar mi Plan de Pago Gratis",
    disclaimerText: "ScoreMotive es una herramienta educativa, no un asesor fiscal o legal. La resolución de un tax lien depende de tu situación específica — consulta a un abogado fiscal, CPA o enrolled agent antes de tomar acción con el IRS.",
    toolsLabel: "Herramientas",
    relatedTitle: "Términos Relacionados",
    faqs: [
      {
        question: "¿Qué es un lien withdrawal?",
        answer: "Un lien withdrawal ocurre cuando el IRS elimina por completo el registro público de un Notice of Federal Tax Lien, como si nunca se hubiera presentado — aunque en algunos casos todavía puedas deber la deuda original.",
      },
      {
        question: "¿Cómo solicito un withdrawal?",
        answer: "Se solicita con el Form 12277 del IRS, Application for Withdrawal of Filed Form 668(Y), Notice of Federal Tax Lien. No es automático — tienes que solicitarlo activamente, incluso después de pagar toda tu deuda.",
      },
      {
        question: "¿Cuánto tarda el proceso?",
        answer: "El IRS normalmente procesa el Form 12277 en 30 a 45 días. Una vez aprobado, emiten el Form 10916(c), que puedes enviar a las agencias de crédito y a la oficina de registro de tu condado.",
      },
      {
        question: "¿Un withdrawal es lo mismo que un release?",
        answer: "No. Un release es automático y solo marca el lien como satisfecho — el registro público sigue visible. Un withdrawal borra el registro público por completo y debe solicitarse por separado.",
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

export default async function LienWithdrawalGlossaryPage({
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
  const priorityRelated = ["tax-lien", "lien-release"];
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
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Definición Rápida</h2>
                <p>Un withdrawal es la eliminación total del registro público de un tax lien. A diferencia de un release, que solo marca la deuda como satisfecha pero deja el registro visible, el withdrawal hace que sea como si el lien nunca se hubiera presentado.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Cómo Calificar</h2>
                <p>Bajo el Fresh Start Initiative del IRS, puedes calificar si tu saldo es de $25,000 o menos, lo estás pagando por Direct Debit Installment Agreement, y llevas al menos tres pagos consecutivos a tiempo. También puedes calificar después de pagar la deuda por completo.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Consejo</p>
                  <p className="text-sm text-[#c8d0dc]">El withdrawal no es automático — tienes que solicitarlo activamente con el Form 12277 del IRS, aunque ya hayas pagado toda la deuda.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Qué Pasa Después de Aprobarse</h2>
                <p>El IRS emite el Form 10916(c), que puedes enviar a las tres agencias de crédito y a la oficina de registro de tu condado para confirmar que el registro fue retirado.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Quick Definition</h2>
                <p>A withdrawal is the complete removal of a tax lien&apos;s public record. Unlike a release, which only marks the debt as satisfied while leaving the record visible, a withdrawal makes it as if the lien had never been filed.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">How to Qualify</h2>
                <p>Under the IRS Fresh Start Initiative, you may qualify if your balance is $25,000 or less, you&apos;re paying it through a Direct Debit Installment Agreement, and you&apos;ve made at least three consecutive on-time payments. You can also qualify after paying the debt in full.</p>

                <div className="rounded-xl p-5 my-4" style={{ background: "rgba(79,124,255,0.05)", border: "1px solid rgba(79,124,255,0.15)" }}>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-[#7ba7ff] mb-2">Tip</p>
                  <p className="text-sm text-[#c8d0dc]">A withdrawal isn&apos;t automatic — you have to actively request it using IRS Form 12277, even after you&apos;ve paid off the full debt.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Happens After Approval</h2>
                <p>The IRS issues Form 10916(c), which you can send to the credit bureaus and your county recorder&apos;s office to confirm the record was withdrawn.</p>
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
