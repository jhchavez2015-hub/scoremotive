"use client";
import { useState, useEffect } from 'react';
import {
  CreditCard, TrendingDown, DollarSign, Plus, Trash2, FileText,
  BarChart3, Zap, Lightbulb, Target, Globe, AlertTriangle,
  ShieldAlert, CheckCircle2, RotateCcw, Download, ChevronRight,
  Info, TrendingUp, Wallet
} from 'lucide-react';

const translations: Record<string, Record<string, string>> = {
  es: {
    title: "ScoreMotive", version: "V4.5 Hybrid Pro",
    tabFico: "Analizador FICO Dual", tabDeudas: "Acelerador de Deudas",
    configTitle: "Configuración de Perfil Crediticio",
    configSub: "Los cambios en tus deudas afectan la utilización automáticamente.",
    lblHistorial: "1. Historial de Pagos (Payment History)",
    lblUtilizacion: "2. Utilización de Crédito (Amounts Owed)",
    lblAntiguedad: "3. Antigüedad en el Buró (Length of Credit History)",
    lblMix: "4. Diversificación de Líneas (Credit Mix)",
    lblInquiries: "5. Consultas Recientes (New Credit / Inquiries)",
    selDefault: "Selecciona una opción...", calcScore: "Calcular Ambos Modelos",
    resetForm: "Reiniciar Formulario", waitingData: "Esperando datos de entrada",
    waitingSub: "Completa el formulario para generar la auditoría de crédito simultánea.",
    reportTitle: "Auditoría Dual de Puntuación FICO",
    traditionalModel: "FICO Tradicional (8/9)", trendedModel: "FICO 10 T (Tendencial)",
    impactTitle: "Impacto Métrico en Situación Actual",
    strategyTitle: "Estrategia de Optimización Recomendada",
    maxWeight: "Peso Máx.",
    carteraTitle: "Cartera de Pasivos (Tus Deudas)", btnAñadir: "Añadir Deuda",
    lblMonto: "Monto ($)", lblInteres: "Interés (% APR)", lblPagoMin: "Pago Mínimo ($)",
    lblInyeccionMensual: "Inyección de Pago Extra Mensual",
    lblInyeccionUnica: "Inyección de Pago Único (Sola vez)",
    lblPagosLiberados: "Aplicar pagos mínimos liberados a la siguiente deuda",
    lblPagosLiberadosDesc: "Cuando una deuda se liquida, su pago mínimo se suma automáticamente para atacar la siguiente.",
    btnCalcularDeudas: "Calcular Estrategia de Amortización", btnExportar: "Exportar Reporte",
    alertaAmortizacion: "¡Peligro de Amortización Negativa!",
    alertaAmortizacionDesc: "El pago mínimo ingresado es demasiado bajo en alguna de tus cuentas.",
    footerText: "© 2026 ScoreMotive • Analizador Financiero de Datos Tendenciales",
    footerDisclaimer: "Solo para propósitos educativos. No constituye asesoría financiera.",
    meses: "meses", r_exceptional: "Excepcional", r_verygood: "Muy Bueno",
    r_good: "Bueno", r_fair: "Regular", r_poor: "Pobre",
    h_excelente: "Siempre a tiempo (Historial Limpio)", h_bueno: "Un pago tardío aislado",
    h_regular: "Pagos tardíos frecuentes 30-60 días", h_malo: "Cuentas en Colecciones / Bancarrota",
    u_auto: "Cálculo Automático basado en tus deudas actuales",
    u_bajo: "Excelente: Utilización por debajo del 30%",
    u_mod: "Moderado: Entre el 30% y el 50% de uso",
    u_alto: "Peligro: Uso elevado entre 50% y 90%",
    u_critico: "Crítico: Tarjetas al límite (Maxed out)",
    a_larga: "Mature: Más de 5 años operando", a_media: "Intermediate: Entre 2 y 5 años",
    a_corta: "New: Menos de 2 años en el sistema",
    m_optimo: "Mix Óptimo (Tarjetas + Préstamo Fijo/Auto)",
    m_soloUno: "Solo cuentas de tipo revolving (Tarjetas)",
    i_0: "0 Inquiries en los últimos 6 meses", i_pocas: "Pocas consultas (1 a 3 aplicaciones)",
    i_muchas: "Búsqueda intensiva (Más de 4 consultas)",
    disclaimerTitle: "Descargo de Responsabilidad",
    disclaimerBody1: "ScoreMotive es una herramienta educativa e informativa.",
    disclaimerBody2: "La información NO constituye asesoría financiera, legal, ni fiscal profesional.",
    disclaimerBody3: "Los resultados del Analizador FICO son estimaciones educativas.",
    disclaimerBody4: "Consulta siempre con un asesor financiero certificado (CFP).",
    disclaimerAccept: "Entiendo y acepto los términos",
    disclaimerEducational: "🎓 Solo uso educativo • No es asesoría financiera",
  },
  en: {
    title: "ScoreMotive", version: "V4.5 Hybrid Pro",
    tabFico: "Dual FICO Analyzer", tabDeudas: "Debt Accelerator",
    configTitle: "Credit Profile Configuration",
    configSub: "Changes in your debts will automatically affect credit utilization.",
    lblHistorial: "1. Payment History",
    lblUtilizacion: "2. Credit Utilization (Amounts Owed)",
    lblAntiguedad: "3. Length of Credit History",
    lblMix: "4. Credit Mix",
    lblInquiries: "5. New Credit (Recent Hard Inquiries)",
    selDefault: "Select an option...", calcScore: "Calculate Both Models",
    resetForm: "Reset Form", waitingData: "Waiting for Input Data",
    waitingSub: "Complete the form to generate the simultaneous credit audit.",
    reportTitle: "Dual FICO Score Audit Report",
    traditionalModel: "Traditional FICO (8/9)", trendedModel: "FICO 10 T (Trended Data)",
    impactTitle: "Metric Impact on Current Situation",
    strategyTitle: "Recommended Optimization Strategy",
    maxWeight: "Max Weight",
    carteraTitle: "Liability Portfolio (Your Debts)", btnAñadir: "Add Debt",
    lblMonto: "Amount ($)", lblInteres: "Interest (% APR)", lblPagoMin: "Min Payment ($)",
    lblInyeccionMensual: "Monthly Extra Payment Injection",
    lblInyeccionUnica: "Lump-Sum Single Injection",
    lblPagosLiberados: "Apply freed minimum payments to next debt",
    lblPagosLiberadosDesc: "When a debt is paid off, its minimum payment is added to attack the next one.",
    btnCalcularDeudas: "Calculate Amortization Strategy", btnExportar: "Export Report",
    alertaAmortizacion: "Negative Amortization Hazard!",
    alertaAmortizacionDesc: "The minimum payment entered is too low on one or more accounts.",
    footerText: "© 2026 ScoreMotive • Trended Data Financial Systems",
    footerDisclaimer: "For educational purposes only. Not financial advice.",
    meses: "months", r_exceptional: "Exceptional", r_verygood: "Very Good",
    r_good: "Good", r_fair: "Fair", r_poor: "Poor",
    h_excelente: "Always on time (Clean History)", h_bueno: "An isolated missed payment",
    h_regular: "Frequent 30-60 days late payments", h_malo: "Accounts sent to Collections / Bankruptcy",
    u_auto: "Automatic Calculation based on your current debts",
    u_bajo: "Excellent: Utilization below 30%", u_mod: "Moderate: Between 30% and 50% usage",
    u_alto: "Danger: High usage between 50% and 90%", u_critico: "Critical: Cards maxed out",
    a_larga: "Mature: More than 5 years active", a_media: "Intermediate: Between 2 and 5 years",
    a_corta: "New: Less than 2 years in the system",
    m_optimo: "Optimal Mix (Cards + Installment Loan/Auto)",
    m_soloUno: "Only revolving accounts (Credit Cards only)",
    i_0: "0 Inquiries in the last 6 months", i_pocas: "Few inquiries (1 to 3 applications)",
    i_muchas: "Intensive search (4+ inquiries)",
    disclaimerTitle: "Disclaimer",
    disclaimerBody1: "ScoreMotive is an educational and informational tool.",
    disclaimerBody2: "This app does NOT constitute professional financial, legal, or tax advice.",
    disclaimerBody3: "FICO Analyzer results are educational estimates.",
    disclaimerBody4: "Always consult a Certified Financial Planner (CFP).",
    disclaimerAccept: "I understand and accept the terms",
    disclaimerEducational: "🎓 Educational use only • Not financial advice",
  }
};

