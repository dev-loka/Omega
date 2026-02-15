export interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'developer' | 'auditor'
    status: 'active' | 'inactive'
    lastActive: string
}

export const users: User[] = [
    { id: 'usr-001', name: 'Raj Sharma', email: 'raj@example.com', role: 'admin', status: 'active', lastActive: '2 min ago' },
    { id: 'usr-002', name: 'Anita Desai', email: 'anita@example.com', role: 'developer', status: 'active', lastActive: '5 min ago' },
    { id: 'usr-003', name: 'Vikram Singh', email: 'vikram@example.com', role: 'auditor', status: 'inactive', lastActive: '1 day ago' },
]

export interface Device {
    id: string
    name: string
    type: 'laptop' | 'mobile' | 'server'
    compliance: 'compliant' | 'non-compliant'
    lastSeen: string
}

export const devices: Device[] = [
    { id: 'dev-001', name: 'raj-mbp', type: 'laptop', compliance: 'compliant', lastSeen: '2 min ago' },
    { id: 'dev-002', name: 'anita-iphone', type: 'mobile', compliance: 'non-compliant', lastSeen: '10 min ago' },
    { id: 'dev-003', name: 'vikram-server', type: 'server', compliance: 'compliant', lastSeen: '1 hour ago' },
]
