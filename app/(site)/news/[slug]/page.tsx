import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { RichText } from '@/components/RichText'
import type { Article, Media, User } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { ArrowLeft } from 'lucide-react'

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
  })

  if (!docs.length) {
    return { title: 'Article Not Found' }
  }

  const article = docs[0] as Article
  return {
    title: `${article.title} | IEEE CS at USF`,
    description: `Read "${article.title}" on IEEE CS at USF`,
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

  return (
    <div className="min-h-screen bg-white text-black">
      <article className="container mx-auto px-4 py-10 max-w-4xl">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back to News
        </Link>

        <header className="mb-8">
          <time className="text-gray-400">
            {new Date(article.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{article.title}</h1>
          {author && (
            <p className="text-gray-500 mt-2">By {author.name}</p>
          )}
        </header>

        {featuredImage?.url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt || article.title}
              width={featuredImage.width || 1200}
              height={featuredImage.height || 675}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg prose-invert max-w-none">
          <RichText content={article.content as SerializedEditorState} />
        </div>
      </article>
    </div>
  )
}
