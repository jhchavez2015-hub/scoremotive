import Link from "next/link";
import MobileNavMenu from "./MobileNavMenu";

type HeaderProps = {
  locale: string;
  otherLocale: string;
  isEs: boolean;
  t: { navTools: string };
};

export default function Header({ locale, otherLocale, isEs, t }: HeaderProps) {
  const navLinks = [
    {
      href: `/${locale}/tools`,
      label: t.navTools,
      color: "#7ba7ff",
      bg: "rgba(79,124,255,0.1)",
      border: "rgba(79,124,255,0.25)",
    },
    {
      href: `/${locale}/blog`,
      label: "Blog",
      color: "#a78bfa",
      bg: "rgba(124,58,237,0.1)",
      border: "rgba(124,58,237,0.25)",
    },
    {
      href: `/${locale}/glossary`,
      label: isEs ? "Glosario" : "Glossary",
      color: "#06d6a0",
      bg: "rgba(6,214,160,0.1)",
      border: "rgba(6,214,160,0.25)",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-[rgba(8,11,18,0.85)] border-b border-white/[0.07]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4f7cff] to-[#7c3aed] flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          </div>
          <span className="font-bold text-lg tracking-tight">ScoreMotive</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop nav — exact same links/classes as before, just hidden below md */}
          <nav className="hidden md:flex items-center gap-2">
            <a href={`/${locale}/tools`} className="text-[11px] font-bold text-[#7ba7ff] bg-[rgba(79,124,255,0.1)] hover:bg-[rgba(79,124,255,0.2)] border border-[rgba(79,124,255,0.25)] px-3 py-1.5 rounded-lg transition-all">{t.navTools}</a>
            <a href={`/${locale}/blog`} className="text-[11px] font-bold text-[#a78bfa] bg-[rgba(124,58,237,0.1)] hover:bg-[rgba(124,58,237,0.2)] border border-[rgba(124,58,237,0.25)] px-3 py-1.5 rounded-lg transition-all">Blog</a>
            <a href={`/${locale}/glossary`} className="text-[11px] font-bold text-[#06d6a0] bg-[rgba(6,214,160,0.1)] hover:bg-[rgba(6,214,160,0.2)] border border-[rgba(6,214,160,0.25)] px-3 py-1.5 rounded-lg transition-all">{isEs ? "Glosario" : "Glossary"}</a>
          </nav>

          {/* Language toggle — same classes as before, always visible mobile+desktop, ≥44x44 tap target */}
          <Link
            href={`/${otherLocale}`}
            className="flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.12] text-xs px-3 py-1.5 rounded-xl transition font-bold text-[#8892a4]"
          >
            🌐 {isEs ? "EN" : "ES"}
          </Link>

          {/* Hamburger trigger + drawer — interactivity lives in the client component */}
          <MobileNavMenu links={navLinks} />
        </div>
      </div>
    </header>
  );
}
