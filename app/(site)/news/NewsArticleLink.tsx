'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type NewsArticleLinkProps = {
  href: string
  children: ReactNode
  className?: string
  currentPage: number
}

export default function NewsArticleLink({ href, children, className, currentPage }: NewsArticleLinkProps) {
  const handleClick = () => {
    // Store the current page number and scroll position when navigating to an article
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('newsPage', currentPage.toString())
      sessionStorage.setItem('newsScrollPosition', window.scrollY.toString())
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
