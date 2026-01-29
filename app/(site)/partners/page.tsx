import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Learn about partners of IEEE CS at USF',
}

const logoFiles = [

  'JPMorgan-Chase-Logo-SVG-preview.jpg',
  'Verizon_GlowWordmark_RGB_2025.webp',
  'Cisco_logo_blue_2016.svg.png',


  'tdevs_long_5000x1000.png',

  'java.webp',
  'ISACA_logo_WestFlorida_RGB.webp',
  'information-technology-lightbg-2c-rgb-h.webp',
 'Op1-Bellini-caicc-green_text-2c-rgb-v.jpg',
  'usf_foundations_of_engineering_cover.jpg',
  'Couchbase_Logo.webp',
  'icode.webp',
  'IEX_GDIT_black.webp',
  'uberai.webp',


]

export default function Partners() {
  return (
    <main className="min-h-screen pt-16 pb-12 px-8 bg-white text-black">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Partners</h1>
        <p className="text-gray-600 mb-12 text-lg">Our valued partners and sponsors.</p>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
          {logoFiles.map((logo, index) => (
            <div 
              key={index}
              className="flex items-center justify-center w-full h-32 p-0 md:p-4 rounded-lg transition-colors duration-200"
            >
              <Image
                src={`/assets/logos/${logo}`}
                alt={logo.replace(/\.(webp|svg)$/i, '').replace(/_/g, ' ')}
                width={200}
                height={100}
                className="object-contain max-w-full max-h-full"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
