import type { Metadata } from "next";
import SectionHeader from "@/components/SectionHeader";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";

type Locale = "en" | "es";

const content: Record<Locale, {
  navLabel: string;
  eyebrow: string;
  title: string;
  heroDesc: string;
  missionTitle: string;
  missionBody: string;
  offerTitle: string;
  valuesTitle: string;
  contactTitle: string;
  contactDesc: string;
  footerText: string;
  home: string;
  tools: string;
}> = {
  en: {
    navLabel: "About",
    eyebrow: "Our Story",
    title: "About ScoreMotive",
    heroDesc: "Free, bilingual financial tools for every American — regardless of the language they speak.",
    missionTitle: "Our Mission",
    missionBody: "ScoreMotive was born from a real need: millions of people in the United States lack access to financial tools that speak their language and explain complex concepts simply. Credit scores, FICO models, debt payoff strategies — these topics can determine whether someone gets an apartment, a car, or a mortgage. We want that information to be available to everyone, free and in the language they prefer.",
    offerTitle: "What We Offer",
    valuesTitle: "Our Values",
    contactTitle: "Have questions?",
    contactDesc: "We'd love to hear from you. Reach us at:",
    footerText: "© 2026 ScoreMotive · Educational use only",
    home: "Home",
    tools: "Tools",
  },
  es: {
    navLabel: "Nosotros",
    eyebrow: "Nuestra Historia",
    title: "Acerca de ScoreMotive",
    heroDesc: "Herramientas financieras gratuitas y bilingües para todos los americanos — sin importar el idioma que hablen.",
    missionTitle: "Nuestra Misión",
    missionBody: "ScoreMotive nació de una necesidad real: millones de personas en Estados Unidos no tienen acceso a herramientas financieras que hablen su idioma y expliquen conceptos complejos de manera simple. El crédito, el score FICO, las deudas — estos temas pueden determinar si alguien consigue un apartamento, un auto, o una hipoteca. Queremos que esa información esté disponible para todos, gratis y en el idioma que prefieran.",
    offerTitle: "Qué Ofrecemos",
    valuesTitle: "Nuestros Valores",
    contactTitle: "¿Tienes preguntas?",
    contactDesc: "Nos encantaría saber de ti. Escríbenos a:",
    footerText: "© 2026 ScoreMotive · Solo uso educativo",
    home: "Inicio",
    tools: "Herramientas",
  },
};

const offerings = [
  { icon: "📊", titleEn: "Dual Score Estimator", titleEs: "Estimador de Score Dual", descEn: "Compare your Traditional FICO 8/9 vs FICO 10T simultaneously. Understand exactly how lenders see you.", descEs: "Compara tu puntaje FICO Tradicional (8/9) vs FICO 10T simultáneamente. Entiende exactamente cómo te ven los prestamistas.", color: "rgba(79,124,255,0.12)" },
  { icon: "💳", titleEn: "Debt Accelerator", titleEs: "Acelerador de Deudas", descEn: "Avalanche strategy powered by real amortization math. See how much interest you save with one extra payment.", descEs: "Estrategia de avalancha con matemáticas reales de amortización. Ve cuánto interés ahorras con un pago extra.", color: "rgba(6,214,160,0.12)" },
  { icon: "🌐", titleEn: "100% Bilingual", titleEs: "100% Bilingüe", descEn: "Every feature available in English and Spanish. Built for all communities in the American market.", descEs: "Cada función disponible en inglés y español. Construido para todas las comunidades del mercado americano.", color: "rgba(124,58,237,0.12)" },
  { icon: "🎓", titleEn: "Financial Education", titleEs: "Educación Financiera", descEn: "Articles, guides, and resources to understand the American credit system and make better financial decisions.", descEs: "Artículos, guías y recursos para entender el sistema de crédito americano y tomar mejores decisiones financieras.", color: "rgba(245,158,11,0.12)" },
];

const values = [
  { icon: "🔍", titleEn: "Transparency", titleEs: "Transparencia", descEn: "We are clear about how our site works, including that we may receive compensation through affiliate links. We never recommend something we don't believe is genuinely useful.", descEs: "Somos claros sobre cómo funciona nuestro sitio, incluyendo que podemos recibir compensación por enlaces de afiliados. Nunca recomendamos algo que no creemos útil para nuestros usuarios." },
  { icon: "🤝", titleEn: "Accessibility", titleEs: "Accesibilidad", descEn: "Financial tools should not be a privilege. Everything on ScoreMotive is free and accessible to anyone with an internet connection.", descEs: "Las herramientas financieras no deben ser un privilegio. Todo en ScoreMotive es gratuito y accesible para cualquier persona con conexión a internet." },
  { icon: "📚", titleEn: "Education First", titleEs: "Educación primero", descEn: "We are an educational tool, not financial advisors. Our goal is to give you the knowledge to make your own informed decisions.", descEs: "Somos una herramienta educativa, no asesores financieros. Nuestro objetivo es darte el conocimiento para tomar tus propias decisiones informadas." },
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

  return {
    title: t.title,
    description: t.heroDesc,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        es: `${baseUrl}/es/about`,
        "x-default": `${baseUrl}/en/about`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.heroDesc,
      url: `${baseUrl}/${locale}/about`,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.heroDesc,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEs = locale === "es";
  const otherLocale: Locale = isEs ? "en" : "es";
  const t = content[isEs ? "es" : "en"];

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      <SectionHeader
        maxWidth="4xl"
        backHref={`/${locale}`}
        label={t.navLabel}
        otherLocaleHref={`/${otherLocale}/about`}
        isEs={isEs}
      />

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4f7cff] to-[#7c3aed] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-[11px] uppercase tracking-[3px] text-[#4f7cff] font-medium">
            {t.eyebrow}
          </span>
          <h1 className="text-4xl font-black tracking-[-1px] mt-2 mb-6">
            {t.title}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {t.heroDesc}
          </p>
        </div>

        <div className="space-y-10">

          {/* Mission */}
          <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {t.missionTitle}
            </h2>
            <p className="text-[#8892a4] text-sm leading-relaxed">
              {t.missionBody}
            </p>
          </section>

          {/* What we offer */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {t.offerTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offerings.map((item) => (
                <div key={item.titleEn} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0f2f7] mb-1">{isEs ? item.titleEs : item.titleEn}</h3>
                    <p className="text-xs text-[#8892a4] leading-relaxed">{isEs ? item.descEs : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {t.valuesTitle}
            </h2>
            <div className="space-y-5">
              {values.map((item) => (
                <div key={item.titleEn} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0f2f7] mb-1">{isEs ? item.titleEs : item.titleEn}</h3>
                    <p className="text-xs text-[#8892a4] leading-relaxed">{isEs ? item.descEs : item.descEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="text-center py-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {t.contactTitle}
            </h2>
            <p className="text-sm text-[#8892a4] mb-6">
              {t.contactDesc}
            </p>
            <a href="mailto:hola@scoremotive.com" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
              hola@scoremotive.com
            </a>
          </section>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">{t.footerText}</span>
          <div className="flex gap-6">
            <a href={`/${locale}`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.home}</a>
            <a href={`/${locale}/legal`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
            <a href={`/${locale}/tools`} className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{t.tools}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
