"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const launch = new Date();
    launch.setDate(launch.getDate() + 45);
    function updateCountdown() {
      const diff = launch.getTime() - new Date().getTime();
      if (diff <= 0) return;
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      const el = (id: string) => document.getElementById(id);
      if (el("days")) el("days")!.textContent = pad(d);
      if (el("hours")) el("hours")!.textContent = pad(h);
      if (el("minutes")) el("minutes")!.textContent = pad(m);
      if (el("seconds")) el("seconds")!.textContent = pad(s);
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return;
    setStatus("loading");
    try {
      const res = await fetch(
        "https://api.beehiiv.com/v2/publications/pub_c2ddb362-9a7f-4b0d-833a-7c61f4e5da94/subscriptions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true }),
        }
      );
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#080b12] text-[#f0f2f7] font-sans">

      {/* Gradient Orbs */}
      <div className="fixed top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.12)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[200px] right-[-150px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.10)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-[30%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,214,160,0.08)_0%,transparent_70%)] blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[rgba(8,11,18,0.85)] border-b border-white/[0.07]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4f7cff] to-[#7c3aed] flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <span className="font-bold text-lg tracking-tight">ScoreMotive</span>
          </div>
          <span className="text-[11px] font-medium text-[#f59e0b] bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] px-3 py-1 rounded-full">⚡ Coming Soon</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 pt-40 pb-24 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(79,124,255,0.08)] border border-[rgba(79,124,255,0.2)] rounded-full px-4 py-1.5 text-xs font-medium text-[#7ba7ff] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0] animate-pulse" />
            Early Access Opening Soon
          </div>

          <h1 className="text-[clamp(42px,7vw,76px)] font-black leading-[1.05] tracking-[-2px] mb-3">
            <span className="block text-[#f0f2f7]">Know your score.</span>
            <span className="block bg-gradient-to-r from-[#4f7cff] via-[#7c3aed] to-[#06d6a0] bg-clip-text text-transparent">Own your future.</span>
          </h1>

          <p className="text-[clamp(16px,2.5vw,22px)] text-[#8892a4] font-light mb-8">
            Entiende tu crédito. Domina tu futuro.
          </p>

          <p className="text-[clamp(15px,2vw,18px)] text-[#8892a4] max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Free bilingual tools to analyze your FICO score, accelerate debt payoff, and build lasting credit — in English and Spanish.
          </p>

          {/* Email Form */}
          {status === "success" ? (
            <div className="max-w-md mx-auto mb-6 bg-[rgba(6,214,160,0.08)] border border-[rgba(6,214,160,0.2)] rounded-xl px-6 py-4 text-sm text-[#06d6a0]">
              ✓ You&apos;re on the list! Check your inbox to confirm.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-white/[0.05] border border-white/[0.12] rounded-xl px-4 py-3.5 text-sm text-[#f0f2f7] placeholder-[#8892a4] outline-none focus:border-[#4f7cff] focus:bg-[rgba(79,124,255,0.05)] transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-gradient-to-r from-[#4f7cff] to-[#7c3aed] text-white font-medium text-sm px-6 py-3.5 rounded-xl whitespace-nowrap hover:opacity-90 hover:-translate-y-[1px] active:translate-y-0 transition-all disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Notify Me"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs text-[#f43f5e] mb-4">Something went wrong. Please try again.</p>
          )}

          <p className="text-xs text-[#8892a4]">No spam. No credit card. Free forever on launch.</p>

          {/* Countdown */}
          <div className="flex justify-center gap-6 mt-16 mb-20">
            {["days","hours","minutes","seconds"].map((unit) => (
              <div key={unit} className="text-center min-w-[72px]">
                <span id={unit} className="block text-[42px] font-black text-[#f0f2f7] leading-none tracking-[-2px]">00</span>
                <span className="block text-[11px] uppercase tracking-[2px] text-[#8892a4] mt-1.5">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[11px] uppercase tracking-[3px] text-[#8892a4] mb-12">What&apos;s coming</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: "📊", title: "Dual FICO Analyzer", desc: "Compare Traditional FICO 8/9 vs FICO 10T simultaneously. Understand exactly how lenders see you.", tag: "FICO 8 · FICO 9 · FICO 10T", color: "rgba(79,124,255,0.12)", tagColor: "#7ba7ff", tagBg: "rgba(79,124,255,0.1)" },
              { icon: "💳", title: "Debt Accelerator", desc: "Avalanche strategy powered by real amortization math. See how much interest you save with one extra payment.", tag: "Avalanche · Lump-sum · Projection", color: "rgba(6,214,160,0.12)", tagColor: "#06d6a0", tagBg: "rgba(6,214,160,0.1)" },
              { icon: "🌐", title: "Fully Bilingual", desc: "Every feature available in English and Spanish. Built for all communities in the American market.", tag: "English · Español", color: "rgba(124,58,237,0.12)", tagColor: "#a78bfa", tagBg: "rgba(124,58,237,0.1)" },
            ].map((f) => (
              <div key={f.title} className="bg-[#0d1220] border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.12] hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5" style={{ background: f.color }}>{f.icon}</div>
                <h3 className="text-lg font-bold text-[#f0f2f7] mb-2.5 tracking-[-0.3px]">{f.title}</h3>
                <p className="text-sm text-[#8892a4] leading-relaxed font-light mb-4">{f.desc}</p>
                <span className="inline-block text-[10px] font-medium uppercase tracking-[1px] px-2.5 py-1 rounded-full" style={{ background: f.tagBg, color: f.tagColor }}>{f.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="relative z-10 pb-24 px-6 text-center">
        <p className="text-[11px] uppercase tracking-[3px] text-[#8892a4] mb-8">Follow the launch</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="https://instagram.com/scoremotive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0d1220] border border-white/[0.07] rounded-xl px-5 py-2.5 text-sm font-medium text-[#8892a4] hover:border-white/[0.12] hover:text-[#f0f2f7] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @scoremotive
          </a>
          <a href="https://x.com/scoremotive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#0d1220] border border-white/[0.07] rounded-xl px-5 py-2.5 text-sm font-medium text-[#8892a4] hover:border-white/[0.12] hover:text-[#f0f2f7] transition-all">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            @scoremotive
          </a>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="relative z-10 border-t border-white/[0.07] py-8 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.15)] rounded-lg px-3.5 py-1.5 text-[11px] text-[#d4a017] mb-3">
            ⚠️ Educational Tool
          </div>
          <p className="text-[11px] text-[#8892a4] leading-relaxed opacity-70">
            ScoreMotive is an educational and informational tool. It does not constitute professional financial, legal, or tax advice. FICO score results are estimates based on simplified models. Always consult a Certified Financial Planner (CFP) before making financial decisions. This site may receive compensation through affiliate links.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.07] py-6 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs text-[#8892a4]">© 2025 ScoreMotive · Educational use only</span>
          <div className="flex gap-6">
            <a href="mailto:hola@scoremotive.com" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Contact</a>
            <a href="/legal" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">Legal</a>
            <a href="/about" className="text-xs text-[#8892a4] hover:text-[#f0f2f7] transition-colors">About</a>
          </div>
        </div>
      </footer>

    </main>
  );
}