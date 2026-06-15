"use client";
import { useState } from "react";

export default function DebtArticlePage() {
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
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(6,214,160,0.1)] text-[#06d6a0]">
              {isEs ? "Deudas" : "Debt"}
            </span>
            <span className="text-[11px] text-[#8892a4]">June 2026 · 7 {isEs ? "min lectura" : "min read"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {isEs
              ? "Avalancha vs Bola de Nieve: Cuál Liquida Deudas Más Rápido"
              : "Debt Avalanche vs Debt Snowball: Which Pays Off Debt Faster"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {isEs
              ? "Si tienes varias deudas, la pregunta no es solo cómo pagarlas — sino en qué orden. La respuesta puede ahorrarte miles de dólares."
              : "If you have multiple debts, the question isn't just how to pay them — it's in what order. The answer can save you thousands of dollars."}
          </p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">

          {isEs ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Problema con Tener Varias Deudas</h2>
                <p>Imagina que tienes cuatro deudas. Cada mes pagas el mínimo en todas.</p>
                <p>¿Qué pasa? Los intereses siguen acumulándose. Los balances apenas bajan. Sientes que estás corriendo en círculos.</p>
                <p>El problema no es que tengas deudas — el problema es la estrategia.</p>
                <p>La mayoría de las personas distribuye cualquier dinero extra entre todas sus deudas al mismo tiempo. Un poco aquí, un poco allá.</p>
                <p>Eso parece justo. Pero matemáticamente, es la forma más lenta y costosa de salir de deudas.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">La Regla Más Importante: Enfócate en Una Deuda a la Vez</h2>
                <p>La clave no es pagar todas las deudas un poco más cada mes. La clave es <strong className="text-[#f0f2f7]">atacar una sola deuda con toda la fuerza disponible</strong> mientras pagas el mínimo en las demás.</p>
                <p>¿Por qué funciona esto mejor?</p>
                <p>Porque cuando liquidas una deuda completamente, liberas ese pago mínimo mensual. Ahora tienes más dinero disponible para atacar la siguiente. Y así sucesivamente.</p>
                <p>Los expertos llaman a esto el <strong className="text-[#f0f2f7]">"efecto bola de nieve de pagos"</strong> — cada deuda que eliminas aumenta el poder de ataque sobre la siguiente.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">La Gran Pregunta: ¿Por Cuál Deuda Empezar?</h2>
                <p>Aquí es donde entran las dos estrategias más populares.</p>
                <p>Ambas dicen lo mismo: paga mínimos en todas y ataca una con todo. La diferencia está en <strong className="text-[#f0f2f7]">cuál atacar primero</strong>.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Estrategia 1: La Avalancha (Avalanche)</h2>
                <p>La Avalancha es simple: <strong className="text-[#f0f2f7]">empieza por la deuda con la tasa de interés más alta</strong>.</p>
                <p>¿Por qué? Porque esa deuda te está costando más dinero cada mes. Mientras no la elimines, sigue drenando tu dinero en intereses.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
                  <p className="text-sm font-bold text-[#f0f2f7] mb-3">Ejemplo con 4 deudas:</p>
                  <div className="space-y-2">
                    {[
                      ["Tarjeta A", "$3,000", "24% APR", "text-[#f43f5e]", "← Ataca primero (tasa más alta)"],
                      ["Tarjeta B", "$5,000", "18% APR", "text-[#8892a4]", "← Mínimo por ahora"],
                      ["Préstamo auto", "$8,000", "12% APR", "text-[#8892a4]", "← Mínimo por ahora"],
                      ["Préstamo personal", "$2,000", "8% APR", "text-[#8892a4]", "← Mínimo por ahora"],
                    ].map(([name, balance, rate, color, note]) => (
                      <div key={name} className="flex items-center gap-3 text-sm flex-wrap">
                        <span className="text-[#f0f2f7] w-28">{name}</span>
                        <span className="text-[#8892a4] w-16">{balance}</span>
                        <span className={`font-bold w-16 ${color}`}>{rate}</span>
                        <span className="text-[#8892a4] text-[11px]">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p>Con la Avalancha, liquidas la Tarjeta A primero aunque no sea la más grande. La razón es matemática: su 24% APR te cuesta más por cada dólar de balance que tienes.</p>
                <p><strong className="text-[#f0f2f7]">Resultado: Ahorras más dinero en intereses totales.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Estrategia 2: La Bola de Nieve (Snowball)</h2>
                <p>La Bola de Nieve dice: <strong className="text-[#f0f2f7]">empieza por la deuda con el balance más pequeño</strong>, sin importar la tasa de interés.</p>
                <p>Usando el mismo ejemplo, empezarías por el Préstamo Personal de $2,000 — aunque tenga la tasa más baja.</p>
                <p>¿Por qué haría eso alguien? Por motivación.</p>
                <p>Cuando eliminas una deuda completamente, sientes un logro real. Ese logro te da energía para seguir. Muchas personas que intentan la Avalancha se rinden antes de ver resultados porque la deuda con mayor interés puede ser grande y tarda mucho en desaparecer.</p>
                <p><strong className="text-[#f0f2f7]">Resultado: Victorias rápidas que mantienen la motivación.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Cuál es Mejor Matemáticamente?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-[rgba(79,124,255,0.05)] border border-[rgba(79,124,255,0.15)] rounded-xl p-5">
                    <p className="text-[#4f7cff] font-bold text-sm mb-2">🏔️ Avalancha</p>
                    <ul className="space-y-1 text-sm text-[#8892a4]">
                      <li>✅ Ahorra más dinero en intereses</li>
                      <li>✅ Matemáticamente óptima</li>
                      <li>⚠️ Puede tardar más en ver la primera victoria</li>
                      <li>⚠️ Requiere más disciplina inicial</li>
                    </ul>
                  </div>
                  <div className="bg-[rgba(6,214,160,0.05)] border border-[rgba(6,214,160,0.15)] rounded-xl p-5">
                    <p className="text-[#06d6a0] font-bold text-sm mb-2">⛄ Bola de Nieve</p>
                    <ul className="space-y-1 text-sm text-[#8892a4]">
                      <li>✅ Victoria rápida — primera deuda eliminada pronto</li>
                      <li>✅ Mantiene la motivación</li>
                      <li>⚠️ Puede costar más en intereses totales</li>
                      <li>⚠️ No es la opción más eficiente</li>
                    </ul>
                  </div>
                </div>

                <p>Los estudios muestran que la Avalancha ahorra más dinero en casi todos los escenarios. Pero también muestran que muchas personas abandonan la Avalancha a medio camino.</p>
                <p>¿Cuál es la mejor estrategia? <strong className="text-[#f0f2f7]">La que vayas a seguir hasta el final.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Y Si Tengo 4 Deudas? ¿En Cuántas Me Enfoco?</h2>
                <p>En <strong className="text-[#f0f2f7]">una sola</strong>. Siempre.</p>
                <p>El error más común es dividir el dinero extra entre todas. Eso se siente responsable, pero no es eficiente.</p>
                <p>Piénsalo así: si tienes $200 extra al mes y los divides entre 4 deudas, cada una recibe $50 extra. Impacto mínimo en cada una.</p>
                <p>Si concentras esos $200 en una sola deuda, esa deuda cae mucho más rápido. Cuando la terminas, tienes $200 más su pago mínimo — digamos $250 — para atacar la siguiente. Y así cada vez el ataque se hace más poderoso.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
                  <p className="text-sm font-bold text-[#f0f2f7] mb-3">El orden de ataque (usando Avalancha):</p>
                  <div className="space-y-3">
                    {[
                      ["Paso 1", "Paga mínimos en todo. Ataca Tarjeta A (24%) con todo el extra.", "#4f7cff"],
                      ["Paso 2", "Tarjeta A liquidada. Suma ese pago mínimo al ataque de Tarjeta B (18%).", "#7c3aed"],
                      ["Paso 3", "Tarjeta B liquidada. Ahora ataca el préstamo auto (12%) con aún más poder.", "#06d6a0"],
                      ["Paso 4", "Préstamo auto liquidado. El préstamo personal (8%) cae rápidamente.", "#f59e0b"],
                    ].map(([step, desc, color]) => (
                      <div key={step} className="flex gap-3">
                        <span className="font-bold text-sm flex-shrink-0" style={{ color }}>{step}</span>
                        <p className="text-sm text-[#8892a4]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p>Cada deuda que eliminas libera más poder para la siguiente. Eso es lo que hace al método tan efectivo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Un Tercer Camino: Lo Mejor de Ambos</h2>
                <p>Si tienes una deuda pequeña con balance muy bajo — digamos $400 — puede tener sentido liquidarla primero aunque no sea la de mayor interés.</p>
                <p>¿Por qué? Porque en 2 meses la eliminas, liberas ese pago mínimo y ya puedes concentrarte en la estrategia de Avalancha con más recursos.</p>
                <p>No hay una regla rígida. Conoce tus números, entiende tu motivación, y elige el camino que vas a mantener.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(6,214,160,0.08)] to-transparent border border-[rgba(6,214,160,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Lo Más Importante</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Cualquier estrategia que elijas es infinitamente mejor que no hacer nada.</p>
                <p className="mt-3">Empieza hoy. Elige una deuda. Atácala con todo lo que puedas. Cuando la termines, usa ese dinero liberado para la siguiente.</p>
                <p className="mt-2">El camino puede parecer largo al principio. Pero cada mes que pasa con una buena estrategia te acerca más a la libertad financiera.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Problem with Having Multiple Debts</h2>
                <p>Imagine you have four debts. Every month you pay the minimum on all of them.</p>
                <p>What happens? Interest keeps accumulating. Balances barely move. You feel like you&apos;re running in circles.</p>
                <p>The problem isn&apos;t that you have debt — the problem is the strategy.</p>
                <p>Most people spread any extra money across all their debts at once. A little here, a little there.</p>
                <p>That feels fair. But mathematically, it&apos;s the slowest and most expensive way to get out of debt.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Most Important Rule: Focus on One Debt at a Time</h2>
                <p>The key isn&apos;t to pay all debts a little more each month. The key is to <strong className="text-[#f0f2f7]">attack one single debt with all available force</strong> while paying minimums on the rest.</p>
                <p>Why does this work better?</p>
                <p>Because when you completely pay off one debt, you free up that monthly minimum payment. Now you have more money available to attack the next one. And so on.</p>
                <p>Experts call this the <strong className="text-[#f0f2f7]">"payment snowball effect"</strong> — each debt you eliminate increases your attacking power on the next one.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Big Question: Which Debt to Start With?</h2>
                <p>This is where the two most popular strategies come in.</p>
                <p>Both say the same thing: pay minimums on all and attack one with everything. The difference is <strong className="text-[#f0f2f7]">which one to attack first</strong>.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Strategy 1: The Avalanche</h2>
                <p>The Avalanche is simple: <strong className="text-[#f0f2f7]">start with the debt that has the highest interest rate</strong>.</p>
                <p>Why? Because that debt is costing you the most money every month. Until you eliminate it, it keeps draining your money in interest.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
                  <p className="text-sm font-bold text-[#f0f2f7] mb-3">Example with 4 debts:</p>
                  <div className="space-y-2">
                    {[
                      ["Credit Card A", "$3,000", "24% APR", "text-[#f43f5e]", "← Attack first (highest rate)"],
                      ["Credit Card B", "$5,000", "18% APR", "text-[#8892a4]", "← Minimum for now"],
                      ["Auto loan", "$8,000", "12% APR", "text-[#8892a4]", "← Minimum for now"],
                      ["Personal loan", "$2,000", "8% APR", "text-[#8892a4]", "← Minimum for now"],
                    ].map(([name, balance, rate, color, note]) => (
                      <div key={name} className="flex items-center gap-3 text-sm flex-wrap">
                        <span className="text-[#f0f2f7] w-28">{name}</span>
                        <span className="text-[#8892a4] w-16">{balance}</span>
                        <span className={`font-bold w-16 ${color}`}>{rate}</span>
                        <span className="text-[#8892a4] text-[11px]">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p>With the Avalanche, you pay off Credit Card A first even though it&apos;s not the largest. The reason is mathematical: its 24% APR costs you more per dollar of balance than any other debt.</p>
                <p><strong className="text-[#f0f2f7]">Result: You save the most money in total interest.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Strategy 2: The Snowball</h2>
                <p>The Snowball says: <strong className="text-[#f0f2f7]">start with the debt that has the smallest balance</strong>, regardless of the interest rate.</p>
                <p>Using the same example, you&apos;d start with the $2,000 Personal Loan — even though it has the lowest rate.</p>
                <p>Why would someone do that? Motivation.</p>
                <p>When you completely eliminate a debt, you feel a real accomplishment. That accomplishment gives you energy to keep going. Many people who try the Avalanche give up before seeing results because the highest-interest debt can be large and takes a long time to disappear.</p>
                <p><strong className="text-[#f0f2f7]">Result: Quick wins that maintain motivation.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Which is Mathematically Better?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="bg-[rgba(79,124,255,0.05)] border border-[rgba(79,124,255,0.15)] rounded-xl p-5">
                    <p className="text-[#4f7cff] font-bold text-sm mb-2">🏔️ Avalanche</p>
                    <ul className="space-y-1 text-sm text-[#8892a4]">
                      <li>✅ Saves the most money in interest</li>
                      <li>✅ Mathematically optimal</li>
                      <li>⚠️ May take longer to see first win</li>
                      <li>⚠️ Requires more initial discipline</li>
                    </ul>
                  </div>
                  <div className="bg-[rgba(6,214,160,0.05)] border border-[rgba(6,214,160,0.15)] rounded-xl p-5">
                    <p className="text-[#06d6a0] font-bold text-sm mb-2">⛄ Snowball</p>
                    <ul className="space-y-1 text-sm text-[#8892a4]">
                      <li>✅ Quick win — first debt eliminated soon</li>
                      <li>✅ Maintains motivation</li>
                      <li>⚠️ May cost more in total interest</li>
                      <li>⚠️ Not the most efficient option</li>
                    </ul>
                  </div>
                </div>

                <p>Studies show that the Avalanche saves more money in almost every scenario. But they also show that many people abandon the Avalanche halfway through.</p>
                <p>Which is the best strategy? <strong className="text-[#f0f2f7]">The one you&apos;ll actually stick with until the end.</strong></p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">If I Have 4 Debts, How Many Should I Focus On?</h2>
                <p><strong className="text-[#f0f2f7]">One. Always.</strong></p>
                <p>The most common mistake is splitting extra money between all of them. That feels responsible, but it&apos;s not efficient.</p>
                <p>Think about it this way: if you have $200 extra per month and split it between 4 debts, each one gets $50 extra. Minimal impact on each.</p>
                <p>If you concentrate that $200 on one single debt, that debt falls much faster. When you finish it, you have $200 plus its minimum payment — say $250 — to attack the next one. And each time the attack becomes more powerful.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
                  <p className="text-sm font-bold text-[#f0f2f7] mb-3">The attack order (using Avalanche):</p>
                  <div className="space-y-3">
                    {[
                      ["Step 1", "Pay minimums on everything. Attack Credit Card A (24%) with all extra money.", "#4f7cff"],
                      ["Step 2", "Card A paid off. Add that minimum payment to the attack on Card B (18%).", "#7c3aed"],
                      ["Step 3", "Card B paid off. Now attack the auto loan (12%) with even more power.", "#06d6a0"],
                      ["Step 4", "Auto loan paid off. The personal loan (8%) falls quickly.", "#f59e0b"],
                    ].map(([step, desc, color]) => (
                      <div key={step} className="flex gap-3">
                        <span className="font-bold text-sm flex-shrink-0" style={{ color }}>{step}</span>
                        <p className="text-sm text-[#8892a4]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p>Each debt you eliminate frees more power for the next one. That&apos;s what makes this method so effective.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">A Third Path: The Best of Both</h2>
                <p>If you have a small debt with a very low balance — say $400 — it may make sense to pay it off first even if it&apos;s not the highest interest rate.</p>
                <p>Why? Because in 2 months you eliminate it, free up that minimum payment, and can then focus on the Avalanche strategy with more resources.</p>
                <p>There&apos;s no rigid rule. Know your numbers, understand your motivation, and choose the path you&apos;ll actually maintain.</p>
              </section>

              <section className="bg-gradient-to-br from-[rgba(6,214,160,0.08)] to-transparent border border-[rgba(6,214,160,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Takeaway</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Any strategy you choose is infinitely better than doing nothing.</p>
                <p className="mt-3">Start today. Pick one debt. Attack it with everything you can. When you finish it, use that freed money for the next one.</p>
                <p className="mt-2">The road may seem long at first. But every month that passes with a good strategy brings you closer to financial freedom.</p>
              </section>
            </>
          )}

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">
            {isEs ? "¿Quieres ver cuánto puedes ahorrar?" : "Want to see how much you can save?"}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {isEs
              ? "Usa nuestro Acelerador de Deudas gratuito — ingresa tus deudas y ve exactamente cuánto interés ahorras y cuánto tiempo reduces."
              : "Use our free Debt Accelerator — enter your debts and see exactly how much interest you save and how much time you cut."}
          </p>
          <a href="/tools" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#06d6a0] to-[#4f7cff] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
            {isEs ? "Probar el Acelerador de Deudas" : "Try the Debt Accelerator"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-5 bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-xl">
          <p className="text-[11px] text-[#8892a4] leading-relaxed">
            ⚠️ {isEs
              ? "ScoreMotive es una herramienta educativa. Los ejemplos son ilustrativos. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes."
              : "ScoreMotive is an educational tool. Examples are illustrative. Always consult a Certified Financial Planner (CFP) before making major financial decisions."}
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
