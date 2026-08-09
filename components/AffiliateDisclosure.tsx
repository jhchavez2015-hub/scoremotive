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
};

const text: Record<"en" | "es", string> = {
  en: "This article contains an affiliate link. If you sign up through it, ScoreMotive may earn a commission at no extra cost to you.",
  es: "Este artículo contiene un enlace de afiliado. Si te suscribes a través de él, ScoreMotive puede ganar una comisión sin costo adicional para ti.",
};

export default function AffiliateDisclosure({ locale }: Props) {
  return (
    <p className="text-[11px] text-[#8892a4] italic leading-relaxed my-3">
      ⓘ {text[locale]}
    </p>
  );
}
