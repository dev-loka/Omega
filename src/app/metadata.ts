import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
    title: {
        default: 'Ω DEVLOKA OMEGA | Sovereign AI Command Center & Cyber Defense',
        template: '%s | Dev Loka AI',
    },
    description: 'India\'s first unified Sovereign AI platform. Built for Private LLM orchestration, OMEGA BLACK security, and GovTech compliance. Secure your digital frontier.',
    keywords: [
        'Sovereign AI India',
        'Private LLM Infrastructure',
        'OMEGA BLACK Security',
        'GovTech AI Solutions',
        'Indian IT Act Compliance',
        'Red Teaming Platform',
        'Digital Defense OS',
        'Dev Loka AI',
        'Artificial Intelligence India',
        'Cybersecurity Framework',
        'Private LLM Deployment',
        'Digital Defense',
        'AI-Native Platform',
        'Sovereign Cloud India',
        'Next.js Dashboard',
        'Cybersecurity Command Center',
        'Government AI',
        'Open Source Defense Tech',
        'DevSecOps India',
        'Private AI Infrastructure'
    ],
    authors: [{ name: 'DEV LOK AI Team' }],
    creator: 'DEV LOK AI',
    publisher: 'DEV LOK AI',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: 'https://devloka.ai',
        siteName: 'DEVLOKA OMEGA',
        title: 'Ω DEVLOKA OMEGA | The Future of Sovereign Intelligence',
        description: 'Secure, Private, and Powerful AI infrastructure for Government and Defense.',
        images: [
            {
                url: '/assets/header.jpg',
                width: 1200,
                height: 630,
                alt: 'DEVLOKA OMEGA Command Center Interface',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ω DEVLOKA OMEGA',
        description: 'India\'s Sovereign AI Command Center.',
        images: ['/assets/header.jpg'],
        creator: '@devloka_ai',
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
}
