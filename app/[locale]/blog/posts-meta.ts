// NOTE: app/[locale]/blog/page.tsx (blog index) keeps its own separate `posts` array
// instead of importing this file — see TODO there. Adding a new article means editing
// both this file and that one until they're consolidated.
export const blogPosts = [
  {
    slug: "fico-8-vs-fico-10t",
    titleEn: "FICO 8 vs FICO 10T: What's the Difference and Why It Matters",
    titleEs: "FICO 8 vs FICO 10T: Cuál es la Diferencia y Por Qué Importa",
    tag: "FICO Score",
  },
  {
    slug: "debt-avalanche-vs-snowball",
    titleEn: "Debt Avalanche vs Debt Snowball: Which Pays Off Debt Faster",
    titleEs: "Avalancha vs Bola de Nieve: Cuál Liquida Deudas Más Rápido",
    tag: "Debt",
  },
  {
    slug: "hard-inquiry",
    titleEn: "What Is a Hard Inquiry? How It Affects Your Credit Score",
    titleEs: "¿Qué es un Hard Inquiry? Cómo Afecta tu Credit Score",
    tag: "Credit Score",
  },
  {
    slug: "raise-credit-score-100-points",
    titleEn: "How to Raise Your Credit Score 100 Points in 6 Months",
    titleEs: "Cómo Subir tu Credit Score 100 Puntos en 6 Meses",
    tag: "Credit Score",
  },
  {
    slug: "rent-utilities-credit-score",
    titleEn: "How Your Rent and Utility Bills Can Raise Your Credit Score",
    titleEs: "Cómo tu Renta y Servicios Pueden Subir tu Credit Score",
    tag: "Credit Score",
  },
  {
    slug: "rent-reporting-platforms-2026",
    titleEn: "The 10 Best Platforms to Report Rent and Utilities to Credit Bureaus in 2026",
    titleEs: "Las 10 Mejores Plataformas para Reportar Renta y Servicios al Buró de Crédito en 2026",
    tag: "Credit Score",
  },
];
