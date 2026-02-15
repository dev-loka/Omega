export interface KPI {
    label: string
    value: string
    change?: string
    trend?: 'up' | 'down'
}

export const developerKPIs: KPI[] = [
    { label: 'Active Clusters', value: '12', change: '+2', trend: 'up' },
    { label: 'Deployments', value: '47', change: '+15%', trend: 'up' },
    { label: 'Build Success Rate', value: '98%', change: '+2%', trend: 'up' },
    { label: 'Pending Reviews', value: '3', change: '-1', trend: 'down' },
]

export interface Cluster {
    name: string
    status: 'healthy' | 'warning' | 'error'
    pods: number
    version: string
}

export const clusters: Cluster[] = [
    { name: 'Production', status: 'healthy', pods: 127, version: '1.28' },
    { name: 'Staging', status: 'healthy', pods: 43, version: '1.28' },
    { name: 'Development', status: 'warning', pods: 12, version: '1.27' },
    { name: 'Edge', status: 'healthy', pods: 8, version: '1.26' },
]

export interface Deployment {
    id: string
    name: string
    status: 'success' | 'failed' | 'in-progress'
    timestamp: string
    author: string
}

export const deployments: Deployment[] = [
    { id: 'dep-123', name: 'api-gateway', status: 'success', timestamp: '2 min ago', author: 'raj' },
    { id: 'dep-124', name: 'auth-service', status: 'in-progress', timestamp: '5 min ago', author: 'anita' },
    { id: 'dep-125', name: 'frontend', status: 'failed', timestamp: '10 min ago', author: 'vikram' },
]
