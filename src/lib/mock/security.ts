export interface Vulnerability {
    id: string
    title: string
    severity: 'critical' | 'high' | 'medium' | 'low'
    cvss: number
    status: 'open' | 'in-progress' | 'resolved'
    discovered: string
}

export const vulnerabilities: Vulnerability[] = [
    { id: 'VULN-001', title: 'SQL Injection in login', severity: 'critical', cvss: 9.1, status: 'open', discovered: '2024-02-13' },
    { id: 'VULN-002', title: 'XSS in profile page', severity: 'high', cvss: 7.2, status: 'in-progress', discovered: '2024-02-12' },
    { id: 'VULN-003', title: 'SSRF in image proxy', severity: 'medium', cvss: 5.4, status: 'open', discovered: '2024-02-11' },
    { id: 'VULN-004', title: 'IDOR in order history', severity: 'high', cvss: 7.8, status: 'resolved', discovered: '2024-02-10' },
]

export interface Agent {
    name: string
    status: 'online' | 'offline' | 'busy'
    findings: number
    lastScan: string
}

export const agents: Agent[] = [
    { name: 'Recon Agent', status: 'online', findings: 127, lastScan: '2 min ago' },
    { name: 'Web Scanner', status: 'busy', findings: 43, lastScan: 'just now' },
    { name: 'Cloud Misconfig', status: 'online', findings: 12, lastScan: '5 min ago' },
    { name: 'Container Scanner', status: 'offline', findings: 0, lastScan: '1 hour ago' },
]

export const attackSurfaceData = [
    { category: 'SQLi', count: 12 },
    { category: 'XSS', count: 23 },
    { category: 'SSRF', count: 8 },
    { category: 'IDOR', count: 15 },
    { category: 'RCE', count: 3 },
]
