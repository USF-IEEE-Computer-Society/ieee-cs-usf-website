'use client'

import Image from 'next/image'
import StatCard from '@/app/components/StatCard'
import { heroStats } from '@/app/(site)/data/heroData'
import heroImg from "@/public/hero.png"

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-linear-to-br from-ieeeDarkblue/5 via-transparent to-ieeeOrange/5 dark:from-ieeeDarkblue/20 dark:via-transparent dark:to-ieeeOrange/10" />

      {/* Geometric decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-ieeeOrange/5 dark:bg-ieeeOrange/3 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-ieeeBlue/5 dark:bg-ieeeBlue/3 blur-3xl" />

      {/* Circuit dot pattern */}
      <div className="absolute inset-0 circuit-dots" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col xl:flex-row items-center gap-12 xl:gap-16">

          {/* Text content */}
          <div className="flex-1 flex flex-col items-start">
            <div className="animate-fade-in-up">
              <span className="inline-block font-display text-xs font-bold uppercase tracking-[0.25em] text-ieeeOrange mb-4 px-3 py-1.5 rounded-full bg-ieeeOrange/10 border border-ieeeOrange/20">
                University of South Florida
              </span>
            </div>

            <h1 className="animate-fade-in-up stagger-1 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              <span className="text-foreground">IEEE</span>
              <br />
              <span className="text-gradient">Computer</span>
              <br />
              <span className="text-foreground">Society</span>
            </h1>

            <p className="animate-fade-in-up stagger-2 text-lg md:text-xl text-muted max-w-lg mb-10 leading-relaxed">
              Premier tech student organization. Workshops, mentorship, tech talks, and a community that launches careers.
            </p>

            <div className="animate-fade-in-up stagger-3 flex flex-wrap gap-3 w-full">
              {heroStats.map((stat, index) => (
                <div key={index} className="flex-1 min-w-[140px]">
                  <StatCard
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    showPlus={stat.showPlus}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="animate-fade-in-up stagger-2 shrink-0 w-full xl:w-auto">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-3xl bg-linear-to-br from-ieeeOrange/20 to-ieeeBlue/20 blur-xl opacity-60" />
              <div className="absolute -top-2 -right-2 w-20 h-20 border-t-2 border-r-2 border-ieeeOrange/40 rounded-tr-3xl" />
              <div className="absolute -bottom-2 -left-2 w-20 h-20 border-b-2 border-l-2 border-ieeeOrange/40 rounded-bl-3xl" />

              <Image
                src={heroImg}
                alt="IEEE CS at USF TechX Conference"
                className="relative w-[88vw] md:w-[600px] rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
    </section>
  )
}
