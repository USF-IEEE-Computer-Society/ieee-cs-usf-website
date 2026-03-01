'use client'

import FadeInSection from '@/app/components/FadeInSection'
import { Trophy } from 'lucide-react'

const achievements = [
  {
    title: '3 USF Awards (2025)',
    description: 'Won "Best Social Media", "Best Workshop Series", and "Best Picture" from University of South Florida College of Engineering Student Council.',
    link: 'https://www.ieeecsusf.com/news/ieee-cs-at-usf-wins-three-awards-at-the-usf-engineering-banquet',
    linkText: 'View Recap',
  },
  {
    title: 'IEEE Recognition',
    description: 'Awarded by IEEE Florida West Coast Section for "Being a National Leader for Total Events and Hosting TechX Conference for 2 years".',
    link: 'https://www.ieeecsusf.com/news/ieee-computer-society-student-branch-celebrates-award-at-florida-west-coast-banquet',
    linkText: 'View Recap',
  },
  {
    title: '#1 in the United States',
    description: 'Highest attendance of events and meetings among all student branch chapters in the US.',
  },
  {
    title: 'Richard E. Merwin Scholarship',
    description: 'Leaders from our chapter received this prestigious IEEE-CS scholarship 4 times.',
  },
]

export default function Achievements() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-surfaceAlt/50 dark:bg-surfaceAlt/30" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-r from-ieeeOrange/3 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              Track Record
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Achievements
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {achievements.map((item, index) => (
            <FadeInSection key={item.title} delay={index * 0.1}>
              <div className="glass-card p-7 h-full flex flex-col group">
                <div className="flex items-start gap-4 mb-3">
                  <div className="p-2 rounded-lg bg-ieeeOrange/10 text-ieeeOrange shrink-0 mt-0.5">
                    <Trophy size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                </div>

                <p className="text-mutedStrong text-sm leading-relaxed mb-3 pl-12">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-ieeeOrange hover:text-ieeeDark font-semibold text-sm mt-auto pl-12 transition-colors group/link"
                  >
                    {item.linkText}
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
