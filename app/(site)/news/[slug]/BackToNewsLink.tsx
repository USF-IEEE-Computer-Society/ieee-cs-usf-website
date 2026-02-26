'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function BackToNewsLink() {
  const [href, setHref] = useState('/news')

  useEffect(() => {
    // Retrieve the stored page number from sessionStorage
    if (typeof window !== 'undefined') {
      const savedPage = sessionStorage.getItem('newsPage')
      if (savedPage && savedPage !== '1') {
        setHref(`/news?page=${savedPage}`)
      }
    }
  }, [])

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-8"
    >
      <ArrowLeft size={20} />
      Back to News
    </Link>
  )
}
