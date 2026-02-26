import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Learn about partners of IEEE CS at USF',
}

const partners = [
  { logo: 'JPMorgan-Chase-Logo-SVG-preview.jpg', url: 'https://www.jpmorganchase.com/' },
  { logo: 'Verizon_GlowWordmark_RGB_2025.webp', url: 'https://www.verizon.com/' },
  { logo: 'Cisco_logo_blue_2016.svg.png', url: 'https://www.cisco.com/' },
  { logo: 'tdevs_long_5000x1000.png', url: 'https://tampadevs.com/' },
  { logo: 'java.webp', url: 'https://www.tampajug.com/' },
  { logo: 'ISACA_logo_WestFlorida_RGB.webp', url: 'https://engage.isaca.org/westfloridachapter/home' },
  { logo: 'information-technology-lightbg-2c-rgb-h.webp', url: 'https://www.usf.edu/it/' },
  { logo: 'Op1-Bellini-caicc-green_text-2c-rgb-v.jpg', url: 'https://www.usf.edu/ai-cybersecurity-computing/' },
  { logo: 'usf_foundations_of_engineering_cover.jpg', url: 'https://www.usf.edu/engineering/' },
  { logo: 'Couchbase_Logo.webp', url: 'https://www.couchbase.com/' },
  { logo: 'icode.webp', url: 'https://www.icodeschool.com/' },
  { logo: 'IEX_GDIT_black.webp', url: 'https://www.gdit.com/' },
  { logo: 'uberai.webp', url: 'https://www.uber.com/us/en/ai-solutions/' },
]

export default function Partners() {
  return (
    <main className="min-h-screen pt-16 pb-12 px-8 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Partners</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">Our valued partners and sponsors.</p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-32 p-0 md:p-4 rounded-lg transition-opacity duration-200 hover:opacity-70 dark:bg-white dark:rounded-xl"
            >
              <Image
                src={`/assets/logos/${partner.logo}`}
                alt={partner.logo.replace(/\.(webp|svg|png|jpg)$/i, '').replace(/_/g, ' ')}
                width={200}
                height={100}
                className="object-contain max-w-full max-h-full"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
