import Link from "next/link";

type DetailPageHeaderProps = {
  backHref: string;
  backLabel: string;
  otherLocaleHref: string;
  isEs: boolean;
};

export default function DetailPageHeader({
  backHref,
  backLabel,
  otherLocaleHref,
  isEs,
}: DetailPageHeaderProps) {
  return (
    <header className="border-b border-white/[0.07] bg-[rgba(8,11,18,0.95)] sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href={backHref}
          className="flex items-center gap-2 text-sm font-bold text-white hover:text-[#4f7cff] transition-colors"
        >
          {backLabel}
        </a>
        <Link
          href={otherLocaleHref}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs px-3 py-1.5 rounded-xl transition font-bold text-slate-300"
        >
          🌐 {isEs ? "EN" : "ES"}
        </Link>
      </div>
    </header>
  );
}
