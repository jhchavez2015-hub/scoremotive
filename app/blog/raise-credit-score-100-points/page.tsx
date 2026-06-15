"use client";
import { useState } from "react";

export default function RaiseScoreArticlePage() {
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
            <span className="text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full bg-[rgba(245,158,11,0.1)] text-[#f59e0b]">
              {isEs ? "Credit Score" : "Credit Score"}
            </span>
            <span className="text-[11px] text-[#8892a4]">June 2026 · 7 {isEs ? "min lectura" : "min read"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {isEs
              ? "Cómo Subir tu Credit Score 100 Puntos en 6 Meses"
              : "How to Raise Your Credit Score 100 Points in 6 Months"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {isEs
              ? "Un plan de acción basado en cómo FICO realmente calcula tu puntaje. Sin trucos ni atajos — solo los movimientos que realmente funcionan."
              : "An action plan based on how FICO actually calculates your score. No gimmicks or shortcuts — just the moves that actually work."}
          </p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">

          {isEs ? (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Es Posible Subir 100 Puntos en 6 Meses?</h2>
                <p>Sí. Pero depende de dónde estás ahora.</p>
                <p>Si tu puntaje está entre 500 y 650, subir 100 puntos en 6 meses es completamente posible con las acciones correctas.</p>
                <p>Si ya tienes 750 o más, subir 100 puntos es mucho más difícil — los puntajes altos son más difíciles de mover porque ya estás haciendo casi todo bien.</p>
                <p>Lo importante es esto: <strong className="text-[#f0f2f7]">cada punto que subes te abre puertas reales</strong> — mejor tasa en un auto, aprobación para un apartamento, acceso a tarjetas con mejores beneficios.</p>
                <p>Vale la pena el esfuerzo.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Primero: Entiende Cómo se Calcula tu Puntaje</h2>
                <p>FICO no es un misterio. Tiene 5 factores con pesos específicos.</p>
                <p>Conocerlos te dice exactamente dónde enfocar tu energía.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-3">
                  {[
                    ["35%", "Historial de Pagos", "¿Pagas a tiempo? Este es el factor más importante.", "#f43f5e"],
                    ["30%", "Utilización de Crédito", "¿Qué porcentaje de tu límite disponible estás usando?", "#f59e0b"],
                    ["15%", "Antigüedad del Crédito", "¿Cuánto tiempo llevan abiertas tus cuentas?", "#4f7cff"],
                    ["10%", "Diversificación", "¿Tienes diferentes tipos de crédito?", "#7c3aed"],
                    ["10%", "Consultas Recientes", "¿Has solicitado crédito nuevo recientemente?", "#06d6a0"],
                  ].map(([pct, label, desc, color]) => (
                    <div key={label} className="flex gap-3 items-start">
                      <span className="font-black text-sm flex-shrink-0 w-10" style={{ color }}>{pct}</span>
                      <div>
                        <p className="text-sm font-bold text-[#f0f2f7]">{label}</p>
                        <p className="text-sm text-[#8892a4]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p>El 65% de tu puntaje viene solo de los dos primeros factores. Ahí es donde empieza el plan.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">El Plan de Acción: Mes a Mes</h2>

                <div className="space-y-4 my-4">
                  {[
                    {
                      mes: "Mes 1",
                      titulo: "Configura Autopay en Todas tus Cuentas",
                      color: "#4f7cff",
                      bg: "rgba(79,124,255,0.05)",
                      border: "rgba(79,124,255,0.15)",
                      pasos: [
                        "Activa pagos automáticos del mínimo en cada tarjeta y préstamo.",
                        "Un solo pago tardío puede bajar tu puntaje hasta 100 puntos. Esto lo previene.",
                        "Si ya tienes pagos tardíos en el pasado, no puedes borrarlos — pero pueden dejar de afectarte tanto cuando llevas 12+ meses sin nuevos retrasos.",
                      ]
                    },
                    {
                      mes: "Mes 1-2",
                      titulo: "Baja tu Utilización por Debajo del 30%",
                      color: "#f59e0b",
                      bg: "rgba(245,158,11,0.05)",
                      border: "rgba(245,158,11,0.15)",
                      pasos: [
                        "La utilización es cuánto de tu límite total estás usando. Si tienes $10,000 de límite y $4,000 de balance, tu utilización es 40%.",
                        "FICO prefiere que esté por debajo del 30%. Idealmente por debajo del 10%.",
                        "Bajar de 60% a 25% de utilización puede subir tu puntaje 50-80 puntos solo por este cambio.",
                        "Si no puedes pagar el balance de inmediato, solicitar un aumento de límite también baja el porcentaje.",
                      ]
                    },
                    {
                      mes: "Mes 2-3",
                      titulo: "Revisa tu Reporte de Crédito por Errores",
                      color: "#06d6a0",
                      bg: "rgba(6,214,160,0.05)",
                      border: "rgba(6,214,160,0.15)",
                      pasos: [
                        "El 20% de los reportes de crédito tienen errores. Un error puede estar bajando tu puntaje sin que lo sepas.",
                        "Ve a AnnualCreditReport.com — es el sitio oficial del gobierno para obtener tu reporte gratis.",
                        "Revisa cada cuenta: ¿Los balances son correctos? ¿Hay cuentas que no reconoces? ¿Pagos tardíos que no fueron tuyos?",
                        "Si encuentras errores, dispútalos directamente con las agencias (Experian, Equifax, TransUnion). Tienen 30 días para responder.",
                      ]
                    },
                    {
                      mes: "Mes 3-4",
                      titulo: "No Solicites Crédito Nuevo (Por Ahora)",
                      color: "#7c3aed",
                      bg: "rgba(124,58,237,0.05)",
                      border: "rgba(124,58,237,0.15)",
                      pasos: [
                        "Cada vez que solicitas una tarjeta o préstamo, el prestamista hace una 'consulta dura' que puede bajar tu puntaje 5-10 puntos.",
                        "Durante estos 6 meses, evita nuevas solicitudes de crédito a menos que sea absolutamente necesario.",
                        "Las consultas duran 2 años en tu reporte, pero su impacto en el puntaje disminuye después de 12 meses.",
                      ]
                    },
                    {
                      mes: "Mes 4-6",
                      titulo: "Mantén las Cuentas Antiguas Abiertas",
                      color: "#f43f5e",
                      bg: "rgba(244,63,94,0.05)",
                      border: "rgba(244,63,94,0.15)",
                      pasos: [
                        "La antigüedad de tus cuentas afecta el 15% de tu puntaje. Cerrar una tarjeta vieja puede bajarlo.",
                        "Aunque no uses una tarjeta antigua, mantenla abierta. Úsala para una compra pequeña cada 3-4 meses para que no la cancelen por inactividad.",
                        "Si tienes deudas en esa tarjeta, págalas — pero no la cierres.",
                      ]
                    },
                  ].map((item) => (
                    <div key={item.mes} className="rounded-xl p-5" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: item.color, background: `${item.color}20` }}>{item.mes}</span>
                        <h3 className="text-sm font-bold text-[#f0f2f7]">{item.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.pasos.map((paso, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#8892a4]">
                            <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">→</span>
                            <span>{paso}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">¿Qué Esperar en Cada Etapa?</h2>
                <p>El crédito no sube de la noche a la mañana. Pero los cambios llegan más rápido de lo que la mayoría espera.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-3">
                  {[
                    ["Semana 1-2", "Configuras autopay. Tu puntaje no ha cambiado todavía — pero has eliminado el mayor riesgo.", "#8892a4"],
                    ["Mes 1-2", "Si bajaste tu utilización, el puntaje empieza a subir. Los reportes se actualizan mensualmente.", "#4f7cff"],
                    ["Mes 2-3", "Si encontraste y disputaste errores, las correcciones empiezan a reflejarse.", "#7c3aed"],
                    ["Mes 3-4", "Los pagos a tiempo acumulados empiezan a tener peso. El patrón positivo se establece.", "#06d6a0"],
                    ["Mes 5-6", "Resultado visible. Dependiendo de tu punto de partida, 50-100+ puntos de mejora es alcanzable.", "#f59e0b"],
                  ].map(([tiempo, desc, color]) => (
                    <div key={tiempo} className="flex gap-3 items-start">
                      <span className="text-[11px] font-bold flex-shrink-0 w-20" style={{ color }}>{tiempo}</span>
                      <p className="text-sm text-[#8892a4]">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Lo Que No Funciona</h2>
                <p>Hay muchas promesas falsas sobre crédito. Vale la pena saber qué evitar.</p>
                <div className="bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.15)] rounded-xl p-5 my-4 space-y-2">
                  {[
                    {t: "Servicios que prometen 'reparar' tu crédito en días", d: "Nadie puede borrar legalmente información negativa verdadera. Si es correcta, permanece 7 años. Ahorra ese dinero."},
                    {t: "Pagar para que alguien dispute errores", d: "Puedes hacerlo tú mismo gratis en AnnualCreditReport.com. El proceso es el mismo — solo que no pagas un intermediario."},
                    {t: "Cerrar una tarjeta con balance cero para 'empezar de nuevo'", d: "Dos problemas: primero, pierdes ese límite disponible lo que sube tu porcentaje de utilización. Segundo, si era una cuenta antigua, pierdes antigüedad de crédito. Págala — pero mantenla abierta."},
                    {t: "Pagar todo el balance antes de la fecha de cierre y no usar la tarjeta nunca", d: "Un balance reportado de $0 puede en realidad perjudicarte. FICO prefiere ver utilización baja pero activa — alrededor del 1-9%. Además, los emisores pueden cancelar tarjetas inactivas sin aviso, lo que baja tu puntaje. Úsala para algo pequeño cada mes y págala completa."},
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[rgba(244,63,94,0.03)] border border-[rgba(244,63,94,0.1)]">
                      <div className="flex gap-2 text-sm mb-1">
                        <span className="text-[#f43f5e] flex-shrink-0 font-bold">✗</span>
                        <span className="text-[#f0f2f7] font-medium">{item.t}</span>
                      </div>
                      <p className="text-sm text-[#8892a4] ml-4">{item.d}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-[rgba(245,158,11,0.08)] to-transparent border border-[rgba(245,158,11,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Lo Más Importante</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Mejorar tu crédito no requiere ser perfecto. Requiere ser consistente.</p>
                <p className="mt-3">Pagar a tiempo, bajar balances, no pedir crédito innecesario. Tres hábitos simples que con el tiempo transforman cualquier puntaje.</p>
                <p className="mt-2">Empieza hoy. En 6 meses, tu yo del futuro te lo agradecerá.</p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">Is It Really Possible to Raise 100 Points in 6 Months?</h2>
                <p>Yes. But it depends on where you&apos;re starting from.</p>
                <p>If your score is between 500 and 650, raising 100 points in 6 months is completely possible with the right actions.</p>
                <p>If you already have 750 or above, raising 100 points is much harder — high scores are more difficult to move because you&apos;re already doing almost everything right.</p>
                <p>The important thing is this: <strong className="text-[#f0f2f7]">every point you gain opens real doors</strong> — a better rate on a car loan, approval for an apartment, access to cards with better benefits.</p>
                <p>It&apos;s worth the effort.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">First: Understand How Your Score is Calculated</h2>
                <p>FICO isn&apos;t a mystery. It has 5 factors with specific weights.</p>
                <p>Knowing them tells you exactly where to focus your energy.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-3">
                  {[
                    ["35%", "Payment History", "Do you pay on time? This is the most important factor.", "#f43f5e"],
                    ["30%", "Credit Utilization", "What percentage of your available limit are you using?", "#f59e0b"],
                    ["15%", "Length of Credit History", "How long have your accounts been open?", "#4f7cff"],
                    ["10%", "Credit Mix", "Do you have different types of credit?", "#7c3aed"],
                    ["10%", "Recent Inquiries", "Have you applied for new credit recently?", "#06d6a0"],
                  ].map(([pct, label, desc, color]) => (
                    <div key={label} className="flex gap-3 items-start">
                      <span className="font-black text-sm flex-shrink-0 w-10" style={{ color }}>{pct}</span>
                      <div>
                        <p className="text-sm font-bold text-[#f0f2f7]">{label}</p>
                        <p className="text-sm text-[#8892a4]">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p>65% of your score comes from just the first two factors. That&apos;s where the plan starts.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Action Plan: Month by Month</h2>

                <div className="space-y-4 my-4">
                  {[
                    {
                      mes: "Month 1",
                      titulo: "Set Up Autopay on All Your Accounts",
                      color: "#4f7cff",
                      bg: "rgba(79,124,255,0.05)",
                      border: "rgba(79,124,255,0.15)",
                      pasos: [
                        "Enable automatic minimum payments on every card and loan.",
                        "A single late payment can drop your score up to 100 points. This prevents that.",
                        "If you already have late payments in the past, you can't erase them — but they stop affecting you as much once you've had 12+ months with no new late payments.",
                      ]
                    },
                    {
                      mes: "Month 1-2",
                      titulo: "Lower Your Utilization Below 30%",
                      color: "#f59e0b",
                      bg: "rgba(245,158,11,0.05)",
                      border: "rgba(245,158,11,0.15)",
                      pasos: [
                        "Utilization is how much of your total available limit you're using. If you have a $10,000 limit and a $4,000 balance, your utilization is 40%.",
                        "FICO prefers it below 30%. Ideally below 10%.",
                        "Dropping from 60% to 25% utilization can raise your score 50-80 points from this change alone.",
                        "If you can't pay the balance immediately, requesting a credit limit increase also lowers your percentage.",
                      ]
                    },
                    {
                      mes: "Month 2-3",
                      titulo: "Check Your Credit Report for Errors",
                      color: "#06d6a0",
                      bg: "rgba(6,214,160,0.05)",
                      border: "rgba(6,214,160,0.15)",
                      pasos: [
                        "20% of credit reports have errors. An error could be dropping your score without you knowing.",
                        "Go to AnnualCreditReport.com — the official government site to get your free report.",
                        "Review each account: Are balances correct? Are there accounts you don't recognize? Late payments that weren't yours?",
                        "If you find errors, dispute them directly with the bureaus (Experian, Equifax, TransUnion). They have 30 days to respond.",
                      ]
                    },
                    {
                      mes: "Month 3-4",
                      titulo: "Don't Apply for New Credit (For Now)",
                      color: "#7c3aed",
                      bg: "rgba(124,58,237,0.05)",
                      border: "rgba(124,58,237,0.15)",
                      pasos: [
                        "Every time you apply for a card or loan, the lender does a 'hard inquiry' that can drop your score 5-10 points.",
                        "During these 6 months, avoid new credit applications unless absolutely necessary.",
                        "Hard inquiries stay on your report for 2 years, but their impact on your score decreases after 12 months.",
                      ]
                    },
                    {
                      mes: "Month 4-6",
                      titulo: "Keep Old Accounts Open",
                      color: "#f43f5e",
                      bg: "rgba(244,63,94,0.05)",
                      border: "rgba(244,63,94,0.15)",
                      pasos: [
                        "Length of credit history affects 15% of your score. Closing an old card can lower it.",
                        "Even if you don't use an old card, keep it open. Use it for a small purchase every 3-4 months so it doesn't get canceled for inactivity.",
                        "If you have debt on that card, pay it off — but don't close it.",
                      ]
                    },
                  ].map((item) => (
                    <div key={item.mes} className="rounded-xl p-5" style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: item.color, background: `${item.color}20` }}>{item.mes}</span>
                        <h3 className="text-sm font-bold text-[#f0f2f7]">{item.titulo}</h3>
                      </div>
                      <ul className="space-y-2">
                        {item.pasos.map((paso, i) => (
                          <li key={i} className="flex gap-2 text-sm text-[#8892a4]">
                            <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">→</span>
                            <span>{paso}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What to Expect at Each Stage</h2>
                <p>Credit doesn&apos;t improve overnight. But changes come faster than most people expect.</p>

                <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4 space-y-3">
                  {[
                    ["Week 1-2", "You set up autopay. Your score hasn't changed yet — but you've eliminated the biggest risk.", "#8892a4"],
                    ["Month 1-2", "If you lowered your utilization, the score starts rising. Reports update monthly.", "#4f7cff"],
                    ["Month 2-3", "If you found and disputed errors, corrections start showing up.", "#7c3aed"],
                    ["Month 3-4", "Accumulated on-time payments start carrying weight. The positive pattern establishes itself.", "#06d6a0"],
                    ["Month 5-6", "Visible results. Depending on your starting point, 50-100+ points of improvement is achievable.", "#f59e0b"],
                  ].map(([tiempo, desc, color]) => (
                    <div key={tiempo} className="flex gap-3 items-start">
                      <span className="text-[11px] font-bold flex-shrink-0 w-20" style={{ color }}>{tiempo}</span>
                      <p className="text-sm text-[#8892a4]">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">What Doesn&apos;t Work</h2>
                <p>There are many false promises about credit. It&apos;s worth knowing what to avoid.</p>
                <div className="bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.15)] rounded-xl p-5 my-4 space-y-2">
                  {[
                    {t: "Services that promise to 'repair' your credit in days", d: "No one can legally erase accurate negative information. If it's true, it stays for 7 years. Save your money."},
                    {t: "Paying someone to dispute errors", d: "You can do it yourself for free at AnnualCreditReport.com. The process is the same — you just don't pay a middleman."},
                    {t: "Closing a zero-balance card to 'start fresh'", d: "Two problems: first, you lose that available credit limit which raises your utilization percentage. Second, if it was an old account, you lose credit history age. Pay it off — but keep it open."},
                    {t: "Paying your full balance before the closing date and never using the card", d: "A $0 reported balance can actually hurt. FICO prefers to see low but active utilization — around 1-9%. Also, issuers may cancel inactive cards without warning, which drops your score. Use the card for something small each month and pay it in full."},
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[rgba(244,63,94,0.03)] border border-[rgba(244,63,94,0.1)]">
                      <div className="flex gap-2 text-sm mb-1">
                        <span className="text-[#f43f5e] flex-shrink-0 font-bold">✗</span>
                        <span className="text-[#f0f2f7] font-medium">{item.t}</span>
                      </div>
                      <p className="text-sm text-[#8892a4] ml-4">{item.d}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-gradient-to-br from-[rgba(245,158,11,0.08)] to-transparent border border-[rgba(245,158,11,0.15)] rounded-2xl p-7">
                <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">The Takeaway</h2>
                <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">Improving your credit doesn&apos;t require being perfect. It requires being consistent.</p>
                <p className="mt-3">Pay on time, lower balances, don&apos;t apply for unnecessary credit. Three simple habits that over time transform any score.</p>
                <p className="mt-2">Start today. In 6 months, your future self will thank you.</p>
              </section>
            </>
          )}

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">
            {isEs ? "¿Quieres ver tu puntaje FICO estimado ahora?" : "Want to see your estimated FICO score right now?"}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {isEs
              ? "Usa nuestro Analizador FICO Dual gratuito — responde 5 preguntas y ve dónde estás parado en ambos modelos."
              : "Use our free Dual FICO Analyzer — answer 5 questions and see where you stand on both models."}
          </p>
          <a href="/tools" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f59e0b] to-[#4f7cff] text-white px-8 py-3 rounded-xl text-sm font-medium hover:opacity-90 transition-all">
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
              ? "ScoreMotive es una herramienta educativa. Los resultados y tiempos son estimaciones. Consulta siempre a un Planificador Financiero Certificado (CFP) antes de tomar decisiones financieras importantes."
              : "ScoreMotive is an educational tool. Results and timelines are estimates. Always consult a Certified Financial Planner (CFP) before making major financial decisions."}
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
