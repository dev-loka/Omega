'use client'

import { useState } from 'react'
import { ArrowPathIcon, CircleStackIcon, ServerIcon, CubeIcon } from '@heroicons/react/24/outline'

interface Pod {
    name: string
    status: 'Running' | 'Pending' | 'Failed'
    restarts: number
    age: string
}

interface Deployment {
    name: string
    replicas: string
    available: string
}

export default function ClusterStatus() {
    const [pods] = useState<Pod[]>([
        { name: 'web3-backend-7d8f5d4c5-abcde', status: 'Running', restarts: 0, age: '2d' },
        { name: 'redis-cache-6f9d7c9f8-xyz12', status: 'Running', restarts: 0, age: '2d' },
        { name: 'postgres-5f7b9c6d8-98765', status: 'Running', restarts: 1, age: '2d' },
        { name: 'frontend-6f8d9c4b3-12345', status: 'Running', restarts: 0, age: '1d' },
        { name: 'auth-service-7f5d4c3b2-54321', status: 'Pending', restarts: 0, age: '10m' },
    ])

    const [deployments] = useState<Deployment[]>([
        { name: 'web3-backend', replicas: '3/3', available: '3' },
        { name: 'redis-cache', replicas: '2/2', available: '2' },
        { name: 'postgres', replicas: '1/1', available: '1' },
    ])

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    <ServerIcon className="h-5 w-5 mr-2 text-brand-400" />
                    Cluster Status
                </h2>
                <button className="text-sm text-gray-400 hover:text-white flex items-center">
                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                    Refresh
                </button>
            </div>

            {/* Pods Table */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <CubeIcon className="h-4 w-4 mr-1" /> Pods
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-gray-400 border-b border-gray-700">
                            <tr>
                                <th className="text-left py-2">Name</th>
                                <th className="text-left py-2">Status</th>
                                <th className="text-left py-2">Restarts</th>
                                <th className="text-left py-2">Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pods.map((pod, i) => (
                                <tr key={i} className="border-b border-gray-800">
                                    <td className="py-2 font-mono text-xs text-gray-300">{pod.name}</td>
                                    <td className="py-2">
                                        <span className={`px-2 py-1 rounded-full text-xs ${pod.status === 'Running' ? 'bg-green-900 text-green-300' :
                                                pod.status === 'Pending' ? 'bg-yellow-900 text-yellow-300' :
                                                    'bg-red-900 text-red-300'
                                            }`}>
                                            {pod.status}
                                        </span>
                                    </td>
                                    <td className="py-2 text-gray-400">{pod.restarts}</td>
                                    <td className="py-2 text-gray-400">{pod.age}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Deployments */}
            <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center">
                    <CircleStackIcon className="h-4 w-4 mr-1" /> Deployments
                </h3>
                <div className="grid grid-cols-1 gap-2">
                    {deployments.map((dep, i) => (
                        <div key={i} className="flex justify-between items-center p-2 bg-gray-800 rounded">
                            <span className="text-sm text-gray-300">{dep.name}</span>
                            <span className="text-xs text-gray-400">
                                {dep.replicas} replicas ({dep.available} available)
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
