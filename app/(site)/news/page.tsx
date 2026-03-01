import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Article, Media } from '@/payload-types'
import type { Metadata } from 'next'
import NewsArticleLink from './NewsArticleLink'
import NewsContent from './NewsContent'

export const metadata: Metadata = {
  title: 'News',
  description: 'Stay updated with the latest news from IEEE Computer Society at USF.',
}

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
    <NewsContent>
      <main className="min-h-screen pt-28 pb-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-2 block">
              Latest Updates
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              News
            </h1>
          </div>

          {articles.docs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted text-lg">No articles published yet.</p>
              <p className="text-muted mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.docs.map((article) => {
                  const typedArticle = article as Article
                  const featuredImage = typedArticle.featuredImage as Media | null

                  return (
                    <NewsArticleLink
                      key={typedArticle.id}
                      href={`/news/${typedArticle.slug}`}
                      className="glass-card overflow-hidden group"
                      currentPage={currentPage}
                    >
                      {featuredImage?.url && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={featuredImage.url}
                            alt={featuredImage.alt || typedArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <time className="text-xs font-bold uppercase tracking-wider text-ieeeOrange">
                          {new Date(typedArticle.publishedDate).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </time>
                        <h2 className="font-display text-lg font-bold mt-2 text-foreground group-hover:text-ieeeOrange transition-colors">
                          {typedArticle.title}
                        </h2>
                      </div>
                    </NewsArticleLink>
                  )
                })}
              </div>

              {totalPages > 1 && (
                <nav className="flex justify-center items-center gap-2 mt-16">
                  <Link
                    href={currentPage > 1 ? `/news?page=${currentPage - 1}` : '#'}
                    className={`px-5 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider border transition-all ${
                      currentPage === 1
                        ? 'border-borderColor text-muted pointer-events-none'
                        : 'border-borderStrong text-foreground hover:border-ieeeOrange hover:text-ieeeOrange'
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
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-display text-sm font-bold border transition-all ${
                          pageNum === currentPage
                            ? 'bg-ieeeOrange border-ieeeOrange text-ieeeDarkblue'
                            : 'border-borderStrong text-foreground hover:border-ieeeOrange hover:text-ieeeOrange'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={currentPage < totalPages ? `/news?page=${currentPage + 1}` : '#'}
                    className={`px-5 py-2.5 rounded-xl font-display text-sm font-bold uppercase tracking-wider border transition-all ${
                      currentPage === totalPages
                        ? 'border-borderColor text-muted pointer-events-none'
                        : 'border-borderStrong text-foreground hover:border-ieeeOrange hover:text-ieeeOrange'
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
      </main>
    </NewsContent>
  )
}
