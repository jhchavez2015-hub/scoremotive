"use client";
import { ShieldAlert, CheckCircle2 } from 'lucide-react';
import { translations } from './translations';

export default function DisclaimerModal({ lang, onAccept }: { lang: string; onAccept: () => void }) {
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