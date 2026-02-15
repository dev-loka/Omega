'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

const containers = [
    { name: 'dev-website', port: '3000', status: 'running', color: 'bg-green-500' },
    { name: 'postgres', port: '5432', status: 'running', color: 'bg-green-500' },
    { name: 'redis-cache', port: '6379', status: 'running', color: 'bg-green-500' },
    { name: 'web3-backend', port: '8000', status: 'running', color: 'bg-green-500' },
    { name: 'ollama', port: '11434', status: 'running', color: 'bg-green-500' },
    { name: 'nginx', port: '80', status: 'stopped', color: 'bg-gray-500' },
]

export default function ContainerCards() {
    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium text-gray-300">Containers</h3>
                <button className="p-1 rounded bg-gray-800 hover:bg-gray-700 transition">
                    <PlusIcon className="h-4 w-4 text-gray-300" />
                </button>
            </div>

            <div className="space-y-2">
                {containers.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-800 rounded hover:bg-gray-750 transition">
                        <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${c.color}`}></div>
                            <span className="text-sm text-gray-300 font-mono">{c.name}</span>
                        </div>
                        {c.port && (
                            <span className="text-xs text-gray-500 font-mono">:{c.port}</span>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-800">
                <div className="flex justify-between text-xs text-gray-400">
                    <span>Total: {containers.length}</span>
                    <span className="text-green-400">Running: {containers.filter(c => c.status === 'running').length}</span>
                </div>
            </div>
        </div>
    )
}
