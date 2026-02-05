import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { Montserrat } from "next/font/google";
import '@/app/globals.css';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div className={`${montserrat.className} antialiased bg-white`}>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-4 py-32">
        <h1 className="text-9xl font-bold text-ieeeDark">404</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500 text-center max-w-md">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-8 px-6 py-3 bg-ieeeDark text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}