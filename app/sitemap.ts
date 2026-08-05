import { MetadataRoute } from 'next'

const baseUrl = 'https://scoremotive.com'
const locales = ['en', 'es'] as const

function entry(
  path: string,
  lastModified: string,
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>,
  priority: number
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        en: `${baseUrl}/en${path}`,
        es: `${baseUrl}/es${path}`,
        'x-default': `${baseUrl}/en${path}`,
      },
    },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry('', '2026-06-20', 'weekly', 1),
    ...entry('/blog', '2026-06-16', 'weekly', 0.8),
    ...entry('/tools', '2026-06-20', 'monthly', 0.9),
    ...entry('/about', '2026-06-11', 'monthly', 0.6),
    ...entry('/legal', '2026-06-11', 'yearly', 0.4),
    ...entry('/blog/fico-8-vs-fico-10t', '2026-06-11', 'monthly', 0.8),
    ...entry('/blog/debt-avalanche-vs-snowball', '2026-06-15', 'monthly', 0.8),
    ...entry('/blog/raise-credit-score-100-points', '2026-06-15', 'monthly', 0.8),
    ...entry('/blog/rent-utilities-credit-score', '2026-06-16', 'monthly', 0.8),
    ...entry('/blog/rent-reporting-platforms-2026', '2026-06-19', 'monthly', 0.8),
    ...entry('/blog/hard-inquiry', '2026-08-05', 'monthly', 0.7),
  ]
}
