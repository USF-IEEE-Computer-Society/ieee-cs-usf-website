import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { RichText } from '@/app/components/RichText'
import type { Article, Media, User } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import ShareButtons from './ShareButtons'
import Button from '@/app/components/Button'
import BackToNewsLink from './BackToNewsLink'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
  })

  if (!docs.length) {
    return { title: 'Article Not Found' }
  }

  const article = docs[0] as Article
  const featuredImage = article.featuredImage as Media | null
  const author = article.author as User | null
  const description = `Read "${article.title}" on IEEE CS at USF`

  return {
    title: article.title,
    description,
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: author?.name ? [author.name] : undefined,
      images: featuredImage?.url
        ? [
            {
              url: featuredImage.url,
              width: featuredImage.width || 1200,
              height: featuredImage.height || 675,
              alt: featuredImage.alt || article.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: featuredImage?.url ? [featuredImage.url] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
  })

  if (!docs.length) {
    notFound()
  }

  const article = docs[0] as Article
  const featuredImage = article.featuredImage as Media | null
  const author = article.author as User | null
  const TechXArticle = article.title.includes("TechX")

  return (
    <main className="min-h-screen pt-28 pb-16 px-6">
      <article className="max-w-4xl mx-auto">
        <BackToNewsLink />

        <header className="mb-10">
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-muted text-sm mb-6">
            {author && (
              <>
                <span className="font-medium text-foreground">{author.name}</span>
                <span className="w-1 h-1 rounded-full bg-muted" />
              </>
            )}
            <time>
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <ShareButtons title={article.title} slug={article.slug} />
        </header>

        {featuredImage?.url && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title}
              width={featuredImage.width || 1200}
              height={featuredImage.height || 675}
              className="w-full md:w-[80%] md:mx-auto h-auto"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-a:text-ieeeOrange prose-a:no-underline hover:prose-a:underline">
          <RichText content={article.content as SerializedEditorState} />
        </div>

        {TechXArticle && (
          <div className="mt-12 flex justify-center">
            <Button text="Learn More About TechX 2025" href="https://techxflorida.com/2025/report" />
          </div>
        )}
      </article>
    </main>
  )
}
