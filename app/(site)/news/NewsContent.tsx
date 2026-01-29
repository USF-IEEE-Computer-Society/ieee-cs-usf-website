'use client'

import { useEffect, ReactNode } from 'react'

type NewsContentProps = {
  children: ReactNode
}

export default function NewsContent({ children }: NewsContentProps) {
  useEffect(() => {
    // Restore scroll position if returning from an article
    const savedScrollPosition = sessionStorage.getItem('newsScrollPosition')
    if (savedScrollPosition) {
      // Use requestAnimationFrame to ensure the page has rendered
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10))
        // Clear the saved position after restoring
        sessionStorage.removeItem('newsScrollPosition')
      })
    }
  }, [])

  return <>{children}</>
}
