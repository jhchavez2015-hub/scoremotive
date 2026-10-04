import Image from "next/image";

type LogoProps = {
  showText?: boolean;
  size?: number;
  alt?: string;
};

export default function Logo({ showText = true, size = 36, alt }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      <Image
        src="/scoremotive-icon.svg"
        alt={alt ?? (showText ? "" : "ScoreMotive")}
        width={size}
        height={size}
        unoptimized
      />
      {showText && <span className="font-bold text-lg tracking-tight">ScoreMotive</span>}
    </span>
  );
}
