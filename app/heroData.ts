import { Users, ScrollText, UserLock, LucideIcon } from 'lucide-react'

export interface StatData {
  icon: LucideIcon
  value: number
  label: string
  showPlus?: boolean
}

export const heroStats: StatData[] = [
  {
    icon: Users,
    value: 649,
    label: 'members',
    showPlus: true
  },
  {
    icon: ScrollText,
    value: 128,
    label: 'events',
    showPlus: true
  },
  {
    icon: UserLock,
    value: 20,
    label: 'E-board members',
    showPlus: false
  }
]
