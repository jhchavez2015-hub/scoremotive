"use client";
import { useState } from "react";

export default function PlatformsArticlePage() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const isEs = lang === "es";

  const platforms = [
    {
      name: "Experian Boost",
      burós: "Experian",
      renta: true,
      servicios: true,
      precio: isEs ? "Gratis" : "Free",
      afiliado: true,
      destacado: isEs ? "Mejor opción gratuita para servicios" : "Best free option for utility bills",
      color: "#4f7cff",
      bg: "rgba(79,124,255,0.05)",
      border: "rgba(79,124,255,0.15)",
      descEs: "Conecta tu cuenta bancaria y Experian detecta automáticamente tus pagos de luz, agua, teléfono y servicios de streaming. Solo afecta tu reporte de Experian, pero es completamente gratis y sin pasos complicados.",
      descEn: "Connect your bank account and Experian automatically detects your utility, water, phone, and streaming payments. Only affects your Experian report, but it's completely free with no complicated steps.",
      proEs: ["Completamente gratis", "Sin necesidad de que el arrendador participe", "Reporta historial de hasta 2 años gratis", "Setup en menos de 5 minutos"],
      proEn: ["Completely free", "No landlord participation required", "Reports up to 2 years of history free", "Setup in under 5 minutes"],
      contraEs: ["Solo reporta a Experian — no a Equifax ni TransUnion", "No sirve para hipotecas que usan FICO 2, 4 o 5"],
      contraEn: ["Only reports to Experian — not Equifax or TransUnion", "Doesn't help for mortgages using FICO 2, 4, or 5"],
    },
    {
      name: "Self",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: true,
      precio: isEs ? "Gratis (renta) / $6.95/mes (servicios)" : "Free (rent) / $6.95/mo (utilities)",
      afiliado: true,
      destacado: isEs ? "Más completo — renta + servicios + tarjeta asegurada" : "Most complete — rent + utilities + secured card",
      color: "#06d6a0",
      bg: "rgba(6,214,160,0.05)",
      border: "rgba(6,214,160,0.15)",
      descEs: "Self es una de las pocas plataformas que reporta renta a los tres burós de forma gratuita. Por $6.95 al mes también reporta servicios y teléfono a TransUnion. Además ofrece cuentas de construcción de crédito y una tarjeta asegurada.",
      descEn: "Self is one of the few platforms that reports rent to all three bureaus for free. For $6.95/month it also reports utilities and phone to TransUnion. It also offers credit builder accounts and a secured card.",
      proEs: ["Renta gratis a los 3 burós", "Historial de hasta 24 meses por $49.95 único", "Ecosistema completo de construcción de crédito", "Sin verificación de crédito para registrarse"],
      proEn: ["Free rent reporting to all 3 bureaus", "Up to 24 months of history for a one-time $49.95", "Complete credit-building ecosystem", "No credit check to sign up"],
      contraEs: ["Servicios solo reportan a TransUnion (plan de pago)", "No tiene herramientas de análisis de crédito personalizadas"],
      contraEn: ["Utilities only report to TransUnion (paid plan)", "No personalized credit analysis tools"],
    },
    {
      name: "Kikoff",
      burós: "Equifax + TransUnion",
      renta: true,
      servicios: true,
      precio: isEs ? "Desde $5/mes" : "From $5/mo",
      afiliado: true,
      destacado: isEs ? "Ideal para principiantes — renta + línea de crédito" : "Ideal for beginners — rent + credit line",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.05)",
      border: "rgba(124,58,237,0.15)",
      descEs: "Kikoff combina reporte de renta con una línea de crédito sin interés, lo que te da dos fuentes de historial positivo al mismo tiempo. El plan premium reporta renta a Equifax y servicios a TransUnion.",
      descEn: "Kikoff combines rent reporting with a no-interest credit line, giving you two sources of positive history at the same time. The premium plan reports rent to Equifax and utilities to TransUnion.",
      proEs: ["Dos fuentes de crédito en una plataforma", "Sin consulta de crédito para registrarse", "Historial de hasta 24 meses por $50 único", "App intuitiva y fácil de usar"],
      proEn: ["Two credit sources on one platform", "No hard credit pull to sign up", "Up to 24 months of history for one-time $50", "Intuitive, easy-to-use app"],
      contraEs: ["Renta solo reporta a Equifax (no a los 3 burós)", "Requiere plan premium para el reporte de renta"],
      contraEn: ["Rent only reports to Equifax (not all 3 bureaus)", "Requires premium plan for rent reporting"],
    },
    {
      name: "Boom",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: false,
      precio: isEs ? "Gratis / $25 historial pasado" : "Free / $25 past history",
      afiliado: true,
      destacado: isEs ? "Mejor relación precio-valor para los 3 burós" : "Best value for all 3 bureaus",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.05)",
      border: "rgba(245,158,11,0.15)",
      descEs: "Boom reporta tu renta y pagos de teléfono a los tres burós de forma gratuita. Por $25 único puedes agregar hasta 24 meses de historial pasado. No requiere que tu arrendador participe.",
      descEn: "Boom reports your rent and phone payments to all three bureaus for free. For a one-time $25 you can add up to 24 months of past history. No landlord participation required.",
      proEs: ["Gratis para pagos actuales", "Reporta a los 3 burós", "Historial pasado de 24 meses por solo $25", "No requiere participación del arrendador"],
      proEn: ["Free for ongoing payments", "Reports to all 3 bureaus", "24 months of past history for just $25", "No landlord participation required"],
      contraEs: ["No reporta servicios de electricidad ni agua", "Funcionalidades más limitadas que Self"],
      contraEn: ["Does not report electricity or water utilities", "More limited features than Self"],
    },
    {
      name: "RentReporters",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: false,
      precio: isEs ? "De pago (mensual o anual)" : "Paid (monthly or annual)",
      afiliado: true,
      destacado: isEs ? "La más antigua y probada — 40 puntos en 10 días" : "The oldest and most proven — 40 points in 10 days",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.05)",
      border: "rgba(244,63,94,0.15)",
      descEs: "RentReporters es una de las plataformas más antiguas del mercado. Reporta a los tres burós y permite incluir pagos pasados. Sus usuarios reportan un promedio de 40 puntos de aumento en los primeros 10 días.",
      descEn: "RentReporters is one of the oldest platforms in the market. Reports to all three bureaus and allows past payments to be included. Users report an average 40-point increase in the first 10 days.",
      proEs: ["Track record probado desde 2006", "Reporta a los 3 burós", "Incluye historial pasado en el plan", "Promedio de +40 puntos en 10 días"],
      proEn: ["Proven track record since 2006", "Reports to all 3 bureaus", "Past history included in plan", "Average +40 points in 10 days"],
      contraEs: ["Tiene costo mensual o anual", "Solo reporta renta — no servicios ni teléfono"],
      contraEn: ["Monthly or annual fee required", "Only reports rent — not utilities or phone"],
    },
    {
      name: "Piñata",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: false,
      precio: isEs ? "Gratis / $4.95/mes (Plus)" : "Free / $4.95/mo (Plus)",
      afiliado: false,
      destacado: isEs ? "Única con sistema de recompensas por pagar a tiempo" : "The only one with rewards for on-time payments",
      color: "#06d6a0",
      bg: "rgba(6,214,160,0.05)",
      border: "rgba(6,214,160,0.15)",
      descEs: "Piñata agrega una capa de gamificación al reporte de renta: acumulas puntos por cada pago puntual y los canjas por tarjetas de regalo o productos de construcción de crédito. El plan básico es gratuito.",
      descEn: "Piñata adds a gamification layer to rent reporting: you earn points for every on-time payment and redeem them for gift cards or credit-building products. The basic plan is free.",
      proEs: ["Plan básico gratuito a los 3 burós", "Sistema de recompensas único en el mercado", "Historial pasado disponible en plan Plus", "Educación financiera incluida"],
      proEn: ["Free basic plan to all 3 bureaus", "Unique rewards system in the market", "Past history available in Plus plan", "Financial education included"],
      contraEs: ["Solo reporta renta — no servicios", "Recompensas pueden distraer del objetivo principal"],
      contraEn: ["Only reports rent — not utilities", "Rewards may distract from the main goal"],
    },
    {
      name: "WalletHub",
      burós: "TransUnion",
      renta: true,
      servicios: true,
      precio: isEs ? "Gratis" : "Free",
      afiliado: true,
      destacado: isEs ? "Gratis con análisis de crédito personalizado incluido" : "Free with personalized credit analysis included",
      color: "#4f7cff",
      bg: "rgba(79,124,255,0.05)",
      border: "rgba(79,124,255,0.15)",
      descEs: "WalletHub reporta renta y servicios a TransUnion de forma gratuita e incluye herramientas de análisis de crédito y recomendaciones personalizadas para mejorar tu puntaje.",
      descEn: "WalletHub reports rent and utilities to TransUnion for free and includes credit analysis tools and personalized recommendations to improve your score.",
      proEs: ["Completamente gratis", "Reporta renta y servicios", "Análisis de crédito personalizado incluido", "Sin cargos ocultos"],
      proEn: ["Completely free", "Reports rent and utilities", "Personalized credit analysis included", "No hidden fees"],
      contraEs: ["Solo reporta a TransUnion — no a Equifax ni Experian", "Cobertura limitada de burós"],
      contraEn: ["Only reports to TransUnion — not Equifax or Experian", "Limited bureau coverage"],
    },
    {
      name: "LevelCredit",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: true,
      precio: isEs ? "De pago" : "Paid",
      afiliado: false,
      destacado: isEs ? "La más completa para servicios — teléfono, streaming y más" : "Most complete for bills — phone, streaming and more",
      color: "#7c3aed",
      bg: "rgba(124,58,237,0.05)",
      border: "rgba(124,58,237,0.15)",
      descEs: "LevelCredit va más allá de la renta — reporta teléfono, servicios públicos, Netflix, Spotify y otros pagos recurrentes a los tres burós. Es la opción más completa para personas con historial delgado.",
      descEn: "LevelCredit goes beyond rent — it reports phone, utilities, Netflix, Spotify, and other recurring payments to all three bureaus. It's the most complete option for people with thin credit files.",
      proEs: ["Reporta más tipos de pagos que cualquier otra", "Reporta a los 3 burós", "Historial de hasta 24 meses disponible", "Ideal para thin file"],
      proEn: ["Reports more payment types than any other", "Reports to all 3 bureaus", "Up to 24 months of history available", "Ideal for thin files"],
      contraEs: ["Tiene costo mensual", "Interfaz menos moderna que competidores"],
      contraEn: ["Monthly fee required", "Less modern interface than competitors"],
    },
    {
      name: "Rental Kharma",
      burós: "TransUnion + Equifax",
      renta: true,
      servicios: false,
      precio: isEs ? "$75 pago único" : "$75 one-time fee",
      afiliado: false,
      destacado: isEs ? "Pago único — sin mensualidad" : "One-time payment — no monthly fee",
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.05)",
      border: "rgba(245,158,11,0.15)",
      descEs: "Rental Kharma cobra una tarifa única de $75 para reportar todo tu historial de renta actual a TransUnion y Equifax. Sin mensualidades ni cargos recurrentes.",
      descEn: "Rental Kharma charges a one-time $75 fee to report all your current rent history to TransUnion and Equifax. No monthly fees or recurring charges.",
      proEs: ["Sin mensualidad — pago único", "Reporta todo el historial pasado de la dirección actual", "Ideal para quienes prefieren evitar cargos recurrentes"],
      proEn: ["No monthly fee — one-time payment", "Reports all past history from current address", "Ideal for those who prefer avoiding recurring charges"],
      contraEs: ["No reporta a Experian", "Solo cubre la dirección actual", "No reporta servicios ni teléfono"],
      contraEn: ["Does not report to Experian", "Only covers current address", "Does not report utilities or phone"],
    },
    {
      name: "RentTrack",
      burós: isEs ? "3 burós" : "3 bureaus",
      renta: true,
      servicios: false,
      precio: isEs ? "De pago" : "Paid",
      afiliado: false,
      destacado: isEs ? "Solución integral para arrendadores y arrendatarios" : "Full solution for landlords and tenants",
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.05)",
      border: "rgba(244,63,94,0.15)",
      descEs: "RentTrack está diseñado tanto para arrendadores como para inquilinos. Verifica el pago y lo reporta a los tres burós. Es una opción sólida cuando el arrendador también participa en el proceso.",
      descEn: "RentTrack is designed for both landlords and tenants. It verifies payment and reports to all three bureaus. A solid option when the landlord also participates in the process.",
      proEs: ["Reporta a los 3 burós", "Proceso de verificación robusto", "Ideal cuando el arrendador usa el sistema"],
      proEn: ["Reports to all 3 bureaus", "Robust verification process", "Ideal when landlord uses the system"],
      contraEs: ["Requiere coordinación con el arrendador en algunos casos", "Tiene costo mensual", "Solo reporta renta"],
      contraEn: ["May require landlord coordination in some cases", "Monthly fee required", "Only reports rent"],
    },
  ];

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
              Credit Score
            </span>
            <span className="text-[11px] text-[#8892a4]">June 2026 · 8 {isEs ? "min lectura" : "min read"}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-[-1px] leading-tight mb-4">
            {isEs
              ? "Las 10 Mejores Plataformas para Reportar Renta y Servicios al Buró de Crédito en 2026"
              : "The 10 Best Platforms to Report Rent and Utilities to Credit Bureaus in 2026"}
          </h1>
          <p className="text-[#8892a4] text-lg leading-relaxed font-light">
            {isEs
              ? "Comparamos cada plataforma disponible en USA — cuánto cuestan, qué reportan y por qué algunas vale la pena pagar."
              : "We compare every platform available in the US — what they cost, what they report, and why some are worth paying for."}
          </p>
        </div>

        <div className="h-px bg-white/[0.07] mb-10" />

        <div className="space-y-8 text-[#c8d0dc] leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {isEs ? "¿Vale la Pena Pagar por Reportar tu Renta?" : "Is It Worth Paying to Report Your Rent?"}
            </h2>
            <p>
              {isEs
                ? "La respuesta corta: depende de tu situación. Si tienes crédito limitado o un puntaje por debajo de 650, invertir $5 a $10 al mes en una plataforma de reporte puede traducirse en cientos o miles de dólares en ahorros futuros — en forma de tasas de interés más bajas en préstamos, mejor acceso a apartamentos o mejores condiciones en tarjetas de crédito."
                : "The short answer: it depends on your situation. If you have limited credit or a score below 650, investing $5 to $10 per month in a reporting platform can translate into hundreds or thousands of dollars in future savings — in the form of lower interest rates on loans, better access to apartments, or better credit card terms."}
            </p>
            <p className="mt-3">
              {isEs
                ? "Piénsalo como una inversión. Un punto de interés menos en un préstamo de auto de $20,000 puede ahorrarte más de $1,000 durante la vida del préstamo. Eso hace que $10 al mes por 6 meses — $60 total — sea una de las inversiones financieras más inteligentes que puedes hacer."
                : "Think of it as an investment. One percentage point less in interest on a $20,000 auto loan can save you more than $1,000 over the life of the loan. That makes $10 per month for 6 months — $60 total — one of the smartest financial investments you can make."}
            </p>

            <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 my-4">
              <p className="text-sm font-bold text-[#f0f2f7] mb-3">
                {isEs ? "¿Cuándo tiene sentido pagar?" : "When does it make sense to pay?"}
              </p>
              <div className="space-y-2">
                {(isEs ? [
                  "Tu puntaje está por debajo de 680 y quieres mejorarlo pronto",
                  "Planeas pedir un préstamo de auto o hipoteca en los próximos 12 meses",
                  "Tienes historial de renta pero nunca ha sido reportado",
                  "Quieres reportar a los 3 burós, no solo a uno",
                  "Quieres agregar historial pasado de 12-24 meses de forma retroactiva",
                ] : [
                  "Your score is below 680 and you want to improve it soon",
                  "You plan to apply for an auto loan or mortgage in the next 12 months",
                  "You have rental history that has never been reported",
                  "You want to report to all 3 bureaus, not just one",
                  "You want to add 12-24 months of past history retroactively",
                ]).map((item, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="text-[#06d6a0] flex-shrink-0">✓</span>
                    <span className="text-[#8892a4]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Platform cards */}
          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-6">
              {isEs ? "Comparación Completa de Plataformas" : "Complete Platform Comparison"}
            </h2>
            <div className="space-y-5">
              {platforms.map((p, idx) => (
                <div key={p.name} className="rounded-2xl p-6" style={{ background: p.bg, border: `1px solid ${p.border}` }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-[#f0f2f7] text-lg">#{idx + 1} {p.name}</span>

                      </div>
                      <p className="text-[11px] font-medium" style={{ color: p.color }}>{p.destacado}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-[#8892a4] mb-0.5">{isEs ? "Precio" : "Price"}</p>
                      <p className="text-sm font-bold text-[#f0f2f7]">{p.precio}</p>
                    </div>
                  </div>

                  {/* Quick stats */}
                  <div className="flex gap-3 mb-4 flex-wrap">
                    <span className="text-[10px] px-2 py-1 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>
                      {isEs ? "Burós:" : "Bureaus:"} {p.burós}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${p.renta ? 'bg-[rgba(6,214,160,0.1)] text-[#06d6a0]' : 'bg-[rgba(244,63,94,0.1)] text-[#f43f5e]'}`}>
                      {isEs ? "Renta:" : "Rent:"} {p.renta ? '✓' : '✗'}
                    </span>
                    <span className={`text-[10px] px-2 py-1 rounded-full ${p.servicios ? 'bg-[rgba(6,214,160,0.1)] text-[#06d6a0]' : 'bg-[rgba(244,63,94,0.1)] text-[#f43f5e]'}`}>
                      {isEs ? "Servicios:" : "Utilities:"} {p.servicios ? '✓' : '✗'}
                    </span>
                  </div>

                  <p className="text-sm text-[#8892a4] leading-relaxed mb-4">
                    {isEs ? p.descEs : p.descEn}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-[#06d6a0] uppercase tracking-wide mb-2">
                        {isEs ? "Ventajas" : "Pros"}
                      </p>
                      <ul className="space-y-1">
                        {(isEs ? p.proEs : p.proEn).map((item, i) => (
                          <li key={i} className="flex gap-1.5 text-[11px] text-[#8892a4]">
                            <span className="text-[#06d6a0] flex-shrink-0">+</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#f43f5e] uppercase tracking-wide mb-2">
                        {isEs ? "Limitaciones" : "Cons"}
                      </p>
                      <ul className="space-y-1">
                        {(isEs ? p.contraEs : p.contraEn).map((item, i) => (
                          <li key={i} className="flex gap-1.5 text-[11px] text-[#8892a4]">
                            <span className="text-[#f43f5e] flex-shrink-0">−</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Affiliate placeholder */}
                  {p.afiliado && (
                    <div className="mt-4 pt-3 border-t border-white/[0.05]">
                      {/* AFFILIATE_LINK_PLACEHOLDER: {p.name} */}
                      <span className="text-[10px] text-[#8892a4] opacity-50">
                        {isEs ? "→ Enlace de referido próximamente" : "→ Referral link coming soon"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Which one to choose */}
          <section>
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-4">
              {isEs ? "¿Cuál Deberías Elegir?" : "Which One Should You Choose?"}
            </h2>
            <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl p-5 space-y-3">
              {(isEs ? [
                { caso: "Quieres empezar gratis", rec: "Experian Boost + Self (renta) + WalletHub — las tres son gratuitas y cubren los 3 burós en conjunto." },
                { caso: "Quieres la opción más completa", rec: "Self o LevelCredit — reportan renta, servicios, teléfono y más a múltiples burós." },
                { caso: "Quieres resultados rápidos con historial pasado", rec: "RentReporters o Boom — permiten agregar hasta 24 meses retroactivos." },
                { caso: "Prefieres pago único sin mensualidad", rec: "Rental Kharma ($75) o Boom ($25 por historial pasado)." },
                { caso: "Quieres motivación adicional", rec: "Piñata — acumulas puntos y recompensas por pagar a tiempo." },
                { caso: "Eres nuevo en el crédito y quieres dos fuentes a la vez", rec: "Kikoff — combina reporte de renta con una línea de crédito sin interés." },
              ] : [
                { caso: "You want to start for free", rec: "Experian Boost + Self (rent) + WalletHub — all three are free and together cover all 3 bureaus." },
                { caso: "You want the most complete option", rec: "Self or LevelCredit — report rent, utilities, phone, and more to multiple bureaus." },
                { caso: "You want quick results with past history", rec: "RentReporters or Boom — allow adding up to 24 months retroactively." },
                { caso: "You prefer a one-time payment with no monthly fee", rec: "Rental Kharma ($75) or Boom ($25 for past history)." },
                { caso: "You want extra motivation", rec: "Piñata — earn points and rewards for paying on time." },
                { caso: "You're new to credit and want two sources at once", rec: "Kikoff — combines rent reporting with a no-interest credit line." },
              ]).map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg bg-white/[0.02]">
                  <span className="text-[#4f7cff] font-bold text-sm flex-shrink-0">→</span>
                  <div>
                    <p className="text-sm font-bold text-[#f0f2f7]">{item.caso}</p>
                    <p className="text-sm text-[#8892a4] mt-0.5">{item.rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-[rgba(79,124,255,0.08)] to-transparent border border-[rgba(79,124,255,0.15)] rounded-2xl p-7">
            <h2 className="text-xl font-bold text-[#f0f2f7] mb-3">
              {isEs ? "Lo Más Importante" : "The Takeaway"}
            </h2>
            <p className="text-lg text-[#f0f2f7] font-medium leading-relaxed">
              {isEs
                ? "No existe una plataforma perfecta para todos — existe la perfecta para ti."
                : "There is no perfect platform for everyone — there's the perfect one for you."}
            </p>
            <p className="mt-3">
              {isEs
                ? "Si tienes presupuesto limitado, empieza con las opciones gratuitas y agrega una de pago cuando veas resultados. Si estás a meses de pedir un préstamo importante, invertir en una plataforma que reporte a los 3 burós con historial pasado puede hacer la diferencia entre una tasa del 8% y una del 5%."
                : "If you have a limited budget, start with the free options and add a paid one when you see results. If you're months away from applying for an important loan, investing in a platform that reports to all 3 bureaus with past history can make the difference between an 8% rate and a 5% rate."}
            </p>
            <p className="mt-2">
              {isEs
                ? "Cada pago puntual que ya haces merece contar. Hoy puedes activar eso."
                : "Every on-time payment you already make deserves to count. You can activate that today."}
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-12 bg-[#0d1220] border border-white/[0.07] rounded-2xl p-7 text-center">
          <h3 className="text-lg font-bold text-[#f0f2f7] mb-2">
            {isEs ? "¿Quieres saber cuánto puede subir tu puntaje?" : "Want to know how much your score can improve?"}
          </h3>
          <p className="text-sm text-[#8892a4] mb-5">
            {isEs
              ? "Usa nuestro Analizador FICO Dual gratuito — te muestra tu puntaje estimado en FICO 8 y FICO 10T y qué factores mejorar primero."
              : "Use our free Dual FICO Analyzer — it shows your estimated score in FICO 8 and FICO 10T and which factors to improve first."}
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
              ? "ScoreMotive es una herramienta educativa. Este artículo puede contener enlaces de afiliados en el futuro. Los precios y características de las plataformas pueden cambiar. Verifica siempre la información directamente con cada servicio antes de registrarte. Consulta a un CFP antes de tomar decisiones financieras importantes."
              : "ScoreMotive is an educational tool. This article may contain affiliate links in the future. Platform prices and features may change. Always verify information directly with each service before signing up. Consult a CFP before making major financial decisions."}
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
