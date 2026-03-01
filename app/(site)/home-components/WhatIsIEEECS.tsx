'use client'

import FadeInSection from '@/app/components/FadeInSection'
import IEEElogo from "@/app/(site)/assets/ieee-logo.png"
import IEEECSlogo from "@/app/(site)/assets/csociety_logo.webp"

export default function WhatIsIEEECS() {
  return (
    <section className="relative w-full py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              Who We Are
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              What is IEEE Computer Society?
            </h2>
            <p className="text-muted text-lg">
              Pronounced as the <strong className="text-foreground">I Triple E</strong> Computer Society.
            </p>
          </div>
        </FadeInSection>

        <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
          <FadeInSection delay={0.1}>
            <div className="glass-card p-8 flex flex-col h-full">
              <div className="flex justify-center mb-6 p-4 rounded-2xl bg-surfaceAlt">
                <img src={IEEElogo.src} alt="IEEE Logo" className="w-48 h-auto" />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-mutedStrong leading-relaxed">
                  IEEE is a global organization with broad engineering and technology focus (electronics, computing, power, robotics, etc.). IEEE stands for Institute of Electrical and Electronics Engineers.
                </p>
                <a
                  href="https://www.ieee.org/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ieeeOrange hover:text-ieeeDark font-semibold mt-auto pt-4 transition-colors group"
                >
                  Learn more about IEEE
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="glass-card p-8 flex flex-col h-full">
              <div className="flex justify-center mb-6 p-4 rounded-2xl bg-surfaceAlt">
                <img src={IEEECSlogo.src} alt="IEEE Computer Society Logo" className="w-48 h-auto" />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-mutedStrong leading-relaxed mb-3">
                  IEEE Computer Society is a technical society of IEEE dedicated to computing: hardware, software, standards and people.
                </p>
                <p className="text-mutedStrong leading-relaxed">
                  <strong className="font-display font-bold text-foreground">370,000+</strong> community members worldwide
                </p>
                <a
                  href="https://www.computer.org/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ieeeOrange hover:text-ieeeDark font-semibold mt-auto pt-4 transition-colors group"
                >
                  Learn more about IEEE CS
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
