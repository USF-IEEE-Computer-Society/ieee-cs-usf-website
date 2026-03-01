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
    <main className="min-h-screen pt-28 pb-16 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-14">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-2 block">
            Collaborations
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3">
            Partners
          </h1>
          <p className="text-muted text-lg">Our valued partners and sponsors.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner, index) => (
            <Link
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center justify-center h-36 p-6 group"
            >
              <Image
                src={`/assets/logos/${partner.logo}`}
                alt={partner.logo.replace(/\.(webp|svg|png|jpg)$/i, '').replace(/_/g, ' ')}
                width={200}
                height={100}
                className="object-contain max-w-full max-h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:opacity-90"
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
