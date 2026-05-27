import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const siteUrl = 'https://jelly-web-elements.vercel.app'
const description =
  'Cute kawaii-style web buttons and squishy copy-paste components for React, TypeScript, and Tailwind CSS apps.'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jelly UI | Cute Kawaii Web Buttons for TypeScript',
    template: '%s | Jelly UI',
  },
  description,
  applicationName: 'Jelly UI',
  creator: 'Alicia Wong',
  keywords: [
    'React components',
    'Tailwind CSS components',
    'TypeScript components',
    'cute web buttons',
    'kawaii buttons',
    'React button component',
    'copy-paste UI',
    'component library',
    'Jelly UI',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Jelly UI | Cute Kawaii Web Buttons for TypeScript',
    description,
    siteName: 'Jelly UI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jelly UI | Cute Kawaii Web Buttons for TypeScript',
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'nNJZNk0SfTu5Zn4oHJCn6o4hovOxyI5Z8r0-FuNS01k',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-light-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    shortcut: '/icon-light-32x32.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: 'Jelly UI',
    description,
    url: siteUrl,
    codeRepository: 'https://github.com/aliciaww/jelly-ui',
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: ['TypeScript', 'CSS'],
    keywords: 'cute kawaii web buttons, React components, TypeScript components, Tailwind CSS',
    author: {
      '@type': 'Person',
      name: 'Alicia Wong',
    },
  }

  return (
    <html lang="en" className={`${quicksand.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  )
}
