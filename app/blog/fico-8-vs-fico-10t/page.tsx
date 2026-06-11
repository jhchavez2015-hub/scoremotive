"use client";
import { useState } from "react";

export default function FicoArticlePage() {
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
              FICO Score
            </span>
            <span className="text-[11px] text-[#8892a4]">June 2025 · 6 {isEs ? "min lectura" : "min read"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {isEs
              ? "FICO 8 vs FICO 10T: Cuál es la Diferencia y Por Qué Importa"
              : "FICO 8 vs FICO 10T: What's the Difference and Why It Matters"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {isEs
              ? "La mayoría de los americanos no saben que existen múltiples modelos FICO. La diferencia puede significar miles de dólares en tu próximo préstamo."
              : "Most Americans don't know there are multiple FICO models. The difference can mean thousands of dollars on your next loan."}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-10" />

        {/* Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-[#c8d0dc] leading-relaxed">

          {isEs ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Tienes Más de un Puntaje de Crédito</h2>
                <p>La mayoría de las personas creen que tienen un solo puntaje de crédito.</p>
                <p>La verdad es que tienes decenas.</p>
                <p>Los prestamistas usan diferentes modelos para evaluarte. Pero dos de los más importantes son <strong className="text-[#f0f2f7]">FICO 8</strong> y <strong className="text-[#f0f2f7]">FICO 10T</strong>.</p>
                <p>Entender la diferencia puede ahorrarte miles de dólares en tu próximo préstamo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Un Poco de Historia: ¿De Dónde Viene el FICO?</h2>
                <p>En 1956, dos ingenieros — Bill Fair y Earl Isaac — tuvieron una idea.</p>
                <p>Creían que los datos y las matemáticas podían predecir si una persona pagaría un préstamo. Fundaron una empresa llamada <strong className="text-[#f0f2f7]">Fair Isaac Corporation</strong> — después abreviada como <strong className="text-[#f0f2f7]">FICO</strong>.</p>
                <p>Durante décadas, los bancos tomaban decisiones de préstamo basadas en intuición, relaciones personales y, a veces, prejuicios. FICO cambió eso. Les dio a los prestamistas un número — un puntaje — que intentaba ser objetivo.</p>
                <p>El primer puntaje FICO fue presentado a los prestamistas en <strong className="text-[#f0f2f7]">1989</strong>.</p>
                <p>Fue revolucionario. De repente, una persona joven que estaba comenzando — o alguien que nunca había necesitado crédito antes — tenía la misma oportunidad que cualquier otra persona. El número hablaba por sí solo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">FICO 8: El Estándar por Más de 15 Años</h2>
                <p>FICO 8 fue lanzado en <strong className="text-[#f0f2f7]">2009</strong> y rápidamente se convirtió en el modelo más utilizado en Estados Unidos.</p>
                <p>La mayoría de las tarjetas de crédito, préstamos de auto y préstamos personales todavía usan FICO 8 hoy.</p>
                <p>Esto es lo que evalúa:</p>
                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-2 my-4">
                  {[
                    ["Historial de Pagos", "35%", "¿Has pagado tus deudas a tiempo?"],
                    ["Cantidad Adeudada", "30%", "¿Cuánto de tu crédito disponible estás usando?"],
                    ["Antigüedad del Crédito", "15%", "¿Cuánto tiempo llevan abiertas tus cuentas?"],
                    ["Diversificación de Crédito", "10%", "¿Tienes diferentes tipos de crédito?"],
                    ["Crédito Nuevo", "10%", "¿Has solicitado crédito nuevo recientemente?"],
                  ].map(([label, pct, desc]) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-[#4f7cff] font-bold text-sm w-10 flex-shrink-0">{pct}</span>
                      <div>
                        <span className="text-[#f0f2f7] text-sm font-medium">{label}</span>
                        <span className="text-[#8892a4] text-sm"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p>Piensa en FICO 8 como una <strong className="text-[#f0f2f7]">fotografía</strong>.</p>
                <p>Captura un momento en el tiempo — tu situación crediticia ahora mismo.</p>
                <p>Si tienes un balance alto hoy, afecta tu puntaje hoy. Si lo pagas mañana, tu puntaje mejora. Simple y directo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">FICO 10T: La Evolución</h2>
                <p>FICO 10T fue introducido en <strong className="text-[#f0f2f7]">2020</strong>.</p>
                <p>La "T" significa <strong className="text-[#f0f2f7]">Datos de Tendencia</strong> (Trended Data).</p>
                <p>Mientras FICO 8 toma una fotografía, FICO 10T mira una <strong className="text-[#f0f2f7]">película</strong>.</p>
                <p>Analiza tus últimos <strong className="text-[#f0f2f7]">24 meses</strong> de comportamiento financiero. No solo dónde estás hoy — sino hacia dónde has estado yendo.</p>
                <p>¿Tus balances bajan consistentemente? Eso es una señal positiva. Muestra que estás haciendo un progreso real.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">La Misma Persona, Dos Historias Diferentes</h2>
                <p>Imagina dos personas. Ambas tienen el mismo puntaje FICO 8: <strong className="text-[#f0f2f7]">680</strong>.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-[rgba(6,214,160,0.05)] border border-[rgba(6,214,160,0.15)] rounded-xl p-5">
                    <p className="text-[#06d6a0] font-bold text-sm mb-2">Persona A ↗</p>
                    <p className="text-sm text-[#8892a4]">Tenía $5,000 de balance hace 2 años. Hoy tiene $2,000. Ha estado pagando consistentemente.</p>
                    <p className="text-[#06d6a0] text-sm font-medium mt-2">FICO 10T: Sube ✅</p>
                  </div>
                  <div className="bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.15)] rounded-xl p-5">
                    <p className="text-[#f43f5e] font-bold text-sm mb-2">Persona B ↘</p>
                    <p className="text-sm text-[#8892a4]">Tenía $1,000 de balance hace 2 años. Hoy tiene $2,000. El balance ha ido creciendo mes a mes.</p>
                    <p className="text-[#f43f5e] text-sm font-medium mt-2">FICO 10T: Baja ⚠️</p>
                  </div>
                </div>
                <p>FICO 8 los ve igual. Los dos: 680.</p>
                <p>FICO 10T ve algo diferente. La misma fotografía. Películas muy diferentes.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Quién Usa Cuál Modelo?</h2>
                <p><strong className="text-[#f0f2f7]">FICO 8</strong> sigue siendo el más común para tarjetas de crédito y muchos préstamos de auto.</p>
                <p><strong className="text-[#f0f2f7]">FICO 10T</strong> está siendo adoptado por <strong className="text-[#f0f2f7]">Fannie Mae y Freddie Mac</strong> — los dos compradores de hipotecas más grandes de Estados Unidos.</p>
                <p>Si planeas comprar una casa en los próximos años, tu comportamiento de los últimos 24 meses importa más que nunca.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Buenas Noticias: Las Mismas Acciones Mejoran Ambos Puntajes</h2>
                <p>Los comportamientos que ayudan a FICO 8 también ayudan a FICO 10T — y a menudo lo ayudan aún más.</p>
                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-2 my-4">
                  {["Pagar a tiempo cada mes", "Reducir tus balances consistentemente", "No llevar tus tarjetas al límite", "Evitar demasiadas solicitudes de crédito nuevas"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <span className="text-[#06d6a0]">✅</span>
                      <span className="text-[#c8d0dc]">{item}</span>
                    </div>
                  ))}
                </div>
                <p>Si empiezas a tomar buenas decisiones financieras hoy, FICO 10T te recompensará con el tiempo. La ventana de 24 meses trabaja a tu favor — cada mes de buen comportamiento suma.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Lo Más Importante</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Tu puntaje de crédito no es un juicio de quién eres. Es una fotografía de tu comportamiento financiero reciente — y el comportamiento puede cambiar.</p>
                <p className="mt-3">FICO 8 muestra dónde estás hoy. FICO 10T muestra la dirección en la que te diriges.</p>
                <p className="mt-2">Enfócate en la dirección. Toma acciones consistentes. El puntaje seguirá.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">You Have More Than One Credit Score</h2>
                <p>Most people think they have one credit score.</p>
                <p>The truth? You have dozens.</p>
                <p>Different lenders use different models to evaluate you. But two of the most important are <strong className="text-[#f0f2f7]">FICO 8</strong> and <strong className="text-[#f0f2f7]">FICO 10T</strong>.</p>
                <p>Understanding the difference could save you thousands of dollars on your next loan.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">A Little History: Where Did FICO Come From?</h2>
                <p>In 1956, two engineers — Bill Fair and Earl Isaac — had an idea.</p>
                <p>They believed that data and math could predict whether a person would repay a loan. They founded a company called <strong className="text-[#f0f2f7]">Fair Isaac Corporation</strong> — later shortened to <strong className="text-[#f0f2f7]">FICO</strong>.</p>
                <p>For decades, banks had been making lending decisions based on gut feeling, personal relationships, and sometimes bias. FICO changed that. It gave lenders a number — a score — that tried to be objective.</p>
                <p>The first FICO score was introduced to lenders in <strong className="text-[#f0f2f7]">1989</strong>.</p>
                <p>It was revolutionary. Suddenly, a young person just starting out — or someone who had never needed credit before — had the same fair shot as anyone else. The number spoke for itself.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">FICO 8: The Standard for Over 15 Years</h2>
                <p>FICO 8 was released in <strong className="text-[#f0f2f7]">2009</strong> and quickly became the most widely used credit scoring model in America.</p>
                <p>Most credit cards, auto loans, and personal loans still use FICO 8 today.</p>
                <p>Here&apos;s what it looks at:</p>
                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-2 my-4">
                  {[
                    ["Payment History", "35%", "Have you paid your bills on time?"],
                    ["Amounts Owed", "30%", "How much of your available credit are you using?"],
                    ["Length of Credit History", "15%", "How long have your accounts been open?"],
                    ["Credit Mix", "10%", "Do you have different types of credit?"],
                    ["New Credit", "10%", "Have you applied for new credit recently?"],
                  ].map(([label, pct, desc]) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="text-[#4f7cff] font-bold text-sm w-10 flex-shrink-0">{pct}</span>
                      <div>
                        <span className="text-[#f0f2f7] text-sm font-medium">{label}</span>
                        <span className="text-[#8892a4] text-sm"> — {desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p>Think of FICO 8 as a <strong className="text-[#f0f2f7]">photograph</strong>.</p>
                <p>It captures one moment in time — your credit situation right now.</p>
                <p>If you have a high balance today, it hurts your score today. If you pay it down tomorrow, your score improves. Simple and direct.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">FICO 10T: The Evolution</h2>
                <p>FICO 10T was introduced in <strong className="text-[#f0f2f7]">2020</strong>.</p>
                <p>The &quot;T&quot; stands for <strong className="text-[#f0f2f7]">Trended Data</strong>.</p>
                <p>While FICO 8 takes a snapshot, FICO 10T watches a <strong className="text-[#f0f2f7]">movie</strong>.</p>
                <p>It looks at your last <strong className="text-[#f0f2f7]">24 months</strong> of payment behavior. Not just where you are today — but where you&apos;ve been going.</p>
                <p>Are your balances going down consistently? That&apos;s a green flag. It shows you&apos;re making real progress.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Same Person, Two Different Stories</h2>
                <p>Imagine two people. Both have the same FICO 8 score: <strong className="text-[#f0f2f7]">680</strong>.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-[rgba(6,214,160,0.05)] border border-[rgba(6,214,160,0.15)] rounded-xl p-5">
                    <p className="text-[#06d6a0] font-bold text-sm mb-2">Person A ↗</p>
                    <p className="text-sm text-[#8892a4]">Had a $5,000 balance two years ago. Today it&apos;s $2,000. They&apos;ve been consistently paying it down.</p>
                    <p className="text-[#06d6a0] text-sm font-medium mt-2">FICO 10T: Goes up ✅</p>
                  </div>
                  <div className="bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.15)] rounded-xl p-5">
                    <p className="text-[#f43f5e] font-bold text-sm mb-2">Person B ↘</p>
                    <p className="text-sm text-[#8892a4]">Had a $1,000 balance two years ago. Today it&apos;s $2,000. The balance has been growing month after month.</p>
                    <p className="text-[#f43f5e] text-sm font-medium mt-2">FICO 10T: Goes down ⚠️</p>
                  </div>
                </div>
                <p>FICO 8 sees them the same. Both: 680.</p>
                <p>FICO 10T sees something different. Same snapshot. Very different movies.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Who Uses Which Model?</h2>
                <p><strong className="text-[#f0f2f7]">FICO 8</strong> is still the most common for credit cards and many auto loans.</p>
                <p><strong className="text-[#f0f2f7]">FICO 10T</strong> is being adopted by <strong className="text-[#f0f2f7]">Fannie Mae and Freddie Mac</strong> — the two largest mortgage buyers in the US.</p>
                <p>If you&apos;re planning to buy a home in the next few years, your 24-month behavior matters more than ever.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Good News: The Same Actions Improve Both Scores</h2>
                <p>The behaviors that help FICO 8 also help FICO 10T — and often help FICO 10T even more.</p>
                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-2 my-4">
                  {["Paying on time every month", "Reducing your balances consistently", "Not maxing out your cards", "Avoiding too many new credit applications"].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm">
                      <span className="text-[#06d6a0]">✅</span>
                      <span className="text-[#c8d0dc]">{item}</span>
                    </div>
                  ))}
                </div>
                <p>If you start making good financial moves today, FICO 10T will reward you over time. Every month of good behavior adds up.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Takeaway</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Your credit score is not a judgment of who you are. It&apos;s a snapshot of your recent financial behavior — and behavior can change.</p>
                <p className="mt-3">FICO 8 shows where you are today. FICO 10T shows the direction you&apos;re heading.</p>
                <p className="mt-2">Focus on the direction. Make consistent moves. The score will follow.</p>
              </section>
            </>
          )}

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">
            {isEs ? "¿Quieres ver tus dos puntajes ahora?" : "Want to see both your scores right now?"}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {isEs
              ? "Usa nuestro Analizador FICO Dual gratuito — estima ambos puntajes lado a lado."
              : "Use our free Dual FICO Analyzer — it estimates both scores side by side."}
          </p>
          <a href="/tools" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {isEs ? "Probar las Herramientas Gratis" : "Try the Tools Free"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl">
          <p className="text-[11px] text-[#8892a4] leading-relaxed">
            ⚠️ {isEs
              ? "ScoreMotive es una herramienta educativa. Los resultados son estimaciones y no reemplazan un reporte oficial de las agencias de crédito. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes."
              : "ScoreMotive is an educational tool. Results are estimates and do not replace a report from an official credit bureau. Always consult a Certified Financial Planner (CFP) before making major financial decisions."}
          </p>
        </div>

      </article>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-6 px-6 mt-8">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">© 2025 ScoreMotive</span>
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
