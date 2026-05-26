import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import './globals.css'

const siteUrl = 'https://jelly-web-elements.vercel.app'
const description =
  'Squishy copy-paste React and Tailwind CSS components with playful jelly interactions.'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Jelly UI | Squishy React and Tailwind Components',
    template: '%s | Jelly UI',
  },
  description,
  applicationName: 'Jelly UI',
  creator: 'Alicia Wong',
  keywords: [
    'React components',
    'Tailwind CSS components',
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
    title: 'Jelly UI | Squishy React and Tailwind Components',
    description,
    siteName: 'Jelly UI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jelly UI | Squishy React and Tailwind Components',
    description,
  },
  robots: {
    index: true,
    follow: true,
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
