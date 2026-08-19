import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "./seo-defaults";
import Header from "@/components/Header";

type Locale = "en" | "es";

const content: Record<Locale, {
  pill: string;
  h1a: string;
  h1b: string;
  sub: string;
  desc: string;
  note: string;
  emailPlaceholder: string;
  joinBtn: string;
  errorMsg: string;
  successMsg: string;
  whatscoming: string;
  follow: string;
  disclaimer: string;
  footer: string;
  navTools: string;
  eduLabel: string;
  eduTitle: string;
  viewAll: string;
  eduBadge: string;
  contact: string;
  about: string;
}> = {
  en: {
    pill: "Free Tools — Now Available",
    h1a: "Know your score.",
    h1b: "Own your future.",
    sub: "Entiende tu crédito. Domina tu futuro.",
    desc: "Free bilingual tools to analyze your credit score, accelerate debt payoff, and build lasting credit — in English and Spanish.",
    note: "100% Free. No credit card required.",
    emailPlaceholder: "Enter your email address",
    joinBtn: "Join Our Newsletter",
    errorMsg: "Something went wrong. Please try again.",
    successMsg: "✓ You're subscribed! Check your inbox to confirm.",
    whatscoming: "What we offer",
    follow: "Follow us",
    disclaimer: "ScoreMotive is an educational and informational tool. It does not constitute professional financial, legal, or tax advice. Credit score results are estimates based on simplified models. Always consult a Certified Financial Planner (CFP) before making financial decisions. This site may receive compensation through affiliate links.",
    footer: "© 2026 ScoreMotive · Educational use only",
    navTools: "Tools",
    eduLabel: "Financial Education",
    eduTitle: "Articles & Guides",
    viewAll: "View all →",
    eduBadge: "Educational Tool",
    contact: "Contact",
    about: "About",
  },
  es: {
    pill: "Herramientas Gratis — Ya Disponibles",
    h1a: "Conoce tu score.",
    h1b: "Domina tu futuro.",
    sub: "Know your score. Own your future.",
    desc: "Herramientas bilingües gratuitas para analizar tu puntuación de crédito, acelerar el pago de deudas y construir crédito duradero — en inglés y español.",
    note: "100% Gratis. Sin tarjeta de crédito.",
    emailPlaceholder: "Ingresa tu correo electrónico",
    joinBtn: "Únete a Nuestro Boletín",
    errorMsg: "Algo salió mal. Intenta de nuevo.",
    successMsg: "✓ ¡Listo! Revisa tu correo para confirmar tu suscripción.",
    whatscoming: "Lo que ofrecemos",
    follow: "Síguenos",
    disclaimer: "ScoreMotive es una herramienta educativa e informativa. No constituye asesoría financiera, legal ni fiscal profesional. Los resultados de la puntuación de crédito son estimaciones basadas en modelos simplificados. Consulta siempre a un CFP antes de tomar decisiones financieras. Este sitio puede recibir compensación por enlaces de afiliados.",
    footer: "© 2026 ScoreMotive · Solo uso educativo",
    navTools: "Herramientas",
    eduLabel: "Educación Financiera",
    eduTitle: "Artículos y Guías",
    viewAll: "Ver todos →",
    eduBadge: "Herramienta Educativa",
    contact: "Contacto",
    about: "Acerca de",
  },
};

const features = [
  { icon: "📊", titleEn: "Dual Score Estimator", titleEs: "Estimador de Score Dual", descEn: "Compare Traditional FICO 8/9 vs FICO 10T simultaneously. Understand exactly how lenders see you.", descEs: "Compara el FICO Tradicional 8/9 vs FICO 10T al mismo tiempo. Entiende exactamente cómo te ven los prestamistas.", tagEn: "FICO 8 · FICO 9 · FICO 10T", tagEs: "FICO 8 · FICO 9 · FICO 10T", color: "rgba(79,124,255,0.12)", tagColor: "#7ba7ff", tagBg: "rgba(79,124,255,0.1)", href: "/tools" },
  { icon: "💳", titleEn: "Debt Accelerator", titleEs: "Acelerador de Deudas", descEn: "Avalanche strategy powered by real amortization math. See how much interest you save with one extra payment.", descEs: "Estrategia de avalancha con matemáticas reales de amortización. Mira cuánto interés ahorras con un pago extra.", tagEn: "Avalanche · Snowball · PDF Export", tagEs: "Avalancha · Bola de Nieve · Exportar PDF", color: "rgba(6,214,160,0.12)", tagColor: "#06d6a0", tagBg: "rgba(6,214,160,0.1)", href: "/tools?tab=deuda" },
  { icon: "🌐", titleEn: "Fully Bilingual", titleEs: "Totalmente Bilingüe", descEn: "Every feature available in English and Spanish. Built for all communities in the American market.", descEs: "Cada función disponible en inglés y español. Hecho para todas las comunidades del mercado estadounidense.", tagEn: "English · Español", tagEs: "Inglés · Español", color: "rgba(124,58,237,0.12)", tagColor: "#a78bfa", tagBg: "rgba(124,58,237,0.1)", href: "/tools" },
];

