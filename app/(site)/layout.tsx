import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { PostHogProvider } from './providers';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'IEEE Computer Society at USF',
  alternateName: ['IEEE CS at USF', 'IEEE-CS USF'],
  url: 'https://www.ieeecsusf.com',
  logo: 'https://www.ieeecsusf.com/ieee_cs_usf_logo_black.png',
  description:
    'IEEE Computer Society Student Branch Chapter at the University of South Florida - Workshops, mentorship, tech talks, and community for CS students.',
  foundingDate: '2021-05-27',
  sameAs: [
    'https://www.instagram.com/ieeecs_usf',
    'https://www.linkedin.com/company/ieee-cs-at-usf/',
    'https://linktr.ee/ieeecsusf',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tampa',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: 'IEEE Computer Society',
    url: 'https://www.computer.org',
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <PostHogProvider>
        <div className="relative min-h-screen flex flex-col">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </PostHogProvider>
    </ThemeProvider>
  );
}
