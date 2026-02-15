import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { ModeProvider } from '@/context/ModeContext'
import { Toaster } from 'react-hot-toast'
import { siteMetadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = siteMetadata

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DEVLOKA OMEGA',
        operatingSystem: 'Linux, Windows, macOS',
        applicationCategory: 'SecurityApplication',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5',
            ratingCount: '88',
        },
        description: 'Sovereign AI platform for government agencies and security researchers in India.',
    }

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>
                <ThemeProvider>
                    <ModeProvider>
                        {children}
                        <Toaster position="top-right" />
                    </ModeProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
