import Image from "next/image";

type LogoProps = {
  variant?: "wordmark" | "icon";
  size?: number;
  alt?: string;
};

export default function Logo({ variant = "wordmark", size, alt = "ScoreMotive" }: LogoProps) {
  if (variant === "icon") {
    const s = size ?? 36;
    return <Image src="/brand/icon.svg" alt={alt} width={s} height={s} unoptimized />;
  }
  // wordmark viewBox is 643.55 x 96 (≈ 6.7:1); size is the height
  const h = size ?? 28;
  return (
    <Image
      src="/brand/wordmark-dark.svg"
      alt={alt}
      width={Math.round(h * (643.55 / 96))}
      height={h}
      priority
      unoptimized
    />
  );
}
