"use client";
import { useState } from "react";

export default function AboutPage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const isEs = lang === "es";

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors">
            ← ScoreMotive
          </a>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8892a4]">{isEs ? "Nosotros" : "About"}</span>
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300">
              🌐 {lang === "en" ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4f7cff] to-[#7c3aed] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
            <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="text-[11px] uppercase tracking-[3px] text-[#4f7cff] font-medium">
            {isEs ? "Nuestra Historia" : "Our Story"}
          </span>
          <h1 className="text-4xl font-black tracking-[-1px] mt-2 mb-6">
            {isEs ? "Acerca de ScoreMotive" : "About ScoreMotive"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed max-w-2xl mx-auto font-light">
            {isEs
              ? "Herramientas financieras gratuitas y bilingües para todos los americanos — sin importar el idioma que hablen."
              : "Free, bilingual financial tools for every American — regardless of the language they speak."}
          </p>
        </div>

        <div className="space-y-10">

          {/* Mission */}
          <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {isEs ? "Nuestra Misión" : "Our Mission"}
            </h2>
            <p className="text-[#8892a4] text-sm leading-relaxed">
              {isEs
                ? "ScoreMotive nació de una necesidad real: millones de personas en Estados Unidos no tienen acceso a herramientas financieras que hablen su idioma y expliquen conceptos complejos de manera simple. El crédito, el score FICO, las deudas — estos temas pueden determinar si alguien consigue un apartamento, un auto, o una hipoteca. Queremos que esa información esté disponible para todos, gratis y en el idioma que prefieran."
                : "ScoreMotive was born from a real need: millions of people in the United States lack access to financial tools that speak their language and explain complex concepts simply. Credit scores, FICO models, debt payoff strategies — these topics can determine whether someone gets an apartment, a car, or a mortgage. We want that information to be available to everyone, free and in the language they prefer."}
            </p>
          </section>

          {/* What we offer */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {isEs ? "Qué Ofrecemos" : "What We Offer"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "📊",
                  title: isEs ? "Analizador FICO Dual" : "Dual FICO Analyzer",
                  desc: isEs
                    ? "Compara tu puntaje FICO Tradicional (8/9) vs FICO 10T simultáneamente. Entiende exactamente cómo te ven los prestamistas."
                    : "Compare your Traditional FICO 8/9 vs FICO 10T simultaneously. Understand exactly how lenders see you.",
                  color: "rgba(79,124,255,0.12)",
                },
                {
                  icon: "💳",
                  title: isEs ? "Acelerador de Deudas" : "Debt Accelerator",
                  desc: isEs
                    ? "Estrategia de avalancha con matemáticas reales de amortización. Ve cuánto interés ahorras con un pago extra."
                    : "Avalanche strategy powered by real amortization math. See how much interest you save with one extra payment.",
                  color: "rgba(6,214,160,0.12)",
                },
                {
                  icon: "🌐",
                  title: isEs ? "100% Bilingüe" : "100% Bilingual",
                  desc: isEs
                    ? "Cada función disponible en inglés y español. Construido para todas las comunidades del mercado americano."
                    : "Every feature available in English and Spanish. Built for all communities in the American market.",
                  color: "rgba(124,58,237,0.12)",
                },
                {
                  icon: "🎓",
                  title: isEs ? "Educación Financiera" : "Financial Education",
                  desc: isEs
                    ? "Artículos, guías y recursos para entender el sistema de crédito americano y tomar mejores decisiones financieras."
                    : "Articles, guides, and resources to understand the American credit system and make better financial decisions.",
                  color: "rgba(245,158,11,0.12)",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0f2f7] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#8892a4] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {isEs ? "Nuestros Valores" : "Our Values"}
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: isEs ? "Transparencia" : "Transparency",
                  desc: isEs
                    ? "Somos claros sobre cómo funciona nuestro sitio, incluyendo que podemos recibir compensación por enlaces de afiliados. Nunca recomendamos algo que no creemos útil para nuestros usuarios."
                    : "We are clear about how our site works, including that we may receive compensation through affiliate links. We never recommend something we don't believe is genuinely useful.",
                  icon: "🔍",
                },
                {
                  title: isEs ? "Accesibilidad" : "Accessibility",
                  desc: isEs
                    ? "Las herramientas financieras no deben ser un privilegio. Todo en ScoreMotive es gratuito y accesible para cualquier persona con conexión a internet."
                    : "Financial tools should not be a privilege. Everything on ScoreMotive is free and accessible to anyone with an internet connection.",
                  icon: "🤝",
                },
                {
                  title: isEs ? "Educación primero" : "Education First",
                  desc: isEs
                    ? "Somos una herramienta educativa, no asesores financieros. Nuestro objetivo es darte el conocimiento para tomar tus propias decisiones informadas."
                    : "We are an educational tool, not financial advisors. Our goal is to give you the knowledge to make your own informed decisions.",
                  icon: "📚",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[#f0f2f7] mb-1">{item.title}</h3>
                    <p className="text-xs text-[#8892a4] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="text-center py-8">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {isEs ? "¿Tienes preguntas?" : "Have questions?"}
            </h2>
            <p className="text-sm text-[#8892a4] mb-6">
              {isEs
                ? "Nos encantaría saber de ti. Escríbenos a:"
                : "We'd love to hear from you. Reach us at:"}
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
          <span className="text-xs text-[#8892a4]">© 2025 ScoreMotive · {isEs ? "Solo uso educativo" : "Educational use only"}</span>
          <div className="flex gap-6">
            <a href="/" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{isEs ? "Inicio" : "Home"}</a>
            <a href="/legal" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
            <a href="/tools" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{isEs ? "Herramientas" : "Tools"}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
