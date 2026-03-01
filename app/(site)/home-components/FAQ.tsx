'use client'

import { useState } from 'react'
import { Questions } from '@/app/(site)/data/faqData'
import FadeInSection from '@/app/components/FadeInSection'

export default function FAQ() {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-surfaceAlt/50 dark:bg-surfaceAlt/30" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              Questions
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              FAQ
            </h2>
          </div>
        </FadeInSection>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {Questions.map((q, index) => {
            const open = openMenus[q.id]

            return (
              <FadeInSection key={q.id} delay={index * 0.05}>
                <div className="w-full">
                  <button
                    onClick={() => toggle(q.id)}
                    aria-expanded={open}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 text-left rounded-2xl border transition-all duration-300 group ${
                      open
                        ? 'bg-ieeeOrange/10 border-ieeeOrange/30 rounded-b-none'
                        : 'bg-surface border-borderColor hover:border-ieeeOrange/30 hover:bg-ieeeOrange/5'
                    }`}
                  >
                    <span className="font-display text-sm md:text-base font-semibold text-foreground leading-snug pr-2">
                      {q.Question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className={`w-5 h-5 shrink-0 text-ieeeOrange transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 py-4 bg-surface border border-t-0 border-borderColor rounded-b-2xl">
                        <p
                          className="text-sm leading-relaxed text-mutedStrong"
                          dangerouslySetInnerHTML={{ __html: q.Response }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
