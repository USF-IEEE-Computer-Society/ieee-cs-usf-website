import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { ThemeProvider } from '@/app/components/ThemeProvider'

export default function NotFound() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 circuit-dots" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-ieeeOrange/5 blur-3xl" />

          <div className="relative text-center">
            <h1 className="font-display text-[10rem] md:text-[14rem] font-bold leading-none text-gradient">
              404
            </h1>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground -mt-4 mb-4">
              Page Not Found
            </h2>
            <p className="text-muted max-w-md mx-auto mb-10">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider rounded-xl bg-ieeeOrange text-ieeeDarkblue hover:bg-ieeeDark hover:shadow-lg hover:shadow-ieeeOrange/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
