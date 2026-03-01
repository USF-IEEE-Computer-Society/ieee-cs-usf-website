'use client'

import { Users, MicVocal, Building2 } from 'lucide-react'
import Image from 'next/image'
import FadeInSection from '@/app/components/FadeInSection'

const techxImages = [
  '/assets/techx/USF_CS_TechX_2025-34.webp',
  '/assets/techx/IMG_0241.webp',
  '/assets/techx/IMG_0298.webp',
  '/assets/techx/IMG_2203.webp',
  '/assets/techx/IMG_2363.webp',
  '/assets/techx/IMG_2445.webp',
  '/assets/techx/IMG_8358.webp',
  '/assets/techx/IMG_8514.webp',
  '/assets/techx/IMG_8547.webp',
  '/assets/techx/USF_CS_TechX_2025-02.webp',
  '/assets/techx/USF_CS_TechX_2025-05.webp',
  '/assets/techx/USF_CS_TechX_2025-06.webp',
  '/assets/techx/USF_CS_TechX_2025-09.webp',
  '/assets/techx/USF_CS_TechX_2025-10.webp',
  '/assets/techx/USF_CS_TechX_2025-13.webp',
  '/assets/techx/USF_CS_TechX_2025-16.webp',
  '/assets/techx/USF_CS_TechX_2025-18.webp',
  '/assets/techx/USF_CS_TechX_2025-76.webp',
]

const techxStats = [
  { value: '336', label: 'attendees', color: 'from-ieeeOrange to-ieeeDark' },
  { value: '11', label: 'talks', color: 'from-ieeeDark to-ieeeDarkblue' },
  { value: '9', label: 'companies', color: 'from-ieeeBlue to-ieeeDarkblue' },
]

const techxCards = [
  {
    icon: MicVocal,
    title: 'Industry Talks',
    text: '11 presentations from AI leaders at Microsoft, JP Morgan, Verizon, Intel, including "Careers in Tech" panel discussion.',
  },
  {
    icon: Users,
    title: 'Attendance',
    text: '336 attendees from 500+ registrations, representing 9 educational institutions with 40% being professionals from the Tampa Bay area.',
  },
  {
    icon: Building2,
    title: 'Career Fair',
    text: '5 hours of career fair with 9 companies: Verizon, Uber AI, ICode, ISACA, USF IT, IronEagleX, Tampa Devs, and more.',
  },
]

export default function TechX() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Dark immersive background */}
      <div className="absolute inset-0 bg-[#070A12]" />

      {/* Mosaic background */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 opacity-15">
        {techxImages.map((src, index) => (
          <div key={index} className="aspect-square overflow-hidden relative">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
            />
          </div>
        ))}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-[#070A12]/80 via-transparent to-[#070A12]/90" />
      <div className="absolute inset-0 bg-linear-to-r from-[#070A12]/60 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 md:py-32">
        <FadeInSection>
          <div className="text-center mb-16">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              Flagship Conference
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-3">
              TechX
            </h2>
            <p className="text-white/50 text-lg">
              Our annual conference &mdash; <span className="text-ieeeOrange font-semibold">TechX AI Conference 2025</span>
            </p>
          </div>
        </FadeInSection>

        {/* Big stat bubbles */}
        <FadeInSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {techxStats.map((stat) => (
              <div
                key={stat.label}
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-linear-to-br ${stat.color} flex flex-col items-center justify-center shadow-2xl shadow-black/30`}
              >
                <span className="font-display text-4xl md:text-5xl font-bold text-white">{stat.value}</span>
                <span className="text-white/70 text-xs md:text-sm font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeInSection>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
          {techxCards.map((card, index) => (
            <FadeInSection key={card.title} delay={0.15 + index * 0.1}>
              <div className="h-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/8 hover:border-ieeeOrange/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-ieeeOrange/15">
                    <card.icon className="text-ieeeOrange" strokeWidth={1.5} size={22} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{card.text}</p>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4}>
          <div className="text-center">
            <a
              href="https://www.techxflorida.com/2025/report"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-display text-sm font-bold uppercase tracking-wider rounded-xl bg-ieeeOrange text-ieeeDarkblue hover:bg-ieeeDark hover:shadow-lg hover:shadow-ieeeOrange/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn more about TechX 2025
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
