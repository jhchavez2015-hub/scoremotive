export type PostCategory = "credito" | "taxes";

export type PostMeta = {
  slug: string;
  titleEn: string;
  titleEs: string;
  descEn: string;
  descEs: string;
  date: string;
  readTime: string;
  tag: string;
  tagColor: string;
  tagText: string;
  category: PostCategory;
};

export const blogPosts: PostMeta[] = [
  {
    slug: "fico-8-vs-fico-10t",
    titleEn: "FICO 8 vs FICO 10T: What's the Difference and Why It Matters",
    titleEs: "FICO 8 vs FICO 10T: Cuál es la Diferencia y Por Qué Importa",
    descEn: "Most Americans don't know there are multiple FICO models. The difference between FICO 8 and FICO 10T can mean thousands of dollars on your next loan.",
    descEs: "La mayoría de los americanos no saben que existen múltiples modelos FICO. La diferencia entre FICO 8 y FICO 10T puede significar miles de dólares en tu próximo préstamo.",
    date: "June 2026",
    readTime: "6 min",
    tag: "FICO Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
    category: "credito",
  },
  {
    slug: "debt-avalanche-vs-snowball",
    titleEn: "Debt Avalanche vs Debt Snowball: Which Pays Off Debt Faster",
    titleEs: "Avalancha vs Bola de Nieve: Cuál Liquida Deudas Más Rápido",
    descEn: "Two popular debt payoff strategies — but only one saves you the most money. Here's the math behind both methods and which one wins.",
    descEs: "Dos estrategias populares para pagar deudas — pero solo una te ahorra más dinero. Aquí está la matemática detrás de ambos métodos y cuál gana.",
    date: "June 2026",
    readTime: "5 min",
    tag: "Debt",
    tagColor: "rgba(6,214,160,0.1)",
    tagText: "#06d6a0",
    category: "credito",
  },
  {
    slug: "hard-inquiry",
    titleEn: "What Is a Hard Inquiry? How It Affects Your Credit Score",
    titleEs: "¿Qué es un Hard Inquiry? Cómo Afecta tu Credit Score",
    descEn: "A hard inquiry can lower your score by a few points — but not as much, or for as long, as most people think.",
    descEs: "Un hard inquiry puede bajar tu puntaje unos pocos puntos — pero no tanto, ni por tanto tiempo, como mucha gente cree.",
    date: "August 2026",
    readTime: "3 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
    category: "credito",
  },
  {
    slug: "raise-credit-score-100-points",
    titleEn: "How to Raise Your Credit Score 100 Points in 6 Months",
    titleEs: "Cómo Subir tu Credit Score 100 Puntos en 6 Meses",
    descEn: "A step-by-step action plan based on how FICO actually calculates your score. No gimmicks — just the moves that work.",
    descEs: "Un plan de acción paso a paso basado en cómo FICO realmente calcula tu puntaje. Sin trucos — solo las acciones que funcionan.",
    date: "June 2026",
    readTime: "7 min",
    tag: "Credit Score",
    tagColor: "rgba(245,158,11,0.1)",
    tagText: "#f59e0b",
    category: "credito",
  },
  {
    slug: "rent-utilities-credit-score",
    titleEn: "How Your Rent and Utility Bills Can Raise Your Credit Score",
    titleEs: "Cómo tu Renta y Servicios Pueden Subir tu Credit Score",
    descEn: "For decades, paying rent on time didn't count toward your credit. That's changing — and it could be your most powerful financial advantage.",
    descEs: "Por décadas, pagar la renta puntualmente no contaba para tu crédito. Eso está cambiando — y puede ser tu ventaja más poderosa.",
    date: "June 2026",
    readTime: "6 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
    category: "credito",
  },
  {
    slug: "rent-reporting-platforms-2026",
    titleEn: "The 10 Best Platforms to Report Rent and Utilities to Credit Bureaus in 2026",
    titleEs: "Las 10 Mejores Plataformas para Reportar Renta y Servicios al Buró de Crédito en 2026",
    descEn: "We compare every platform available in the US — what they cost, what they report, and why some are worth paying for.",
    descEs: "Comparamos cada plataforma disponible en USA — cuánto cuestan, qué reportan y por qué algunas vale la pena pagar.",
    date: "June 2026",
    readTime: "8 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
    category: "credito",
  },
  {
    slug: "how-to-dispute-credit-report-errors",
    titleEn: "How to Dispute Credit Report Errors (Step by Step, for Free)",
    titleEs: "Cómo Disputar Errores en tu Reporte de Crédito (Paso a Paso y Gratis)",
    descEn: "1 in 5 credit reports has an error. Here's exactly what to check, how to pull your free report, and how to dispute mistakes directly with the bureaus — no paid service needed.",
    descEs: "1 de cada 5 reportes de crédito tiene un error. Aquí te decimos exactamente qué revisar, cómo pedir tu reporte gratis y cómo disputar errores directo con los burós — sin pagar a nadie.",
    date: "August 2026",
    readTime: "6 min",
    tag: "Credit Score",
    tagColor: "rgba(79,124,255,0.1)",
    tagText: "#7ba7ff",
    category: "credito",
  },
];
