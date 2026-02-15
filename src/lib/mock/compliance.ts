export interface Framework {
    name: string
    progress: number
    status: 'on-track' | 'at-risk' | 'behind'
    controlsImplemented: number
    totalControls: number
}

export const frameworks: Framework[] = [
    { name: 'SOC 2', progress: 85, status: 'on-track', controlsImplemented: 102, totalControls: 120 },
    { name: 'ISO 27001', progress: 72, status: 'at-risk', controlsImplemented: 86, totalControls: 120 },
    { name: 'GDPR', progress: 90, status: 'on-track', controlsImplemented: 45, totalControls: 50 },
    { name: 'Indian IT Act', progress: 65, status: 'behind', controlsImplemented: 26, totalControls: 40 },
]

export interface Evidence {
    id: string
    title: string
    framework: string
    uploaded: string
    status: 'verified' | 'pending'
}

export const evidenceList: Evidence[] = [
    { id: 'ev-001', title: 'Access Control Policy', framework: 'SOC 2', uploaded: '2024-02-13', status: 'verified' },
    { id: 'ev-002', title: 'Incident Response Plan', framework: 'ISO 27001', uploaded: '2024-02-12', status: 'pending' },
    { id: 'ev-003', title: 'Data Processing Agreement', framework: 'GDPR', uploaded: '2024-02-11', status: 'verified' },
]
