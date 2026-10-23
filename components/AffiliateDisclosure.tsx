// components/AffiliateDisclosure.tsx
//
// FTC-required disclosure for affiliate links. Place this INLINE, close to
// the affiliate link itself — not just buried in the article footer.
// The footer disclaimer (financial-advice disclaimer) is a separate thing
// and should stay as-is; this is specifically about the affiliate
// relationship and is a distinct legal requirement.
//
// Usage:
//   <AffiliateDisclosure locale={locale} />
// right before or after the paragraph containing the /go/[slug] link.

type Props = {
  locale: "en" | "es";
  variant?: "multi" | "reminder";
};

const text: Record<"default" | "multi" | "reminder", Record<"en" | "es", string>> = {
  default: {
    en: "This article contains an affiliate link. If you sign up through it, ScoreMotive may earn a commission at no extra cost to you.",
    es: "Este artículo contiene un enlace de afiliado. Si te suscribes a través de él, ScoreMotive puede ganar una comisión sin costo adicional para ti.",
  },
  multi: {
    en: "Some links in this article are affiliate links. If you sign up for or buy a paid service through them, ScoreMotive may earn a commission at no extra cost to you. Free options are labeled as such.",
    es: "Algunos enlaces de este artículo son enlaces de afiliado. Si te suscribes o compras un servicio de pago a través de ellos, ScoreMotive puede ganar una comisión sin costo adicional para ti. Las opciones gratuitas se indican como tales.",
  },
  reminder: {
    en: "Links in this section are affiliate links.",
    es: "Los enlaces de esta sección son enlaces de afiliado.",
  },
};

export default function AffiliateDisclosure({ locale, variant }: Props) {
  if (variant === "multi") {
    return (
      <div className="bg-[#0d1220] border border-white/[0.07] rounded-xl px-4 py-3 my-4">
        <p className="text-sm text-[#c8d0dc] leading-relaxed">
          ⓘ {text.multi[locale]}
        </p>
      </div>
    );
  }

  if (variant === "reminder") {
    return (
      <p className="text-xs text-[#aab4c4] leading-relaxed my-3">
        ⓘ {text.reminder[locale]}
      </p>
    );
  }

  return (
    <p className="text-[11px] text-[#8892a4] italic leading-relaxed my-3">
      ⓘ {text.default[locale]}
    </p>
  );
}
