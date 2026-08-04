import type { Metadata } from "next";
import { SITE_NAME, OG_TYPE, OG_LOCALE, TWITTER_CARD } from "../seo-defaults";
import ToolsClient from "./ToolsClient";

type Locale = "en" | "es";

const content: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Dual Score Estimator & Debt Accelerator — ScoreMotive",
    description: "Free tools to estimate your Traditional and FICO 10T credit score, and calculate the fastest way to pay off debt with the Avalanche or Snowball strategy.",
  },
  es: {
    title: "Estimador de Score Dual y Acelerador de Deudas — ScoreMotive",
    description: "Herramientas gratuitas para estimar tu puntaje de crédito Tradicional y FICO 10T, y calcular la forma más rápida de pagar tus deudas con la estrategia de Avalancha o Bola de Nieve.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  const t = content[isEs ? "es" : "en"];
  const baseUrl = "https://scoremotive.com";
  const url = `${baseUrl}/${locale}/tools`;

  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en/tools`,
        es: `${baseUrl}/es/tools`,
        "x-default": `${baseUrl}/en/tools`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url,
      siteName: SITE_NAME,
      type: OG_TYPE,
      locale: OG_LOCALE[isEs ? "es" : "en"],
    },
    twitter: {
      card: TWITTER_CARD,
      title: t.title,
      description: t.description,
    },
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const initialLocale: Locale = locale === "es" ? "es" : "en";

  return <ToolsClient initialLocale={initialLocale} />;
}
