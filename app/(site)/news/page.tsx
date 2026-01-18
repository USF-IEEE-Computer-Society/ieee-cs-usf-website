import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export default async function NewsPage() {
  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
  })

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8">News</h1>

        {articles.docs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles published yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {articles.docs.map((article) => {
              const typedArticle = article as Article
              const featuredImage = typedArticle.featuredImage as Media | null

              return (
                <Link
                  key={typedArticle.id}
                  href={`/news/${typedArticle.slug}`}
                  className="group block bg-white rounded-lg overflow-hidden transition-colors border-2"
                >
                  {featuredImage?.url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={featuredImage.url}
                        alt={featuredImage.alt || typedArticle.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <time className="text-sm text-ieeeDark">
                      {new Date(typedArticle.publishedDate).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                    <h2 className="text-xl font-semibold mt-2 transition-colors text-black">
                      {typedArticle.title}
                    </h2>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
