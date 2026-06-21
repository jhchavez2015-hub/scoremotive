"use client";
import { useState, useEffect } from 'react';
import { CreditCard, TrendingDown, BarChart3, Globe, ShieldAlert, Info } from 'lucide-react';
import { translations } from './translations';
import { safeLocalStorageSet } from './utils';
import type { Debt } from './types';
import DisclaimerModal from './DisclaimerModal';
import FicoTab from './FicoTab';
import DebtTab from './DebtTab';

export default function ToolsPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = translations[lang];
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [activeTab, setActiveTab] = useState('score');

  // `debts` vive aquí (no en DebtTab) porque FicoTab también lo necesita
  // de solo lectura para su opción de "Cálculo Automático" de utilización.
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, nombre: 'Credit Card A', balance: '5000', interesAnual: '24', pagoMensual: '200' },
    { id: 2, nombre: 'Business Line', balance: '12000', interesAnual: '14', pagoMensual: '350' }
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'deuda') setActiveTab('deuda');

      const savedLang = window.localStorage.getItem('scoremotive_lang');
      if (savedLang === 'en' || savedLang === 'es') setLang(savedLang);

      const accepted = sessionStorage.getItem('scoremotive_disclaimer_accepted');
      if (!accepted) setShowDisclaimer(true);

      const saved = localStorage.getItem('scoremotive_debts');
      if (saved) { try { setDebts(JSON.parse(saved)); } catch (e) {} }
    }
  }, []);

  useEffect(() => {
    safeLocalStorageSet('scoremotive_debts', JSON.stringify(debts));
  }, [debts]);

  const handleAcceptDisclaimer = () => { sessionStorage.setItem('scoremotive_disclaimer_accepted', 'true'); setShowDisclaimer(false); };
  const toggleLanguage = () => {
    const next = lang === 'es' ? 'en' : 'es';
    setLang(next);
    safeLocalStorageSet('scoremotive_lang', next);
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
            <button onClick={() => setShowDisclaimer(true)} aria-label={lang === 'es' ? 'Ver aviso legal' : 'View legal notice'} className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] px-2 py-1.5 rounded-xl transition font-bold">
              <ShieldAlert className="h-3 w-3" /><span className="hidden sm:inline">{lang === 'es' ? 'Aviso' : 'Notice'}</span>
            </button>
            <button onClick={toggleLanguage} aria-label={lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'} className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-2.5 py-1.5 rounded-xl transition font-bold text-slate-300">
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
        {activeTab === 'score' && <FicoTab lang={lang} debts={debts} />}
        {activeTab === 'deuda' && <DebtTab lang={lang} debts={debts} setDebts={setDebts} />}
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

