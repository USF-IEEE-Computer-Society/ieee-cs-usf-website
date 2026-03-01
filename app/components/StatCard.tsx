'use client'

import { LucideIcon } from 'lucide-react'
import CountUp from 'react-countup'

interface StatCardProps {
  icon: LucideIcon
  value: number
  label: string
  showPlus?: boolean
}

export default function StatCard({ icon: Icon, value, label, showPlus = true }: StatCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-5 md:px-6 md:py-6 rounded-2xl bg-surface/80 dark:bg-surface/80 border border-borderColor backdrop-blur-sm group hover:border-ieeeOrange/30 transition-all duration-300">
      <div className="p-2.5 rounded-xl bg-ieeeOrange/10 text-ieeeOrange group-hover:bg-ieeeOrange/20 transition-colors duration-300">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="font-display text-2xl md:text-3xl font-bold text-foreground">
          <CountUp end={value} duration={2} />
          {showPlus && <span className="text-ieeeOrange">+</span>}
        </span>
        <span className="text-xs md:text-sm text-muted uppercase tracking-wider font-medium mt-1">
          {label}
        </span>
      </div>
    </div>
  )
}
