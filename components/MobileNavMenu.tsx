"use client";

import { useEffect, useRef, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  color: string;
  bg: string;
  border: string;
};

type MobileNavMenuProps = {
  links: NavLink[];
};

export default function MobileNavMenu({ links }: MobileNavMenuProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Esc para cerrar + bloqueo de scroll del body mientras el drawer está abierto
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.08] transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop — click fuera del drawer para cerrar */}
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed top-16 left-0 right-0 bottom-0 z-30 bg-black/50"
          />

          <div
            id="mobile-nav-drawer"
            className="absolute top-16 left-0 right-0 z-40 border-b border-white/[0.07] bg-[rgba(8,11,18,0.97)] backdrop-blur-md px-6 py-4 flex flex-col gap-2"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-bold px-4 py-3 rounded-lg border transition-all"
                style={{ color: link.color, backgroundColor: link.bg, borderColor: link.border }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
