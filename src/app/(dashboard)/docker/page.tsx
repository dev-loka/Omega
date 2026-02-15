'use client'

import ContainerList from '@/components/docker/ContainerList'
import SystemMonitor from '@/components/monitor/SystemMonitor'
import WorldClock from '@/components/clock/WorldClock'
import { useMode } from '@/context/ModeContext'

export default function DockerPage() {
    const { mode } = useMode()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold hacker-glow">
                    🐳 DOCKER MANAGEMENT
                </h1>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${mode === 'learning' ? 'border-green-500 text-green-400 bg-green-500/10' :
                        mode === 'lab' ? 'border-orange-500 text-orange-400 bg-orange-500/10' :
                            'border-blue-500 text-blue-400 bg-blue-500/10'
                    }`}>
                    {mode === 'learning' ? '🎓 Learning Mode' : mode === 'lab' ? '🧪 Lab Mode' : '🏛️ Government Mode'}
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - 2 cols */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Docker Containers */}
                    <ContainerList />

                    {/* Docker Images (placeholder for now) */}
                    <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h3 className="text-sm font-mono text-green-400 mb-3">
                            <span className="mr-2">📦</span>
                            DOCKER IMAGES
                        </h3>
                        <div className="text-gray-500 text-xs text-center py-4">
                            Coming soon...
                        </div>
                    </div>

                    {/* Docker Networks (placeholder) */}
                    <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h3 className="text-sm font-mono text-green-400 mb-3">
                            <span className="mr-2">🌐</span>
                            DOCKER NETWORKS
                        </h3>
                        <div className="text-gray-500 text-xs text-center py-4">
                            Coming soon...
                        </div>
                    </div>
                </div>

                {/* Right Column - 1 col */}
                <div className="space-y-6">
                    {/* System Monitor */}
                    <SystemMonitor />

                    {/* World Clock */}
                    <WorldClock />

                    {/* Docker Stats */}
                    <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h3 className="text-sm font-mono text-green-400 mb-3">
                            <span className="mr-2">📊</span>
                            DOCKER STATS
                        </h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-green-300">Total Containers</span>
                                <span className="text-green-400 font-mono">-</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-300">Running</span>
                                <span className="text-green-400 font-mono">-</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-300">Stopped</span>
                                <span className="text-gray-400 font-mono">-</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-green-300">Images</span>
                                <span className="text-green-400 font-mono">-</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h3 className="text-sm font-mono text-green-400 mb-3">
                            <span className="mr-2">⚡</span>
                            QUICK ACTIONS
                        </h3>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-green-400 transition">
                                Pull Image
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-green-400 transition">
                                Create Container
                            </button>
                            <button className="w-full text-left px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded text-xs text-green-400 transition">
                                Prune System
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
