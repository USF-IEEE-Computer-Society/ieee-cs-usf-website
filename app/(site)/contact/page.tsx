import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with IEEE Computer Society at USF. Contact us for collaborations, mentorship opportunities, tech talks, or general inquiries.',
}

export default function Page() {
  return <ContactClient />
}