interface Debt {
  id: number;
  nombre: string;
  balance: string;
  interesAnual: string;
  pagoMensual: string;
}

interface ScoreReport {
  scoreTradicional: number;
  score10T: number;
  dictamenTradicional: string;
  dictamen10T: string;
  consejos: { titulo: string; detalle: string }[];
  desglose: { nombre: string; trad: number; tend: number; max: number }[];
}

interface DebtResult {
  mesesRegular: number;
  interesesRegular: number;
  mesesAcelerado: number;
  interesesAcelerado: number;
  mesesAhorrados: number;
  dineroAhorrado: number;
  mesesSnowball: number;
  interesesSnowball: number;
  dineroAhorradoSnowball: number;
  ordenAvalanche: string[];
  ordenSnowball: string[];
}

function DisclaimerModal({ lang, onAccept }: { lang: string; onAccept: () => void }) {
  const t = translations[lang];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-b border-amber-500/30 px-6 py-4 flex items-center gap-3">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
            <ShieldAlert className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-amber-300">{t.disclaimerTitle}</h2>
            <p className="text-[10px] text-amber-400/70">{t.disclaimerEducational}</p>
          </div>
        </div>
        <div className="px-6 py-5 space-y-3 max-h-80 overflow-y-auto">
          {[t.disclaimerBody1, t.disclaimerBody2, t.disclaimerBody3, t.disclaimerBody4].map((text, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-400 mt-0.5">{i + 1}</span>
              <p className="text-[12px] text-slate-300 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="px-6 pb-5 pt-2 border-t border-slate-800">
          <button onClick={onAccept} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-900 font-bold py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" />{t.disclaimerAccept}
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score, label, color }: { score: number; label: string; color: string }) {
  const getGradient = () => {
    if (score >= 800) return 'from-emerald-500 to-teal-500';
    if (score >= 740) return 'from-teal-500 to-cyan-500';
    if (score >= 670) return 'from-amber-500 to-yellow-500';
    if (score >= 580) return 'from-orange-500 to-amber-500';
    return 'from-rose-500 to-red-500';
  };
  const getArcColor = () => {
    if (score >= 800) return '#10b981';
    if (score >= 740) return '#14b8a6';
    if (score >= 670) return '#f59e0b';
    if (score >= 580) return '#f97316';
    return '#f43f5e';
  };
  const pct = Math.min(100, Math.max(0, ((score - 300) / 550) * 100));
  const radius = 36;
  const circ = 2 * Math.PI * radius;
  const dash = (pct / 100) * circ * 0.75;
  return (
    <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex flex-col items-center">
      <span className={`text-[10px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
      <div className="relative mt-2">
        <svg width="100" height="70" viewBox="0 0 100 70">
          <path d="M 10 65 A 40 40 0 0 1 90 65" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
          <path d="M 10 65 A 40 40 0 0 1 90 65" fill="none" stroke={getArcColor()} strokeWidth="8"
            strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
          <span className={`text-3xl font-black bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`}>{score}</span>
        </div>
      </div>
    </div>
  );
}

async function exportarPDF(result: DebtResult, debts: Debt[], lang: string, pagoExtra: string, pagoUnico: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const isEs = lang === 'es';
  const fecha = new Date().toLocaleDateString(isEs ? 'es-US' : 'en-US');

  // Header
  doc.setFillColor(8, 11, 18);
  doc.rect(0, 0, 210, 297, 'F');
  doc.setTextColor(240, 242, 247);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ScoreMotive', 20, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(136, 146, 164);
  doc.text(isEs ? 'Informe de Estrategia de Deudas' : 'Debt Strategy Report', 20, 28);
  doc.text(`${isEs ? 'Fecha' : 'Date'}: ${fecha}`, 20, 35);

  // Line
  doc.setDrawColor(79, 124, 255);
  doc.line(20, 40, 190, 40);

  // Debts table
  doc.setTextColor(240, 242, 247);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Tus Deudas' : 'Your Debts', 20, 50);

  let y = 57;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(136, 146, 164);
  doc.text(isEs ? 'Nombre' : 'Name', 20, y);
  doc.text(isEs ? 'Balance' : 'Balance', 80, y);
  doc.text('APR', 120, y);
  doc.text(isEs ? 'Pago Mín.' : 'Min. Payment', 150, y);
  y += 5;
  doc.setDrawColor(51, 65, 85);
  doc.line(20, y, 190, y);
  y += 5;

  doc.setTextColor(240, 242, 247);
  debts.forEach(d => {
    doc.text(d.nombre, 20, y);
    doc.text(`$${parseFloat(d.balance).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 80, y);
    doc.text(`${d.interesAnual}%`, 120, y);
    doc.text(`$${parseFloat(d.pagoMensual).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 150, y);
    y += 7;
  });

  y += 3;
  doc.setTextColor(136, 146, 164);
  doc.text(`${isEs ? 'Pago extra mensual' : 'Monthly extra payment'}: $${parseFloat(pagoExtra).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 20, y);
  y += 6;
  doc.text(`${isEs ? 'Pago único' : 'Lump-sum payment'}: $${parseFloat(pagoUnico).toLocaleString('en-US', { maximumFractionDigits: 0 })}`, 20, y);

  y += 10;
  doc.setDrawColor(79, 124, 255);
  doc.line(20, y, 190, y);
  y += 8;

  // Results comparison
  doc.setTextColor(240, 242, 247);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Comparación de Estrategias' : 'Strategy Comparison', 20, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  const cols = [
    { label: isEs ? 'Sin Estrategia' : 'No Strategy', color: [244, 63, 94] as [number,number,number], meses: result.mesesRegular, interes: result.interesesRegular, ahorro: 0, orden: [] },
    { label: isEs ? 'AVALANCHA' : 'AVALANCHE', color: [79, 124, 255] as [number,number,number], meses: result.mesesAcelerado, interes: result.interesesAcelerado, ahorro: result.dineroAhorrado, orden: result.ordenAvalanche },
    { label: isEs ? 'BOLA DE NIEVE' : 'SNOWBALL', color: [6, 214, 160] as [number,number,number], meses: result.mesesSnowball, interes: result.interesesSnowball, ahorro: result.dineroAhorradoSnowball, orden: result.ordenSnowball },
  ];

  cols.forEach((col, i) => {
    const x = 20 + i * 60;
    doc.setTextColor(...col.color);
    doc.setFont('helvetica', 'bold');
    doc.text(col.label, x, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(136, 146, 164);
    doc.text(`${col.meses} ${isEs ? 'meses' : 'months'}`, x, y + 7);
    doc.text(`$${col.interes.toLocaleString('en-US', { maximumFractionDigits: 0 })} ${isEs ? 'interés' : 'interest'}`, x, y + 13);
    if (col.ahorro > 0) {
      doc.setTextColor(6, 214, 160);
      doc.text(`${isEs ? 'Ahorras' : 'You save'} $${col.ahorro.toLocaleString('en-US', { maximumFractionDigits: 0 })}`, x, y + 19);
    }
    if (col.orden.length > 0) {
      doc.setTextColor(136, 146, 164);
      doc.text(isEs ? 'Orden:' : 'Order:', x, y + 26);
      col.orden.forEach((nombre, j) => {
        doc.text(`${j + 1}. ${nombre}`, x, y + 32 + j * 6);
      });
    }
  });

  y += 32 + debts.length * 6 + 10;

  // Recommendation
  doc.setDrawColor(51, 65, 85);
  doc.line(20, y, 190, y);
  y += 8;
  doc.setTextColor(245, 158, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(isEs ? 'Recomendación' : 'Recommendation', 20, y);
  y += 6;
  doc.setTextColor(136, 146, 164);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const diff = result.dineroAhorrado - result.dineroAhorradoSnowball;
  const recText = isEs
    ? `La Avalancha ahorra $${diff.toLocaleString('en-US', { maximumFractionDigits: 0 })} más que la Bola de Nieve. Cualquier estrategia es mejor que solo pagar mínimos.`
    : `Avalanche saves $${diff.toLocaleString('en-US', { maximumFractionDigits: 0 })} more than Snowball. Any strategy is better than only paying minimums.`;
  const lines = doc.splitTextToSize(recText, 170);
  doc.text(lines, 20, y);
  y += lines.length * 5 + 8;

  // Disclaimer
  doc.setDrawColor(51, 65, 85);
  doc.line(20, y, 190, y);
  y += 6;
  doc.setTextColor(100, 110, 120);
  doc.setFontSize(7);
  const disc = isEs
    ? 'ScoreMotive es una herramienta educativa. Este informe no constituye asesoría financiera profesional. Consulta a un CFP antes de tomar decisiones financieras importantes.'
    : 'ScoreMotive is an educational tool. This report does not constitute professional financial advice. Consult a CFP before making important financial decisions.';
  doc.text(doc.splitTextToSize(disc, 170), 20, y);

  doc.save(`scoremotive-debt-report-${Date.now()}.pdf`);
}

export default function ToolsPage() {
  const [lang, setLang] = useState('es');
  const t = translations[lang];
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [activeTab, setActiveTab] = useState('score');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'deuda') setActiveTab('deuda');
    }
  }, []);
  const [scoreAnswers, setScoreAnswers] = useState({ historial: '', utilizacion: 'auto', antiguedad: '', tipos: '', consultas: '' });
  const [reporteScore, setReporteScore] = useState<ScoreReport | null>(null);
  const [scoreError, setScoreError] = useState(false);
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, nombre: 'Credit Card A', balance: '5000', interesAnual: '24', pagoMensual: '200' },
    { id: 2, nombre: 'Business Line', balance: '12000', interesAnual: '14', pagoMensual: '350' }
  ]);
  const [globalPagoExtra, setGlobalPagoExtra] = useState('200');
  const [aplicarPagosLiberados, setAplicarPagosLiberados] = useState(true);
  const [pagoUnicoSolaVez, setPagoUnicoSolaVez] = useState('1500');
  const [debtResult, setDebtResult] = useState<DebtResult | null>(null);
  const [hayAmortizacionNegativa, setHayAmortizacionNegativa] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = sessionStorage.getItem('scoremotive_disclaimer_accepted');
      if (!accepted) setShowDisclaimer(true);
      const saved = localStorage.getItem('scoremotive_debts');
      if (saved) { try { setDebts(JSON.parse(saved)); } catch (e) {} }
      const pe = localStorage.getItem('scoremotive_pago_extra');
      const pu = localStorage.getItem('scoremotive_pago_unico');
      if (pe) setGlobalPagoExtra(pe);
      if (pu) setPagoUnicoSolaVez(pu);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scoremotive_debts', JSON.stringify(debts));
      let peligro = false;
      debts.forEach(d => {
        const bal = parseFloat(d.balance) || 0;
        const rate = ((parseFloat(d.interesAnual) || 0) / 100) / 12;
        const pmt = parseFloat(d.pagoMensual) || 0;
        if (bal > 0 && pmt <= bal * rate) peligro = true;
      });
      setHayAmortizacionNegativa(peligro);
    }
  }, [debts]);

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('scoremotive_pago_extra', globalPagoExtra); }, [globalPagoExtra]);
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem('scoremotive_pago_unico', pagoUnicoSolaVez); }, [pagoUnicoSolaVez]);

  const handleAcceptDisclaimer = () => { sessionStorage.setItem('scoremotive_disclaimer_accepted', 'true'); setShowDisclaimer(false); };
  const toggleLanguage = () => setLang(lang === 'es' ? 'en' : 'es');
  const handleScoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setScoreAnswers({ ...scoreAnswers, [e.target.name]: e.target.value });
  const resetScoreForm = () => { setScoreAnswers({ historial: '', utilizacion: 'auto', antiguedad: '', tipos: '', consultas: '' }); setReporteScore(null); setScoreError(false); };
  const handleDebtInputChange = (id: number, field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: cleanValue } : d));
  };
  const agregarDeuda = () => {
    const nuevoId = debts.length > 0 ? Math.max(...debts.map(d => d.id)) + 1 : 1;
    setDebts([...debts, { id: nuevoId, nombre: `Deuda / Debt ${nuevoId}`, balance: '3000', interesAnual: '18', pagoMensual: '100' }]);
  };
  const eliminarDeuda = (id: number) => setDebts(debts.filter(d => d.id !== id));

  const obtenerUtilizacionAutomatica = () => {
    const deudaTotal = debts.reduce((sum, d) => sum + (parseFloat(d.balance) || 0), 0);
    const ratio = (deudaTotal / 40000) * 100;
    if (ratio < 30) return 'bajo';
    if (ratio < 50) return 'moderado';
    if (ratio < 85) return 'alto';
    return 'critico';
  };

  const obtenerRangoNominal = (score: number) => {
    if (score >= 800) return { texto: t.r_exceptional, color: 'text-emerald-400' };
    if (score >= 740) return { texto: t.r_verygood, color: 'text-teal-400' };
    if (score >= 670) return { texto: t.r_good, color: 'text-amber-400' };
    if (score >= 580) return { texto: t.r_fair, color: 'text-orange-400' };
    return { texto: t.r_poor, color: 'text-rose-500' };
  };

  const calcularCreditScore = (e: React.FormEvent) => {
    e.preventDefault();
    const { historial, utilizacion, antiguedad, tipos, consultas } = scoreAnswers;
    if (!historial || !utilizacion || !antiguedad || !tipos || !consultas) {
      setScoreError(true);
      return;
    }
    setScoreError(false);
    const utilizacionReal = utilizacion === 'auto' ? obtenerUtilizacionAutomatica() : utilizacion;
    const maxPuntos = { historial: 192.5, utilizacion: 165, antiguedad: 82.5, tipos: 55, consultas: 55 };
    const pT: Record<string, number> = {
      historial: ({ excelente: 192.5, bueno: 154, regular: 96.25, malo: 38.5 } as Record<string,number>)[historial],
      utilizacion: ({ bajo: 165, moderado: 132, alto: 66, critico: 16.5 } as Record<string,number>)[utilizacionReal],
      antiguedad: ({ larga: 82.5, media: 57.75, corta: 24.75 } as Record<string,number>)[antiguedad],
      tipos: ({ multiples: 55, soloUno: 27.5 } as Record<string,number>)[tipos],
      consultas: ({ ningun: 55, pocas: 38.5, muchas: 11 } as Record<string,number>)[consultas]
    };
    const scoreTradicional = Math.round(300 + Object.values(pT).reduce((a, b) => a + b, 0));
    const p10T: Record<string, number> = {
      historial: ({ excelente: 192.5, bueno: 145, regular: 85, malo: 25 } as Record<string,number>)[historial],
      utilizacion: ({ bajo: 165, moderado: 140, alto: 80, critico: 15 } as Record<string,number>)[utilizacionReal],
      antiguedad: ({ larga: 82.5, media: 60, corta: 20 } as Record<string,number>)[antiguedad],
      tipos: ({ multiples: 55, soloUno: 30 } as Record<string,number>)[tipos],
      consultas: ({ ningun: 55, pocas: 40, muchas: 10 } as Record<string,number>)[consultas]
    };
    const score10T = Math.round(300 + Object.values(p10T).reduce((a, b) => a + b, 0));
    const dictamenTradicional = lang === 'es' ? "Mide la solvencia estática ('foto fija'). Ideal para solicitudes de tarjetas y préstamos." : "Measures static creditworthiness. Standard for credit cards and auto loan applications.";
    const dictamen10T = lang === 'es' ? "Analiza los últimos 24 meses. Castiga severamente si arrastras balances crónicos sin amortizar." : "Analyzes the last 24 months. Heavily penalizes carrying chronic revolving debt.";
    const consejos: { titulo: string; detalle: string }[] = [];
    if (historial === 'regular' || historial === 'malo') consejos.push({ titulo: lang === 'es' ? "Configurar Autopay Inmediato" : "Set Up Instant Autopay", detalle: lang === 'es' ? "Los retrasos destruyen el modelo Tradicional al instante." : "Late payments destroy the Traditional model instantly." });
    if (utilizacionReal === 'alto' || utilizacionReal === 'critico') consejos.push({ titulo: lang === 'es' ? "Reducción de balances mediante el acelerador" : "Reduce balances via Debt Accelerator", detalle: lang === 'es' ? "Liquidar balances liberará hasta 150 puntos." : "Paying down balances will release up to 150 points." });
    setReporteScore({
      scoreTradicional, score10T, dictamenTradicional, dictamen10T,
      consejos: consejos.length > 0 ? consejos : [{ titulo: lang === 'es' ? "Optimización Avanzada" : "Advanced Optimization", detalle: lang === 'es' ? "Mantén tu utilización general por debajo del 10%." : "Keep overall utilization below 10% for bilateral stability." }],
      desglose: [
        { nombre: 'Payment History', trad: pT.historial, tend: p10T.historial, max: maxPuntos.historial },
        { nombre: 'Amounts Owed (Utilization)', trad: pT.utilizacion, tend: p10T.utilizacion, max: maxPuntos.utilizacion },
        { nombre: 'Length of Credit History', trad: pT.antiguedad, tend: p10T.antiguedad, max: maxPuntos.antiguedad },
        { nombre: 'Credit Mix', trad: pT.tipos, tend: p10T.tipos, max: maxPuntos.tipos },
        { nombre: 'New Credit (Inquiries)', trad: pT.consultas, tend: p10T.consultas, max: maxPuntos.consultas },
      ]
    });
  };

  const calcularEstrategiaGlobal = (e: React.FormEvent) => {
    e.preventDefault();
    if (hayAmortizacionNegativa) { return; }
    const inyeccionMensualFija = parseFloat(globalPagoExtra) || 0;
    const pagoUnicoDisponible = parseFloat(pagoUnicoSolaVez) || 0;

    // Plan mínimo
    let activeReg = debts.map(d => ({ balance: parseFloat(d.balance) || 0, r: ((parseFloat(d.interesAnual) || 0) / 100) / 12, pmt: parseFloat(d.pagoMensual) || 0 })).filter(d => d.balance > 0);
    let mesesRegular = 0, totalInteresesRegular = 0;
    while (activeReg.length > 0 && mesesRegular < 360) {
      mesesRegular++;
      activeReg = activeReg.filter(d => { const im = d.balance * d.r; totalInteresesRegular += im; const pe = Math.min(d.pmt, d.balance + im); d.balance = (d.balance + im) - pe; return d.balance > 0.01; });
    }

    // Avalancha — orden por mayor tasa de interés
    const ordenAvalanche = [...debts].filter(d => parseFloat(d.balance) > 0).sort((a, b) => parseFloat(b.interesAnual) - parseFloat(a.interesAnual)).map(d => d.nombre);
    let activeAce = debts.map(d => ({ nombre: d.nombre, balance: parseFloat(d.balance) || 0, r: ((parseFloat(d.interesAnual) || 0) / 100) / 12, pmt: parseFloat(d.pagoMensual) || 0 })).filter(d => d.balance > 0).sort((a, b) => b.r - a.r);
    let mesesAcelerado = 0, totalInteresesAcelerado = 0;
    let pagosLiberadosAce = 0;
    while (activeAce.length > 0 && mesesAcelerado < 360) {
      mesesAcelerado++;
      let bolsa = inyeccionMensualFija + pagosLiberadosAce + (mesesAcelerado === 1 ? pagoUnicoDisponible : 0);
      activeAce.forEach(d => { const im = d.balance * d.r; totalInteresesAcelerado += im; d.balance += im; });
      activeAce.forEach(d => { const p = Math.min(d.pmt, d.balance); d.balance -= p; });
      for (const d of activeAce) { if (d.balance > 0 && bolsa > 0) { const extra = Math.min(bolsa, d.balance); d.balance -= extra; bolsa -= extra; } }
      const eliminadasAce = activeAce.filter(d => d.balance <= 0.01);
      if (aplicarPagosLiberados) pagosLiberadosAce += eliminadasAce.reduce((sum, d) => sum + d.pmt, 0);
      activeAce = activeAce.filter(d => d.balance > 0.01);
    }

    // Bola de Nieve — orden por menor balance
    const ordenSnowball = [...debts].filter(d => parseFloat(d.balance) > 0).sort((a, b) => parseFloat(a.balance) - parseFloat(b.balance)).map(d => d.nombre);
    let activeSnow = debts.map(d => ({ nombre: d.nombre, balance: parseFloat(d.balance) || 0, r: ((parseFloat(d.interesAnual) || 0) / 100) / 12, pmt: parseFloat(d.pagoMensual) || 0 })).filter(d => d.balance > 0).sort((a, b) => a.balance - b.balance);
    let mesesSnowball = 0, totalInteresesSnowball = 0;
    let pagosLiberadosSnow = 0;
    while (activeSnow.length > 0 && mesesSnowball < 360) {
      mesesSnowball++;
      let bolsa = inyeccionMensualFija + pagosLiberadosSnow + (mesesSnowball === 1 ? pagoUnicoDisponible : 0);
      activeSnow.forEach(d => { const im = d.balance * d.r; totalInteresesSnowball += im; d.balance += im; });
      activeSnow.forEach(d => { const p = Math.min(d.pmt, d.balance); d.balance -= p; });
      for (const d of activeSnow) { if (d.balance > 0 && bolsa > 0) { const extra = Math.min(bolsa, d.balance); d.balance -= extra; bolsa -= extra; } }
      const eliminadasSnow = activeSnow.filter(d => d.balance <= 0.01);
      if (aplicarPagosLiberados) pagosLiberadosSnow += eliminadasSnow.reduce((sum, d) => sum + d.pmt, 0);
      activeSnow = activeSnow.filter(d => d.balance > 0.01);
    }

    setDebtResult({
      mesesRegular, interesesRegular: Math.max(0, totalInteresesRegular),
      mesesAcelerado, interesesAcelerado: Math.max(0, totalInteresesAcelerado),
      mesesAhorrados: Math.max(0, mesesRegular - mesesAcelerado),
      dineroAhorrado: Math.max(0, totalInteresesRegular - totalInteresesAcelerado),
      mesesSnowball, interesesSnowball: Math.max(0, totalInteresesSnowball),
      dineroAhorradoSnowball: Math.max(0, totalInteresesRegular - totalInteresesSnowball),
      ordenAvalanche, ordenSnowball,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tab-active { background: linear-gradient(135deg, #4f46e5, #6366f1); box-shadow: 0 0 20px rgba(99,102,241,0.4); }
        .card-glow:hover { box-shadow: 0 0 30px rgba(99,102,241,0.1); transition: box-shadow 0.3s; }
        .score-card { animation: fadeInUp 0.4s ease-out; }
        .btn-primary { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); transition: all 0.2s; }
        .btn-primary:hover { background: linear-gradient(135deg, #4338ca 0%, #6d28d9 100%); transform: translateY(-1px); }
        .btn-secondary { background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); transition: all 0.2s; }
        .btn-secondary:hover { background: rgba(99,102,241,0.2); }
        .btn-danger { background: rgba(244,63,94,0.1); border: 1px solid rgba(244,63,94,0.25); transition: all 0.2s; }
        .btn-danger:hover { background: rgba(244,63,94,0.2); }
        .input-field { background: rgba(15,23,42,0.8); border: 1px solid rgba(51,65,85,0.8); transition: border-color 0.2s; }
        .input-field:focus { border-color: #6366f1; outline: none; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .progress-bar { transition: width 0.6s ease-out; }
        .disclaimer-badge { background: linear-gradient(135deg, rgba(245,158,11,0.15), rgba(249,115,22,0.1)); border: 1px solid rgba(245,158,11,0.3); }
      `}</style>

      {showDisclaimer && <DisclaimerModal lang={lang} onAccept={handleAcceptDisclaimer} />}

      <header className="border-b border-slate-800/70 bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="disclaimer-badge text-center py-1 px-4">
          <span className="text-[10px] text-amber-400/90 font-medium">
            ⚠️ {lang === 'es' ? 'Herramienta educativa. No constituye asesoría financiera profesional.' : 'Educational tool. Does not constitute professional financial advice.'}
          </span>
        </div>
        <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-indigo-500 via-purple-500 to-violet-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
              <BarChart3 className="h-3.5 w-3.5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <a href="/" className="font-bold text-sm text-white tracking-tight hover:text-indigo-400 transition-colors">{t.title}</a>
              <span className="text-[9px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 px-1.5 py-0.5 rounded-full hidden sm:inline">{t.version}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowDisclaimer(true)} className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] px-2 py-1.5 rounded-xl transition font-bold">
              <ShieldAlert className="h-3 w-3" /><span className="hidden sm:inline">{lang === 'es' ? 'Aviso' : 'Notice'}</span>
            </button>
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-2.5 py-1.5 rounded-xl transition font-bold text-slate-300">
              <Globe className="h-3.5 w-3.5 text-indigo-400" />{lang === 'es' ? 'EN' : 'ES'}
            </button>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 pb-2 flex items-center justify-center">
          <nav className="flex gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full max-w-sm">
            <button onClick={() => setActiveTab('score')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'score' ? 'tab-active text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}>
              <CreditCard className="h-3.5 w-3.5" /> {t.tabFico}
            </button>
            <button onClick={() => setActiveTab('deuda')} className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === 'deuda' ? 'tab-active text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}>
              <TrendingDown className="h-3.5 w-3.5" /> {t.tabDeudas}
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* TAB FICO */}
        {activeTab === 'score' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl card-glow">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-sm font-bold flex items-center gap-2 text-white"><Target className="text-indigo-400 h-4 w-4" /> {t.configTitle}</h2>
                  <button onClick={resetScoreForm} className="flex items-center gap-1 btn-secondary text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                    <RotateCcw className="h-3 w-3" /> {t.resetForm}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mb-5">{t.configSub}</p>
                <form onSubmit={calcularCreditScore} className="space-y-4">
                  {[
                    { label: t.lblHistorial, name: 'historial', options: [['excelente', t.h_excelente], ['bueno', t.h_bueno], ['regular', t.h_regular], ['malo', t.h_malo]] },
                    { label: t.lblAntiguedad, name: 'antiguedad', options: [['larga', t.a_larga], ['media', t.a_media], ['corta', t.a_corta]] },
                    { label: t.lblMix, name: 'tipos', options: [['multiples', t.m_optimo], ['soloUno', t.m_soloUno]] },
                    { label: t.lblInquiries, name: 'consultas', options: [['ningun', t.i_0], ['pocas', t.i_pocas], ['muchas', t.i_muchas]] },
                  ].map(({ label, name, options }) => (
                    <div key={name}>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">{label}</label>
                      <select name={name} value={scoreAnswers[name as keyof typeof scoreAnswers]} onChange={handleScoreChange} className="input-field w-full rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
                        <option value="">{t.selDefault}</option>
                        {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                      </select>
                    </div>
                  ))}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">{t.lblUtilizacion}</label>
                    <select name="utilizacion" value={scoreAnswers.utilizacion} onChange={handleScoreChange} className="input-field w-full rounded-xl px-3 py-2 text-xs text-indigo-400 font-medium focus:outline-none">
                      <option value="auto">🔄 {t.u_auto}</option>
                      <option value="bajo">{t.u_bajo}</option>
                      <option value="moderado">{t.u_mod}</option>
                      <option value="alto">{t.u_alto}</option>
                      <option value="critico">{t.u_critico}</option>
                    </select>
                  </div>
                  {scoreError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-semibold">
                      {lang === 'es' ? "Por favor, responde todas las preguntas." : "Please answer all questions."}
                    </div>
                  )}
                  <button type="submit" className="btn-primary w-full text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 mt-2">
                    <Zap className="h-3.5 w-3.5" /> {t.calcScore} <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {reporteScore ? (
                <div className="space-y-5 score-card">
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 card-glow">
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800/60 pb-3">
                      <h3 className="text-xs font-bold tracking-wider uppercase flex items-center gap-2 text-indigo-400"><FileText className="h-4 w-4" /> {t.reportTitle}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <ScoreBadge score={reporteScore.scoreTradicional} label={t.traditionalModel} color="text-indigo-400" />
                      <ScoreBadge score={reporteScore.score10T} label={t.trendedModel} color="text-emerald-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div className="bg-indigo-500/5 border border-indigo-500/20 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold tracking-wide">{t.traditionalModel}</p>
                        <div className={`text-[11px] font-bold mb-1 ${obtenerRangoNominal(reporteScore.scoreTradicional).color}`}>{obtenerRangoNominal(reporteScore.scoreTradicional).texto}</div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{reporteScore.dictamenTradicional}</p>
                      </div>
                      <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                        <p className="text-[10px] text-slate-500 mb-1 uppercase font-bold tracking-wide">{t.trendedModel}</p>
                        <div className={`text-[11px] font-bold mb-1 ${obtenerRangoNominal(reporteScore.score10T).color}`}>{obtenerRangoNominal(reporteScore.score10T).texto}</div>
                        <p className="text-[10px] text-slate-400 leading-relaxed">{reporteScore.dictamen10T}</p>
                      </div>
                    </div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">{t.impactTitle}</h4>
                    <div className="space-y-3">
                      {reporteScore.desglose.map((item, idx) => (
                        <div key={idx} className="bg-slate-950/40 p-3 rounded-xl border border-slate-800/40">
                          <div className="flex justify-between text-[11px] font-semibold mb-2">
                            <span className="text-slate-300">{item.nombre}</span>
                            <span className="text-slate-500 text-[10px]">{t.maxWeight}: {item.max}</span>
                          </div>
                          <div className="space-y-1.5">
                            {[{ label: 'FICO 8/9', val: item.trad, color: 'bg-indigo-500', text: 'text-indigo-400' }, { label: 'FICO 10T', val: item.tend, color: 'bg-emerald-500', text: 'text-emerald-400' }].map(({ label, val, color, text }) => (
                              <div key={label}>
                                <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                                  <span>{label}</span><span className={`font-bold ${text}`}>{Math.round(val)} pts</span>
                                </div>
                                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                                  <div className={`h-full ${color} rounded-full progress-bar`} style={{ width: `${(val / item.max) * 100}%` }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 card-glow">
                    <h4 className="text-xs font-bold text-indigo-400 mb-4 tracking-wide uppercase flex items-center gap-2"><Lightbulb className="h-4 w-4 text-amber-400" />{t.strategyTitle}</h4>
                    <div className="space-y-3">
                      {reporteScore.consejos.map((c, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-500/5 to-transparent border border-indigo-500/15 flex gap-3">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">{i + 1}</span>
                          <div><h5 className="text-xs font-bold text-slate-200 mb-0.5">{c.titulo}</h5><p className="text-[11px] text-slate-400 leading-relaxed">{c.detalle}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-slate-800/50 p-4 rounded-2xl mb-4"><TrendingUp className="h-10 w-10 text-slate-600" /></div>
                  <h4 className="text-sm font-bold text-slate-400">{t.waitingData}</h4>
                  <p className="text-xs text-slate-600 max-w-xs mt-2">{t.waitingSub}</p>
                  <div className="mt-6 flex gap-2">
                    {['800+', '740-799', '670-739', '580-669', '<580'].map((r, i) => {
                      const colors = ['bg-emerald-500/20 text-emerald-400 border-emerald-500/30', 'bg-teal-500/20 text-teal-400 border-teal-500/30', 'bg-amber-500/20 text-amber-400 border-amber-500/30', 'bg-orange-500/20 text-orange-400 border-orange-500/30', 'bg-rose-500/20 text-rose-400 border-rose-500/30'];
                      return <span key={i} className={`text-[9px] font-bold px-2 py-1 rounded-lg border ${colors[i]}`}>{r}</span>;
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB DEUDAS */}
        {activeTab === 'deuda' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2"><Wallet className="h-4 w-4 text-indigo-400" /> {t.carteraTitle}</h3>
                <button onClick={agregarDeuda} className="flex items-center gap-1.5 btn-secondary text-indigo-400 px-3 py-1.5 rounded-xl text-xs font-bold"><Plus className="h-3.5 w-3.5" /> {t.btnAñadir}</button>
              </div>

              {hayAmortizacionNegativa && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5 animate-pulse" />
                  <div><h5 className="text-xs font-bold">{t.alertaAmortizacion}</h5><p className="text-[11px] text-rose-300/80 mt-0.5 leading-relaxed">{t.alertaAmortizacionDesc}</p></div>
                </div>
              )}

              <form onSubmit={calcularEstrategiaGlobal} className="space-y-3">
                {debts.map((debt) => (
                  <div key={debt.id} className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl space-y-3 card-glow">
                    <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                      <input type="text" value={debt.nombre} onChange={(e) => setDebts(debts.map(d => d.id === debt.id ? { ...d, nombre: e.target.value } : d))} className="bg-transparent border-none font-bold text-xs text-indigo-400 focus:outline-none w-2/3" />
                      {debts.length > 1 && (<button type="button" onClick={() => eliminarDeuda(debt.id)} className="btn-danger text-rose-400 p-1.5 rounded-lg transition"><Trash2 className="h-3.5 w-3.5" /></button>)}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[['balance', t.lblMonto], ['interesAnual', t.lblInteres], ['pagoMensual', t.lblPagoMin]].map(([field, label]) => (
                        <div key={field}>
                          <label className="block text-[10px] text-slate-500 font-bold mb-1">{label}</label>
                          <input type="text" value={debt[field as keyof Debt]} onChange={(e) => handleDebtInputChange(debt.id, field, e.target.value)} className="input-field w-full rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold" required />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-indigo-500/8 to-violet-500/5 border border-indigo-500/20 p-4 rounded-xl mt-2 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-indigo-300 mb-1.5">{t.lblInyeccionMensual}</label>
                    <input type="text" value={globalPagoExtra} onChange={(e) => setGlobalPagoExtra(e.target.value.replace(/[^0-9.]/g, ''))} className="input-field w-full rounded-xl px-3 py-2 text-xs font-bold text-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" />{t.lblInyeccionUnica}</label>
                    <input type="text" value={pagoUnicoSolaVez} onChange={(e) => setPagoUnicoSolaVez(e.target.value.replace(/[^0-9.]/g, ''))} className="input-field w-full rounded-xl px-3 py-2 text-xs font-bold text-emerald-400" />
                  </div>

                  {/* Checkbox pagos liberados */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="pagosLiberados"
                      checked={aplicarPagosLiberados}
                      onChange={(e) => setAplicarPagosLiberados(e.target.checked)}
                      className="mt-0.5 accent-indigo-500 w-4 h-4 flex-shrink-0"
                    />
                    <div>
                      <label htmlFor="pagosLiberados" className="text-xs font-bold text-slate-300 cursor-pointer">
                        {t.lblPagosLiberados}
                      </label>
                      <p className="text-[10px] text-slate-500 mt-0.5">{t.lblPagosLiberadosDesc}</p>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                  <TrendingDown className="h-4 w-4" /> {t.btnCalcularDeudas}
                </button>
              </form>
            </div>

            {/* RESULTADOS */}
            <div className="lg:col-span-7 space-y-4">
              {debtResult ? (
                <div className="score-card space-y-4">

                  {/* Botón PDF */}
                  <button
                    onClick={() => exportarPDF(debtResult, debts, lang, globalPagoExtra, pagoUnicoSolaVez)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-2.5 rounded-xl text-xs transition">
                    <Download className="h-3.5 w-3.5" />
                    {lang === 'es' ? 'Descargar Informe PDF' : 'Download PDF Report'}
                  </button>

                  {/* Sin estrategia */}
                  <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl">
                    <h4 className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      {lang === 'es' ? 'Sin Estrategia (Solo Pagos Mínimos)' : 'No Strategy (Minimum Payments Only)'}
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 mb-1">{lang === 'es' ? 'Tiempo total' : 'Total time'}</p>
                        <p className="text-2xl font-black text-rose-400">{debtResult.mesesRegular} <span className="text-xs font-medium">{t.meses}</span></p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] text-slate-500 mb-1">{lang === 'es' ? 'Interés total' : 'Total interest'}</p>
                        <p className="text-2xl font-black text-rose-400">${debtResult.interesesRegular.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Comparación lado a lado */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Avalancha */}
                    <div className="bg-indigo-950/30 border border-indigo-500/25 p-4 rounded-xl">
                      <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-3">
                        🏔️ {lang === 'es' ? 'Avalancha' : 'Avalanche'}
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Tiempo' : 'Time'}</p>
                          <p className="text-xl font-black text-indigo-400">{debtResult.mesesAcelerado} <span className="text-[10px] font-medium">{t.meses}</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Interés total' : 'Total interest'}</p>
                          <p className="text-sm font-bold text-indigo-400">${debtResult.interesesAcelerado.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="pt-2 border-t border-indigo-500/20">
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Ahorras vs mínimos' : 'You save vs minimums'}</p>
                          <p className="text-sm font-black text-emerald-400">${debtResult.dineroAhorrado.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="pt-2 border-t border-indigo-500/20">
                          <p className="text-[10px] text-slate-500 mb-1">{lang === 'es' ? 'Orden de ataque' : 'Attack order'}</p>
                          {debtResult.ordenAvalanche.map((nombre, i) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] text-slate-300 leading-relaxed">
                              <span className="text-indigo-400 font-bold flex-shrink-0">{i + 1}.</span>
                              <span className="truncate">{nombre}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bola de Nieve */}
                    <div className="bg-emerald-950/30 border border-emerald-500/25 p-4 rounded-xl">
                      <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-3">
                        ⛄ {lang === 'es' ? 'Bola de Nieve' : 'Snowball'}
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Tiempo' : 'Time'}</p>
                          <p className="text-xl font-black text-emerald-400">{debtResult.mesesSnowball} <span className="text-[10px] font-medium">{t.meses}</span></p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Interés total' : 'Total interest'}</p>
                          <p className="text-sm font-bold text-emerald-400">${debtResult.interesesSnowball.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="pt-2 border-t border-emerald-500/20">
                          <p className="text-[10px] text-slate-500">{lang === 'es' ? 'Ahorras vs mínimos' : 'You save vs minimums'}</p>
                          <p className="text-sm font-black text-emerald-400">${debtResult.dineroAhorradoSnowball.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="pt-2 border-t border-emerald-500/20">
                          <p className="text-[10px] text-slate-500 mb-1">{lang === 'es' ? 'Orden de ataque' : 'Attack order'}</p>
                          {debtResult.ordenSnowball.map((nombre, i) => (
                            <div key={i} className="flex items-center gap-1 text-[10px] text-slate-300 leading-relaxed">
                              <span className="text-emerald-400 font-bold flex-shrink-0">{i + 1}.</span>
                              <span className="truncate">{nombre}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recomendación */}
                  <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
                    <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5" />
                      {lang === 'es' ? 'Recomendación' : 'Recommendation'}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {lang === 'es'
                        ? `La Avalancha ahorra $${Math.abs(debtResult.dineroAhorrado - debtResult.dineroAhorradoSnowball).toLocaleString('en-US', { maximumFractionDigits: 0 })} más en intereses que la Bola de Nieve. Si buscas maximizar el ahorro, elige Avalancha. Si prefieres eliminar deudas pequeñas primero para mantener la motivación, elige Bola de Nieve. Cualquiera de las dos es significativamente mejor que solo pagar mínimos.`
                        : `Avalanche saves $${Math.abs(debtResult.dineroAhorrado - debtResult.dineroAhorradoSnowball).toLocaleString('en-US', { maximumFractionDigits: 0 })} more in interest than Snowball. If you want to maximize savings, choose Avalanche. If you prefer eliminating small debts first to stay motivated, choose Snowball. Either one is significantly better than only paying minimums.`}
                    </p>
                  </div>

                </div>
              ) : (
                <div className="bg-slate-900/30 border border-slate-800 border-dashed rounded-2xl min-h-[350px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="bg-slate-800/50 p-4 rounded-2xl mb-4"><DollarSign className="h-10 w-10 text-slate-600" /></div>
                  <h4 className="text-sm font-bold text-slate-400">{lang === 'es' ? 'Proyección Inactiva' : 'Projection Inactive'}</h4>
                  <p className="text-xs text-slate-600 mt-2">{lang === 'es' ? 'Ingresa tus deudas y calcula la estrategia óptima.' : 'Enter your debts and calculate the optimal strategy.'}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800/60 py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="text-[10px] text-slate-600">{t.footerText}</p>
          <div className="inline-flex items-center gap-1.5 bg-amber-500/8 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <Info className="h-3 w-3 text-amber-500/70" />
            <p className="text-[10px] text-amber-500/70 font-medium">{t.footerDisclaimer}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
