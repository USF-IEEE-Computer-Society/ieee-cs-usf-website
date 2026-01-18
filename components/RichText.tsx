import React from 'react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  content: SerializedEditorState | null | undefined
  className?: string
}

// Helper to extract text content from Lexical nodes
function renderNode(node: Record<string, unknown>): React.ReactNode {
  const type = node.type as string
  const children = node.children as Record<string, unknown>[] | undefined

  // Text node
  if (type === 'text') {
    let text = node.text as string
    const format = node.format as number | undefined

    // Handle text formatting
    if (format) {
      if (format & 1) text = `<strong>${text}</strong>` // bold
      if (format & 2) text = `<em>${text}</em>` // italic
      if (format & 8) text = `<u>${text}</u>` // underline
      if (format & 4) text = `<s>${text}</s>` // strikethrough
      if (format & 16) text = `<code>${text}</code>` // code
    }

    return <span key={Math.random()} dangerouslySetInnerHTML={{ __html: text }} />
  }

  // Paragraph
  if (type === 'paragraph') {
    return (
      <p key={Math.random()} className="mb-4">
        {children?.map(renderNode)}
      </p>
    )
  }

  // Headings
  if (type === 'heading') {
    const tag = node.tag as string
    const HeadingTag = tag as keyof JSX.IntrinsicElements
    const headingClasses: Record<string, string> = {
      h1: 'text-4xl font-bold mb-6',
      h2: 'text-3xl font-bold mb-5',
      h3: 'text-2xl font-bold mb-4',
      h4: 'text-xl font-bold mb-3',
      h5: 'text-lg font-bold mb-2',
      h6: 'text-base font-bold mb-2',
    }
    return (
      <HeadingTag key={Math.random()} className={headingClasses[tag] || 'font-bold mb-4'}>
        {children?.map(renderNode)}
      </HeadingTag>
    )
  }

  // List
  if (type === 'list') {
    const listType = node.listType as string
    if (listType === 'bullet') {
      return (
        <ul key={Math.random()} className="list-disc list-inside mb-4 space-y-1">
          {children?.map(renderNode)}
        </ul>
      )
    }
    return (
      <ol key={Math.random()} className="list-decimal list-inside mb-4 space-y-1">
        {children?.map(renderNode)}
      </ol>
    )
  }

  // List item
  if (type === 'listitem') {
    return <li key={Math.random()}>{children?.map(renderNode)}</li>
  }

  // Quote
  if (type === 'quote') {
    return (
      <blockquote
        key={Math.random()}
        className="border-l-4 border-gray-500 pl-4 italic my-4"
      >
        {children?.map(renderNode)}
      </blockquote>
    )
  }

  // Link
  if (type === 'link') {
    const fields = node.fields as { url?: string } | undefined
    return (
      <a
        key={Math.random()}
        href={fields?.url || '#'}
        className="text-blue-400 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children?.map(renderNode)}
      </a>
    )
  }

  // Linebreak
  if (type === 'linebreak') {
    return <br key={Math.random()} />
  }

  // Default: render children if they exist
  if (children) {
    return <React.Fragment key={Math.random()}>{children.map(renderNode)}</React.Fragment>
  }

  return null
}

export function RichText({ content, className = '' }: Props) {
  if (!content || !content.root) {
    return null
  }

  const root = content.root as Record<string, unknown>
  const children = root.children as Record<string, unknown>[] | undefined

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      {children?.map(renderNode)}
    </div>
  )
}
