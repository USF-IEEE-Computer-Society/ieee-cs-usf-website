import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { ThemeProvider } from '@/app/components/ThemeProvider'

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-9xl font-bold text-ieeeDark">404</h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Page Not Found
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-center max-w-md">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-8 px-6 py-3 bg-ieeeDark text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Return Home
          </Link>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}