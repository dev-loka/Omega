'use client'

import { useState, useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface ContainerLogsProps {
    containerId: string
    containerName: string
    onClose: () => void
}

export default function ContainerLogs({ containerId, containerName, onClose }: ContainerLogsProps) {
    const [logs, setLogs] = useState<string[]>([])
    const [connected, setConnected] = useState(false)
    const logsEndRef = useRef<HTMLDivElement>(null)
    const eventSourceRef = useRef<EventSource | null>(null)

    useEffect(() => {
        // Connect to SSE endpoint
        const eventSource = new EventSource(`/api/docker/logs?id=${containerId}`)
        eventSourceRef.current = eventSource

        eventSource.onopen = () => {
            setConnected(true)
            console.log('Log stream connected')
        }

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                if (data.log) {
                    setLogs(prev => [...prev, data.log])
                } else if (data.status === 'stream_ended') {
                    setConnected(false)
                } else if (data.error) {
                    setLogs(prev => [...prev, `ERROR: ${data.error}`])
                    setConnected(false)
                }
            } catch (err) {
                console.error('Failed to parse log event:', err)
            }
        }

        eventSource.onerror = (err) => {
            console.error('EventSource error:', err)
            setConnected(false)
            eventSource.close()
        }

        return () => {
            eventSource.close()
        }
    }, [containerId])

    useEffect(() => {
        // Auto-scroll to bottom
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [logs])

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-green-500/30 rounded-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-green-500/30">
                    <div>
                        <h3 className="text-sm font-mono text-green-400 flex items-center">
                            <span className="mr-2">📜</span>
                            CONTAINER LOGS: {containerName}
                        </h3>
                        <div className="text-xs text-gray-400 mt-1">
                            {connected ? (
                                <span className="text-green-400 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-green"></span>
                                    Live streaming
                                </span>
                            ) : (
                                <span className="text-gray-500">Disconnected</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-red-500/20 rounded transition"
                    >
                        <XMarkIcon className="h-5 w-5 text-red-400" />
                    </button>
                </div>

                {/* Logs Content */}
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-black/50">
                    {logs.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">
                            Waiting for logs...
                        </div>
                    ) : (
                        <div className="space-y-0.5">
                            {logs.map((log, index) => (
                                <div key={index} className="text-green-400 whitespace-pre-wrap break-all">
                                    {log}
                                </div>
                            ))}
                            <div ref={logsEndRef} />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-green-500/30 flex justify-between items-center text-xs">
                    <span className="text-gray-400">{logs.length} lines</span>
                    <button
                        onClick={() => setLogs([])}
                        className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-green-400 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}
