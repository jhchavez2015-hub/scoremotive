"use client";
import { useState, useEffect } from 'react';
import {
  Wallet, Plus, Trash2, AlertTriangle, Download, TrendingDown, DollarSign, Zap, Lightbulb,
} from 'lucide-react';
import { translations } from './translations';
import { safeLocalStorageSet } from './utils';
import type { Debt, DebtResult } from './types';

// FIX #4 (original): trunca texto al ancho de columna disponible para que
// nombres largos no se monten sobre la siguiente columna en el PDF.
function truncarTexto(doc: any, texto: string, maxWidth: number): string {
  if (doc.getTextWidth(texto) <= maxWidth) return texto;
  let resultado = texto;
  while (resultado.length > 1 && doc.getTextWidth(resultado + '…') > maxWidth) {
    resultado = resultado.slice(0, -1);
  }
  return resultado + '…';
}

async function exportarPDF(result: DebtResult, debts: Debt[], lang: string, pagoExtra: string, pagoUnico: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  const isEs = lang === 'es';
  const fecha = new Date().toLocaleDateString(isEs ? 'es-US' : 'en-US');

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

  doc.setDrawColor(79, 124, 255);
  doc.line(20, 40, 190, 40);

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
    doc.text(truncarTexto(doc, d.nombre, 55), 20, y);
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

  doc.setTextColor(240, 242, 247);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(isEs ? 'Comparación de Estrategias' : 'Strategy Comparison', 20, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  const cols = [
    { label: isEs ? 'Sin Estrategia' : 'No Strategy', color: [244, 63, 94] as [number, number, number], meses: result.mesesRegular, interes: result.interesesRegular, ahorro: 0, orden: [] as string[] },
    { label: isEs ? 'AVALANCHA' : 'AVALANCHE', color: [79, 124, 255] as [number, number, number], meses: result.mesesAcelerado, interes: result.interesesAcelerado, ahorro: result.dineroAhorrado, orden: result.ordenAvalanche },
    { label: isEs ? 'BOLA DE NIEVE' : 'SNOWBALL', color: [6, 214, 160] as [number, number, number], meses: result.mesesSnowball, interes: result.interesesSnowball, ahorro: result.dineroAhorradoSnowball, orden: result.ordenSnowball },
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
        doc.text(`${j + 1}. ${truncarTexto(doc, nombre, 50)}`, x, y + 32 + j * 6);
      });
    }
  });

  y += 32 + debts.length * 6 + 10;

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

  if (result.capAlcanzado) {
    doc.setTextColor(244, 63, 94);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const capText = isEs
      ? 'Nota: una o más cifras de este informe están limitadas a 30 años (360 meses) porque el saldo no se liquida en ese plazo con los pagos ingresados.'
      : 'Note: one or more figures in this report are capped at 30 years (360 months) because the balance does not pay off within that period given the payments entered.';
    const capLines = doc.splitTextToSize(capText, 170);
    doc.text(capLines, 20, y);
    y += capLines.length * 4 + 6;
  }

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

