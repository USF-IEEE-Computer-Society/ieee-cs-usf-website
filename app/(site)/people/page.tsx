import type { Metadata } from 'next'
import PeopleClient from './PeopleClient'

export const metadata: Metadata = {
  title: 'People',
  description: 'Meet the executive board of IEEE Computer Society at USF.',
}

export default function Page() {
  return <PeopleClient />
}
