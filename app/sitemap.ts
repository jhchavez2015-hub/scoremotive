import { MetadataRoute } from 'next'
import { blogPosts } from './[locale]/blog/posts-meta'
import { glossaryTerms } from './[locale]/glossary/glossary-meta'

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

// Converts "June 2026" -> "2026-06-01". Falls back to today's date if the
// format doesn't match, so a malformed date in posts-meta.ts never breaks the build.
function parsePostDate(dateStr: string): string {
  const months: Record<string, string> = {
    January: '01', February: '02', March: '03', April: '04',
    May: '05', June: '06', July: '07', August: '08',
    September: '09', October: '10', November: '11', December: '12',
  }
  const [monthName, year] = dateStr.split(' ')
  const month = months[monthName]
  if (!month || !year) return new Date().toISOString().split('T')[0]
  return `${year}-${month}-01`
}

const today = new Date().toISOString().split('T')[0]

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...entry('', '2026-06-20', 'weekly', 1),
    ...entry('/blog', '2026-06-16', 'weekly', 0.8),
    ...entry('/tools', '2026-06-20', 'monthly', 0.9),
    ...entry('/about', '2026-06-11', 'monthly', 0.6),
    ...entry('/legal', '2026-06-11', 'yearly', 0.4),
    ...entry('/glossary', today, 'monthly', 0.7),
    ...blogPosts.flatMap((post) =>
      entry(`/blog/${post.slug}`, parsePostDate(post.date), 'monthly', 0.8)
    ),
    ...glossaryTerms.flatMap((term) =>
      entry(`/glossary/${term.slug}`, today, 'monthly', 0.6)
    ),
  ]
}
