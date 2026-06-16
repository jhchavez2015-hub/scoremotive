"use client";
import { useState } from "react";

export default function RentArticlePage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const isEs = lang === "es";

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/blog" className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors">
            ← {isEs ? "Blog" : "Blog"}
          </a>
          <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300">
            🌐 {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Meta */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(79,124,255,0.1)] text-[#7ba7ff]">
              {isEs ? "Credit Score" : "Credit Score"}
            </span>
            <span className="text-[11px] text-[#8892a4]">June 2026 · 6 {isEs ? "min lectura" : "min read"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {isEs
              ? "Cómo tu Renta y Servicios Pueden Subir tu Credit Score"
              : "How Your Rent and Utility Bills Can Raise Your Credit Score"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {isEs
              ? "Por décadas, pagar la renta puntualmente no contaba para tu crédito. Eso está cambiando — y puede ser tu ventaja más poderosa."
              : "For decades, paying rent on time didn't count toward your credit. That's changing — and it could be your most powerful financial advantage."}
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
            {isEs ? "¿Quieres ver cómo está tu puntaje ahora mismo?" : "Want to see where your score stands right now?"}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {isEs
              ? "Usa nuestro Analizador FICO Dual gratuito — estima tu puntaje en ambos modelos y te dice exactamente qué factores mejorar primero."
              : "Use our free Dual FICO Analyzer — it estimates your score on both models and tells you exactly which factors to improve first."}
          </p>
          <a href="/tools" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {isEs ? "Analizar mi Score Gratis" : "Analyze My Score Free"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl">
          <p className="text-[11px] text-[#8892a4] leading-relaxed">
            ⚠️ {isEs
              ? "ScoreMotive es una herramienta educativa. Los resultados son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes."
              : "ScoreMotive is an educational tool. Results are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions."}
          </p>
        </div>

      </article>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">© 2026 ScoreMotive</span>
          <div className="flex gap-6">
            <a href="/blog" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Blog</a>
            <a href="/tools" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">{isEs ? "Herramientas" : "Tools"}</a>
            <a href="/legal" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
