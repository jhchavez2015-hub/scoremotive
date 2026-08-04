"use client";
import { useState } from 'react';
import {
  Target, RotateCcw, Zap, ChevronRight, FileText, Lightbulb, TrendingUp,
} from 'lucide-react';
import { translations } from './translations';
import type { Debt, ScoreReport } from './types';

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

// Nota: depende de `debts` (prop) porque la opción "Cálculo Automático" de
// utilización en este tab se basa en el total de deudas del Acelerador de
// Deudas. Por eso `debts` se mantiene a nivel de ToolsPage y se pasa aquí
// de solo lectura, en vez de vivir exclusivamente en DebtTab.
export default function FicoTab({ lang, debts }: { lang: string; debts: Debt[] }) {
  const t = translations[lang];
  const [scoreAnswers, setScoreAnswers] = useState({ historial: '', utilizacion: 'auto', antiguedad: '', tipos: '', consultas: '' });
  const [reporteScore, setReporteScore] = useState<ScoreReport | null>(null);
  const [scoreError, setScoreError] = useState(false);

  const handleScoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => setScoreAnswers({ ...scoreAnswers, [e.target.name]: e.target.value });
  const resetScoreForm = () => { setScoreAnswers({ historial: '', utilizacion: 'auto', antiguedad: '', tipos: '', consultas: '' }); setReporteScore(null); setScoreError(false); };

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
      historial: ({ excelente: 192.5, bueno: 154, regular: 96.25, malo: 38.5 } as Record<string, number>)[historial],
      utilizacion: ({ bajo: 165, moderado: 132, alto: 66, critico: 16.5 } as Record<string, number>)[utilizacionReal],
      antiguedad: ({ larga: 82.5, media: 57.75, corta: 24.75 } as Record<string, number>)[antiguedad],
      tipos: ({ multiples: 55, soloUno: 27.5 } as Record<string, number>)[tipos],
      consultas: ({ ningun: 55, pocas: 38.5, muchas: 11 } as Record<string, number>)[consultas]
    };
    const scoreTradicional = Math.round(300 + Object.values(pT).reduce((a, b) => a + b, 0));
    const p10T: Record<string, number> = {
      historial: ({ excelente: 192.5, bueno: 145, regular: 85, malo: 25 } as Record<string, number>)[historial],
      utilizacion: ({ bajo: 165, moderado: 140, alto: 80, critico: 15 } as Record<string, number>)[utilizacionReal],
      antiguedad: ({ larga: 82.5, media: 60, corta: 20 } as Record<string, number>)[antiguedad],
      tipos: ({ multiples: 55, soloUno: 30 } as Record<string, number>)[tipos],
      consultas: ({ ningun: 55, pocas: 40, muchas: 10 } as Record<string, number>)[consultas]
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

  return (
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
                <label htmlFor={name} className="block text-[11px] font-semibold text-slate-300 mb-1.5">{label}</label>
                <select id={name} name={name} value={scoreAnswers[name as keyof typeof scoreAnswers]} onChange={handleScoreChange} className="input-field w-full rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none">
                  <option value="">{t.selDefault}</option>
                  {options.map(([val, lbl]) => <option key={val} value={val}>{lbl}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label htmlFor="utilizacion" className="block text-[11px] font-semibold text-slate-300 mb-1.5">{t.lblUtilizacion}</label>
              <select id="utilizacion" name="utilizacion" value={scoreAnswers.utilizacion} onChange={handleScoreChange} className="input-field w-full rounded-xl px-3 py-2 text-xs text-indigo-400 font-medium focus:outline-none">
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
  );
}

