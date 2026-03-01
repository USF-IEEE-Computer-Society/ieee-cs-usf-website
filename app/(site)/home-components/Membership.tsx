'use client'

import FadeInSection from '@/app/components/FadeInSection'
import { Award, Briefcase, Ticket } from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Scholarships and Awards',
    text: 'Over US$40,000 is available each year across three different scholarship opportunities. Most winners receive US$1,000.',
  },
  {
    icon: Briefcase,
    title: 'Internship Edge',
    text: 'Access to a real network (students, alumni, professionals) + referrals happen through people.',
  },
  {
    icon: Ticket,
    title: 'Conference Discounts',
    text: 'Reduced rates for IEEE/IEEE CS conferences (and sometimes local events).',
  },
]

export default function Membership() {
  return (
    <section className="relative w-full py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6">
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-3 block">
              Join Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Membership
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Join global IEEE Computer Society. <strong className="text-foreground">No membership required for our events!</strong>
            </p>
          </div>
        </FadeInSection>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          {/* Benefits */}
          <div className="flex flex-col gap-6 flex-1">
            {benefits.map((benefit, index) => (
              <FadeInSection key={benefit.title} delay={index * 0.1}>
                <div className="flex items-start gap-4 group">
                  <div className="p-2.5 rounded-xl bg-ieeeOrange/10 text-ieeeOrange shrink-0 group-hover:bg-ieeeOrange group-hover:text-white transition-all duration-300">
                    <benefit.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-mutedStrong text-sm leading-relaxed">{benefit.text}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Pricing card */}
          <FadeInSection delay={0.2} direction="left">
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-ieeeOrange/30 to-ieeeBlue/20 blur-lg opacity-60" />
              <div className="relative glass-card px-10 py-10 flex flex-col items-center text-center hover:transform-none">
                <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-muted mb-2">
                  Annual Student Membership
                </span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-ieeeOrange text-lg">$</span>
                  <span className="font-display text-7xl font-bold text-foreground">40</span>
                </div>
                <span className="text-muted text-sm mb-6">per year</span>
                <a
                  href="https://www.computer.org/membership/join"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wider rounded-xl bg-ieeeOrange text-ieeeDarkblue hover:bg-ieeeDark hover:shadow-lg hover:shadow-ieeeOrange/20 hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  Join Now
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
