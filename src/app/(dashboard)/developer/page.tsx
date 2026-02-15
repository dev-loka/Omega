'use client'

import { developerKPIs, clusters, deployments } from '@/lib/mock/developer'
import Card from '@/components/ui/Card'
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function DeveloperPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Developer Center</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {developerKPIs.map((kpi) => (
                    <Card key={kpi.label}>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{kpi.label}</div>
                        <div className="text-2xl font-bold mt-1">{kpi.value}</div>
                        <div className={`text-xs mt-2 ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.change}
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-bold mb-4">Active Clusters</h3>
                    <div className="space-y-4">
                        {clusters.map((cluster) => (
                            <div key={cluster.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div>
                                    <div className="font-medium">{cluster.name}</div>
                                    <div className="text-xs text-gray-500">v{cluster.version} • {cluster.pods} pods</div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold ${cluster.status === 'healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {cluster.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold mb-4">Recent Deployments</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800">
                                    <th className="pb-3 font-medium">Service</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Author</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {deployments.map((dep) => (
                                    <tr key={dep.id}>
                                        <td className="py-3 font-medium">{dep.name}</td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                {dep.status === 'success' ? (
                                                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                                                ) : dep.status === 'failed' ? (
                                                    <XCircleIcon className="h-4 w-4 text-red-500 mr-1" />
                                                ) : (
                                                    <ClockIcon className="h-4 w-4 text-blue-500 mr-1" />
                                                )}
                                                <span className="capitalize">{dep.status}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-gray-500">{dep.author}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    )
}
