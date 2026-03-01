'use client'

import FadeInSection from '@/app/components/FadeInSection'
import { Wrench, Presentation, Gift } from 'lucide-react'

const aboutCards = [
  {
    icon: Presentation,
    title: 'Career Preparation',
    description: 'We organize 13+ professional development events and workshops per semester. Career prep including certifications, resume building, interview skills, and soft skills development.',
    detail: 'Featuring talks and panels by interns, researchers, engineers, and companies from the IEEE Computer Society professional network.',
  },
  {
    icon: Wrench,
    title: 'Hands-on Workshops',
    description: 'Our workshops focus on hands-on hardware exploration and learning software tools used in professional software development.',
    detail: 'We will not teach you things that are as easy or entertaining to learn by watching YouTube.',
    italic: true,
  },
  {
    icon: Gift,
    title: 'Giveaways & Swag',
    description: 'At our events we give away tons of food, cat stickers, and IEEE Computer Society merch!',
    detail: 'We gave away more than $9,000 of Internet of Things (IoT) circuits in the last 2 years.',
  },
]

export default function About() {
  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-surfaceAlt/50 dark:bg-surfaceAlt/30" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-ieeeOrange/3 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              What We Do
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              About Us
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              We are a student branch chapter of IEEE Computer Society at the University of South Florida (Tampa, Florida).
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aboutCards.map((card, index) => (
            <FadeInSection key={card.title} delay={index * 0.12}>
              <div className="glass-card p-7 h-full flex flex-col group">
                <div className="mb-5 p-3 w-fit rounded-xl bg-ieeeOrange/10 text-ieeeOrange group-hover:bg-ieeeOrange group-hover:text-white transition-all duration-300">
                  <card.icon size={24} strokeWidth={1.5} />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {card.title}
                </h3>

                <p className="text-mutedStrong text-sm leading-relaxed mb-3">
                  {card.description}
                </p>

                <p className={`text-mutedStrong text-sm leading-relaxed mt-auto ${card.italic ? 'italic' : ''}`}>
                  {card.detail}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