const blogPreview = [
  { slug: "fico-8-vs-fico-10t", tag: "FICO Score", tagColor: "#7ba7ff", tagBg: "rgba(79,124,255,0.1)", titleEn: "FICO 8 vs FICO 10T: What's the Difference and Why It Matters", titleEs: "FICO 8 vs FICO 10T: Cuál es la Diferencia y Por Qué Importa", time: "6 min" },
  { slug: "debt-avalanche-vs-snowball", tag: "Debt", tagColor: "#06d6a0", tagBg: "rgba(6,214,160,0.1)", titleEn: "Debt Avalanche vs Snowball: Which Pays Off Debt Faster", titleEs: "Avalancha vs Bola de Nieve: Cuál Liquida Deudas Más Rápido", time: "7 min" },
  { slug: "raise-credit-score-100-points", tag: "Credit Score", tagColor: "#f59e0b", tagBg: "rgba(245,158,11,0.1)", titleEn: "How to Raise Your Credit Score 100 Points in 6 Months", titleEs: "Cómo Subir tu Credit Score 100 Puntos en 6 Meses", time: "7 min" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";
  const title = isEs
    ? "ScoreMotive — Conoce tu Score. Domina tu Futuro."
    : "ScoreMotive — Know Your Score. Own Your Future.";

  return {
    title,
    description: t.desc,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description: t.desc,
      url: `${baseUrl}/${locale}`,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title,
      description: t.desc,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const lang: Locale = isEs ? "es" : "en";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[lang];

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      {/* Gradient Orbs */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.12)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,214,160,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <Header locale={locale} otherLocale={otherLocale} isEs={isEs} t={t} />

      {/* Hero */}
      <section className="relative z-10 pt-40 pb-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 bg-[rgba(79,124,255,0.08)] hover:bg-[rgba(79,124,255,0.14)] border border-[rgba(79,124,255,0.2)] rounded-full px-4 py-1.5 text-xs font-medium text-[#7ba7ff] mb-8 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0] animate-pulse" />
            {t.pill}
          </Link>

          <h1 className="text-[clamp(42px,7vw,76px)] font-black leading-[1.05] tracking-[-2px] mb-3">
            <span className="block text-[#f0f2f7]">{t.h1a}</span>
            <span className="block bg-gradient-to-r from-[#4f7cff] via-[#7c3aed] to-[#06d6a0] bg-clip-text text-transparent">{t.h1b}</span>
          </h1>

          <p className="text-[clamp(16px,2.5vw,22px)] text-[#8892a4] font-light mb-8">
            {t.sub}
          </p>

          <p className="text-[clamp(15px,2vw,18px)] text-[#8892a4] max-w-xl mx-auto mb-12 leading-relaxed font-light">
            {t.desc}
          </p>

          <NewsletterForm
            lang={lang}
            placeholder={t.emailPlaceholder}
            joinBtn={t.joinBtn}
            errorMsg={t.errorMsg}
            successMsg={t.successMsg}
          />

          <p className="text-xs text-[#8892a4]">{t.note}</p>

        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[3px] text-[#8892a4] mb-12">{t.whatscoming}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {features.map((f) => (
              <a key={f.titleEn} href={`/${locale}${f.href}`} className="block bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5" style={{ background: f.color }}>{f.icon}</div>
                <h3 className="text-lg font-bold text-[#f0f2f7] mb-2.5 tracking-[-0.3px]">{isEs ? f.titleEs : f.titleEn}</h3>
                <p className="text-sm text-[#8892a4] leading-relaxed font-light mb-4">{isEs ? f.descEs : f.descEn}</p>
                <span className="inline-block text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full" style={{ background: f.tagBg, color: f.tagColor }}>{isEs ? f.tagEs : f.tagEn}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="relative z-10 pb-24 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[3px] text-[#8892a4] mb-8">{t.follow}</p>
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          <a href="https://instagram.com/scoremotive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0d1220] border border-white/[0.07] rounded-xl px-5 py-2.5 text-sm font-medium text-[#8892a4] hover:border-white/[0.12] hover:text-[#f0f2f7] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @scoremotive
          </a>
          <a href="https://x.com/scoremotive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0d1220] border border-white/[0.07] rounded-xl px-5 py-2.5 text-sm font-medium text-[#8892a4] hover:border-white/[0.12] hover:text-[#f0f2f7] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            @scoremotive
          </a>
        </div>
      </section>

      {/* Blog Section */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] uppercase tracking-[3px] text-[#4f7cff] font-medium">{t.eduLabel}</span>
              <h2 className="text-2xl font-black tracking-[-0.5px] mt-1 text-[#f0f2f7]">{t.eduTitle}</h2>
            </div>
            <a href={`/${locale}/blog`} className="text-[11px] font-bold text-[#a78bfa] bg-[rgba(124,58,237,0.1)] hover:bg-[rgba(124,58,237,0.2)] border border-[rgba(124,58,237,0.25)] px-3 py-1.5 rounded-lg transition-all">
              {t.viewAll}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {blogPreview.map((post) => (
              <a key={post.slug} href={`/${locale}/blog/${post.slug}`} className="block bg-[#0d1220] border border-white/[0.07] rounded-2xl p-5 hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-200 group">
                <span className="inline-block text-[10px] font-medium uppercase tracking-[1px] px-2 py-0.5 rounded-full mb-3" style={{ background: post.tagBg, color: post.tagColor }}>{post.tag}</span>
                <h3 className="text-sm font-bold text-[#f0f2f7] leading-snug group-hover:text-[#4f7cff] transition-colors mb-2">{isEs ? post.titleEs : post.titleEn}</h3>
                <p className="text-[11px] text-[#8892a4]">{post.time} {isEs ? "min lectura" : "min read"}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="relative z-10 border-t border-white/[0.07] py-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] rounded-lg px-3.5 py-1.5 text-[11px] text-[#d4a017] mb-3">
            ⚠️ {t.eduBadge}
          </div>
          <p className="text-[11px] text-[#8892a4] leading-relaxed opacity-70">
            {t.disclaimer}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">{t.footer}</span>
          <div className="flex gap-6">
            <a href="mailto:hola@scoremotive.com" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.contact}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
            <a href={`/${locale}/about`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.about}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
