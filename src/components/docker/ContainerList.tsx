'use client'

import { useApi } from '@/hooks/useApi'
import { PlayIcon, StopIcon, TrashIcon, ArrowPathIcon, PauseIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface Container {
    id: string
    name: string
    image: string
    state: string
    status: string
    ports: Array<{ private: number; public?: number; type: string }>
    created: number
}

export default function ContainerList() {
    const { data: containers, loading, error, refetch } = useApi<Container[]>('/api/docker/containers', 5000)
    const [actionLoading, setActionLoading] = useState<string | null>(null)

    const handleAction = async (id: string, action: string) => {
        setActionLoading(id)
        try {
            const res = await fetch('/api/docker/containers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, id }),
            })

            if (!res.ok) {
                const error = await res.json()
                console.error('Action failed:', error)
            }

            await refetch()
        } catch (err) {
            console.error('Failed to perform action:', err)
        } finally {
            setActionLoading(null)
        }
    }

    if (loading && !containers) {
        return (
            <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-green-500 text-sm font-mono animate-pulse">Loading containers...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-gray-900/80 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-red-400 text-sm font-mono">Error: {error.message}</div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-mono text-green-400 flex items-center">
                    <span className="mr-2">🐳</span>
                    DOCKER CONTAINERS ({containers?.length || 0})
                </h3>
                <button
                    onClick={refetch}
                    className="p-1 hover:bg-green-500/10 rounded transition"
                >
                    <ArrowPathIcon className="h-4 w-4 text-green-400" />
                </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {containers?.map((container) => (
                    <div
                        key={container.id}
                        className="flex items-center justify-between text-xs border border-green-500/10 rounded p-2 hover:border-green-500/30 transition"
                    >
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${container.state === 'running' ? 'bg-green-500 pulse-green' : 'bg-gray-500'
                                    }`} />
                                <span className="text-green-300 font-semibold">{container.name}</span>
                            </div>
                            <div className="text-green-500 mt-1">Image: {container.image}</div>
                            <div className="text-gray-400 mt-0.5">Status: {container.status}</div>
                            {container.ports.length > 0 && (
                                <div className="text-cyan-400 mt-0.5">
                                    Ports: {container.ports.map(p =>
                                        p.public ? `${p.public}:${p.private}` : p.private
                                    ).join(', ')}
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-1 ml-2">
                            {container.state !== 'running' && (
                                <button
                                    onClick={() => handleAction(container.id, 'start')}
                                    disabled={actionLoading === container.id}
                                    className="p-1.5 hover:bg-green-500/20 rounded transition disabled:opacity-50"
                                    title="Start"
                                >
                                    <PlayIcon className="h-4 w-4 text-green-400" />
                                </button>
                            )}

                            {container.state === 'running' && (
                                <>
                                    <button
                                        onClick={() => handleAction(container.id, 'pause')}
                                        disabled={actionLoading === container.id}
                                        className="p-1.5 hover:bg-yellow-500/20 rounded transition disabled:opacity-50"
                                        title="Pause"
                                    >
                                        <PauseIcon className="h-4 w-4 text-yellow-400" />
                                    </button>
                                    <button
                                        onClick={() => handleAction(container.id, 'stop')}
                                        disabled={actionLoading === container.id}
                                        className="p-1.5 hover:bg-red-500/20 rounded transition disabled:opacity-50"
                                        title="Stop"
                                    >
                                        <StopIcon className="h-4 w-4 text-red-400" />
                                    </button>
                                </>
                            )}

                            <button
                                onClick={() => handleAction(container.id, 'remove')}
                                disabled={actionLoading === container.id}
                                className="p-1.5 hover:bg-red-500/20 rounded transition disabled:opacity-50"
                                title="Remove"
                            >
                                <TrashIcon className="h-4 w-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                ))}

                {containers?.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        No containers found
                    </div>
                )}
            </div>
        </div>
    )
}
