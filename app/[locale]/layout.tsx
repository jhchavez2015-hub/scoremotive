import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "./seo-defaults";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ["en", "es"] as const;
type Locale = (typeof locales)[number];

const siteMetadata: Record<Locale, {
  title: string;
  description: string;
  ogDescription: string;
  twitterDescription: string;
  keywords: string;
}> = {
  en: {
    title: "ScoreMotive — Know Your Score. Own Your Future.",
    description: "Free bilingual tools to analyze your FICO score, accelerate debt payoff, and build lasting credit — in English and Spanish. FICO 8, FICO 9, FICO 10T analyzer and debt avalanche calculator.",
    ogDescription: "Free bilingual tools to analyze your FICO score and accelerate debt payoff — in English and Spanish.",
    twitterDescription: "Free bilingual FICO score analyzer and debt payoff tools.",
    keywords: "FICO score, credit score, debt payoff, credit score analyzer, FICO 10T, debt avalanche, debt snowball",
  },
  es: {
    title: "ScoreMotive — Conoce tu Score. Domina tu Futuro.",
    description: "Herramientas gratuitas y bilingües para analizar tu puntaje FICO, acelerar el pago de deudas y construir crédito duradero — en inglés y español. Analizador de FICO 8, FICO 9, FICO 10T y calculadora de avalancha de deudas.",
    ogDescription: "Herramientas gratuitas y bilingües para analizar tu puntaje FICO y acelerar el pago de deudas — en inglés y español.",
    twitterDescription: "Analizador de puntaje FICO y herramientas de pago de deudas, gratis y bilingües.",
    keywords: "credit score español, puntaje de crédito, deudas, FICO 10T, avalancha de deudas, bola de nieve de deudas",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = siteMetadata[locale === "es" ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    authors: [{ name: "ScoreMotive" }],
    creator: "ScoreMotive",
    openGraph: {
      title: copy.title,
      description: copy.ogDescription,
      url: `${baseUrl}/${locale}`,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[locale === "es" ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: copy.title,
      description: copy.twitterDescription,
      site: "@scoremotive",
      creator: "@scoremotive",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        "x-default": `${baseUrl}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="fo-verify" content="bf5be788-edf2-4cdb-9d3c-e1b093b4b338" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F530DRSPG5" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-F530DRSPG5');
        `}</Script>
      </body>
    </html>
  );
}
