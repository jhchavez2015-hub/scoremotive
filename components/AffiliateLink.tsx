import type { ReactNode } from "react";

type Props = {
  slug: string;
  children: ReactNode;
  className?: string;
};

export default function AffiliateLink({ slug, children, className }: Props) {
  return (
    <a
      href={`/go/${slug}`}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
    >
      {children}
    </a>
  );
}
