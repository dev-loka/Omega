'use client'

import { vulnerabilities, agents, attackSurfaceData } from '@/lib/mock/security'
import Card from '@/components/ui/Card'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export default function SecurityPage() {
    const severityColors = {
        critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Security Operations</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="font-bold mb-4">Active Vulnerabilities</h3>
                    <div className="space-y-4">
                        {vulnerabilities.map((vuln) => (
                            <div key={vuln.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-bold text-sm">{vuln.id}</span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${severityColors[vuln.severity]}`}>
                                            {vuln.severity}
                                        </span>
                                    </div>
                                    <h4 className="font-medium mt-1">{vuln.title}</h4>
                                    <div className="text-xs text-gray-500 mt-1">CVSS: {vuln.cvss} • Discovered: {vuln.discovered}</div>
                                </div>
                                <div className="text-sm font-medium capitalize px-3 py-1 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    {vuln.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <h3 className="font-bold mb-4">Attack Surface Radar</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={attackSurfaceData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis dataKey="category" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                    <Radar
                                        name="Attacks"
                                        dataKey="count"
                                        stroke="#8b5cf6"
                                        fill="#8b5cf6"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="font-bold mb-4">Agent Health</h3>
                        <div className="space-y-4">
                            {agents.map((agent) => (
                                <div key={agent.name} className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-medium">{agent.name}</div>
                                        <div className="text-[10px] text-gray-500">Scan: {agent.lastScan}</div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs font-bold">{agent.findings} findings</span>
                                        <div className={`h-2 w-2 rounded-full ${agent.status === 'online' ? 'bg-green-500' : agent.status === 'busy' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
