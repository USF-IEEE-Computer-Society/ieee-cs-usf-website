import type { Metadata } from "next";
import React from "react";
import { Montserrat } from "next/font/google";
import '@/app/globals.css';

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ieeecsusf.com'),
  title: {
    default: 'IEEE CS at USF',
    template: '%s | IEEE CS at USF',
  },
  description: 'IEEE Computer Society at the University of South Florida - Join workshops, mentorship programs, tech talks, and a thriving community for computer science students in Tampa.',
  keywords: [
    'IEEE',
    'Computer Society',
    'USF',
    'University of South Florida',
    'CS club',
    'computer science',
    'tech community',
    'Tampa',
    'student organization',
    'workshops',
    'mentorship',
    'TechX',
  ],
  authors: [{ name: 'IEEE Computer Society at USF' }],
  creator: 'IEEE Computer Society at USF',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.ieeecsusf.com',
    siteName: 'IEEE CS at USF',
    title: 'IEEE Computer Society at USF',
    description: 'Join workshops, mentorship programs, tech talks, and a thriving community for computer science students at USF.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'IEEE Computer Society at USF',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IEEE Computer Society at USF',
    description: 'Join workshops, mentorship programs, tech talks, and a thriving community for computer science students at USF.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
