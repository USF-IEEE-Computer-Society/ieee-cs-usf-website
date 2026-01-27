import type { Metadata } from 'next'
import PeopleClient from './PeopleClient'

export const metadata: Metadata = {
  title: 'Meet the Team',
  description: 'Meet the executive board and leadership team of IEEE Computer Society at USF. View current and past E-board members.',
}

export default function Page() {
  return <PeopleClient />
}
