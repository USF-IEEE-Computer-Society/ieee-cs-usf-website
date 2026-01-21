import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

const ARTICLES_PER_PAGE = 9

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || '1', 10))
  
  const payload = await getPayload({ config })
  const articles = await payload.find({
    collection: 'articles',
    limit: ARTICLES_PER_PAGE,
    page: currentPage,
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedDate',
  })

  const totalPages = articles.totalPages

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8">News</h1>

        {articles.docs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No articles published yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.docs.map((article) => {
                const typedArticle = article as Article
                const featuredImage = typedArticle.featuredImage as Media | null

                return (
                  <Link
                    key={typedArticle.id}
                    href={`/news/${typedArticle.slug}`}
                    className="block bg-gray-50/10 rounded-lg overflow-hidden transition-colors shadow-md"
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

            {/* Pagination */}
            {totalPages > 1 && (
              <nav className="flex justify-center items-center gap-2 mt-12">
                <Link
                  href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    currentPage === 1
                      ? 'border-gray-200 text-gray-300 pointer-events-none'
                      : 'border-gray-300 text-black hover:border-ieeeDark hover:text-ieeeDark'
                  }`}
                  aria-disabled={currentPage === 1}
                >
                  Previous
                </Link>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                      key={pageNum}
                      href={`/news?page=${pageNum}`}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 transition-colors ${
                        pageNum === currentPage
                          ? 'bg-ieeeDark border-ieeeDark text-white'
                          : 'border-gray-300 text-black hover:border-ieeeDark hover:text-ieeeDark'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  ))}
                </div>

                <Link
                  href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                    currentPage === totalPages
                      ? 'border-gray-200 text-gray-300 pointer-events-none'
                      : 'border-gray-300 text-black hover:border-ieeeDark hover:text-ieeeDark'
                  }`}
                  aria-disabled={currentPage === totalPages}
                >
                  Next
                </Link>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}
