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
    <div className='w-1/3 flex flex-col items-center dark:text-gray-200'>
      <Icon size={45} />
      <div className='flex flex-col items-center mt-4 text-center'>
        <h2 className='text-2xl'>
          <CountUp end={value} duration={1.5} />
          {showPlus && '+'}
        </h2>
        <h2 className='text-sm md:text-lg'>{label}</h2>
      </div>
    </div>
  )
}