export default function DebtTab({
  lang, debts, setDebts,
}: {
  lang: string;
  debts: Debt[];
  setDebts: (updater: Debt[] | ((prev: Debt[]) => Debt[])) => void;
}) {
  const t = translations[lang];
  const [globalPagoExtra, setGlobalPagoExtra] = useState('200');
  const [aplicarPagosLiberados, setAplicarPagosLiberados] = useState(true);
  const [pagoUnicoSolaVez, setPagoUnicoSolaVez] = useState('1500');
  const [debtResult, setDebtResult] = useState<DebtResult | null>(null);
  const [hayAmortizacionNegativa, setHayAmortizacionNegativa] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pe = localStorage.getItem('scoremotive_pago_extra');
      const pu = localStorage.getItem('scoremotive_pago_unico');
      if (pe) setGlobalPagoExtra(pe);
      if (pu) setPagoUnicoSolaVez(pu);
    }
  }, []);

  // Chequeo de amortización negativa: recalcula cada vez que cambian las
  // deudas (prop compartida con FicoTab a través de ToolsPage).
  useEffect(() => {
    let peligro = false;
    debts.forEach(d => {
      const bal = parseFloat(d.balance) || 0;
      const rate = ((parseFloat(d.interesAnual) || 0) / 100) / 12;
      const pmt = parseFloat(d.pagoMensual) || 0;
      if (bal > 0 && pmt <= bal * rate) peligro = true;
    });
    setHayAmortizacionNegativa(peligro);
  }, [debts]);

  useEffect(() => { safeLocalStorageSet('scoremotive_pago_extra', globalPagoExtra); }, [globalPagoExtra]);
  useEffect(() => { safeLocalStorageSet('scoremotive_pago_unico', pagoUnicoSolaVez); }, [pagoUnicoSolaVez]);

  const handleDebtInputChange = (id: number, field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: cleanValue } : d));
  };
  const agregarDeuda = () => {
    setDebts(prev => {
      const nuevoId = prev.length > 0 ? Math.max(...prev.map(d => d.id)) + 1 : 1;
      return [...prev, { id: nuevoId, nombre: `Deuda / Debt ${nuevoId}`, balance: '3000', interesAnual: '18', pagoMensual: '100' }];
    });
  };
  const eliminarDeuda = (id: number) => setDebts(prev => prev.filter(d => d.id !== id));

  const calcularEstrategiaGlobal = (e: React.FormEvent) => {
    e.preventDefault();
    if (hayAmortizacionNegativa) { return; }
    const inyeccionMensualFija = parseFloat(globalPagoExtra) || 0;
    const pagoUnicoDisponible = parseFloat(pagoUnicoSolaVez) || 0;

    let activeReg = debts.map(d => ({ balance: parseFloat(d.balance) || 0, r: ((parseFloat(d.interesAnual) || 0) / 100) / 12, pmt: parseFloat(d.pagoMensual) || 0 })).filter(d => d.balance > 0);
    let mesesRegular = 0, totalInteresesRegular = 0;
    while (activeReg.length > 0 && mesesRegular < 360) {
      mesesRegular++;
      activeReg = activeReg.filter(d => { const im = d.balance * d.r; totalInteresesRegular += im; const pe = Math.min(d.pmt, d.balance + im); d.balance = (d.balance + im) - pe; return d.balance > 0.01; });
    }
    const capRegular = activeReg.length > 0;

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
    const capAcelerado = activeAce.length > 0;

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
    const capSnowball = activeSnow.length > 0;

    setDebtResult({
      mesesRegular, interesesRegular: Math.max(0, totalInteresesRegular),
      mesesAcelerado, interesesAcelerado: Math.max(0, totalInteresesAcelerado),
      mesesAhorrados: Math.max(0, mesesRegular - mesesAcelerado),
      dineroAhorrado: Math.max(0, totalInteresesRegular - totalInteresesAcelerado),
      mesesSnowball, interesesSnowball: Math.max(0, totalInteresesSnowball),
      dineroAhorradoSnowball: Math.max(0, totalInteresesRegular - totalInteresesSnowball),
      ordenAvalanche, ordenSnowball,
      capAlcanzado: capRegular || capAcelerado || capSnowball,
    });
  };

  return (
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
                <input type="text" value={debt.nombre} aria-label={lang === 'es' ? 'Nombre de la deuda' : 'Debt name'}
                  onChange={(e) => setDebts(prev => prev.map(d => d.id === debt.id ? { ...d, nombre: e.target.value } : d))} className="bg-transparent border-none font-bold text-xs text-indigo-400 focus:outline-none w-2/3" />
                {debts.length > 1 && (<button type="button" onClick={() => eliminarDeuda(debt.id)} aria-label={lang === 'es' ? 'Eliminar deuda' : 'Delete debt'} className="btn-danger text-rose-400 p-1.5 rounded-lg transition"><Trash2 className="h-3.5 w-3.5" /></button>)}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[['balance', t.lblMonto], ['interesAnual', t.lblInteres], ['pagoMensual', t.lblPagoMin]].map(([field, label]) => (
                  <div key={field}>
                    <label htmlFor={`debt-${debt.id}-${field}`} className="block text-[10px] text-slate-500 font-bold mb-1">{label}</label>
                    <input id={`debt-${debt.id}-${field}`} type="text" value={debt[field as keyof Debt]} onChange={(e) => handleDebtInputChange(debt.id, field, e.target.value)} className="input-field w-full rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold" required />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-gradient-to-br from-indigo-500/8 to-violet-500/5 border border-indigo-500/20 p-4 rounded-xl mt-2 space-y-3">
            <div>
              <label htmlFor="pagoExtraMensual" className="block text-xs font-bold text-indigo-300 mb-1.5">{t.lblInyeccionMensual}</label>
              <input id="pagoExtraMensual" type="text" value={globalPagoExtra} onChange={(e) => setGlobalPagoExtra(e.target.value.replace(/[^0-9.]/g, ''))} className="input-field w-full rounded-xl px-3 py-2 text-xs font-bold text-indigo-400" />
            </div>
            <div>
              <label htmlFor="pagoUnico" className="block text-xs font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" />{t.lblInyeccionUnica}</label>
              <input id="pagoUnico" type="text" value={pagoUnicoSolaVez} onChange={(e) => setPagoUnicoSolaVez(e.target.value.replace(/[^0-9.]/g, ''))} className="input-field w-full rounded-xl px-3 py-2 text-xs font-bold text-emerald-400" />
            </div>

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

      <div className="lg:col-span-7 space-y-4">
        {debtResult ? (
          <div className="score-card space-y-4">

            {debtResult.capAlcanzado && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex gap-3 items-start">
                <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold">{t.alertaTope}</h5>
                  <p className="text-[11px] text-amber-300/80 mt-0.5 leading-relaxed">{t.alertaTopeDesc}</p>
                </div>
              </div>
            )}

            <button
              onClick={() => exportarPDF(debtResult, debts, lang, globalPagoExtra, pagoUnicoSolaVez)}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold py-2.5 rounded-xl text-xs transition">
              <Download className="h-3.5 w-3.5" />
              {lang === 'es' ? 'Descargar Informe PDF' : 'Download PDF Report'}
            </button>

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

            <div className="grid grid-cols-2 gap-3">
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
  );
}

