import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.ieeecsusf.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/people`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/constitution`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = []

  try {
    const payload = await getPayload({ config })
    const articles = await payload.find({
      collection: 'articles',
      where: {
        status: {
          equals: 'published',
        },
      },
      limit: 1000,
    })

    articlePages = articles.docs.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    // If payload fails (e.g., during build without DB), return only static pages
    console.error('Failed to fetch articles for sitemap:', error)
  }

  return [...staticPages, ...articlePages]
}
