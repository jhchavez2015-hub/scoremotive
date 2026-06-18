import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScoreMotive — Know Your Score. Own Your Future.",
  description: "Free bilingual tools to analyze your FICO score, accelerate debt payoff, and build lasting credit — in English and Spanish. FICO 8, FICO 9, FICO 10T analyzer and debt avalanche calculator.",
  keywords: "FICO score, credit score, debt payoff, credit score analyzer, FICO 10T, debt avalanche, debt snowball, credit score español, puntaje de credito, deudas",
  authors: [{ name: "ScoreMotive" }],
  creator: "ScoreMotive",
  openGraph: {
    title: "ScoreMotive — Know Your Score. Own Your Future.",
    description: "Free bilingual tools to analyze your FICO score and accelerate debt payoff — in English and Spanish.",
    url: "https://scoremotive.com",
    siteName: "ScoreMotive",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScoreMotive — Know Your Score. Own Your Future.",
    description: "Free bilingual FICO score analyzer and debt payoff tools.",
    site: "@scoremotive",
    creator: "@scoremotive",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://scoremotive.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
