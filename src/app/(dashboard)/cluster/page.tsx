'use client'

import UniversalTerminal from '@/components/terminal/UniversalTerminal'
import ContainerCards from '@/components/cluster/ContainerCards'
import Cluster1Status from '@/components/cluster/Cluster1Status'
import TaskAssistant from '@/components/task/TaskAssistant'
import SystemMonitor from '@/components/monitor/SystemMonitor'
import WorldClock from '@/components/clock/WorldClock'
import { useMode } from '@/context/ModeContext'

export default function ClusterPage() {
    const { mode } = useMode()

    return (
        <div className="space-y-6">
            {/* Header with Glitch Effect */}
            <div className="flex items-center justify-between">
                <h1
                    className="text-3xl font-bold glitch-text hacker-glow"
                    data-text="🌌 CLUSTER COMMAND CENTER"
                >
                    🌌 CLUSTER COMMAND CENTER
                </h1>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${mode === 'learning' ? 'border-green-500 text-green-400 bg-green-500/10' :
                        mode === 'lab' ? 'border-orange-500 text-orange-400 bg-orange-500/10' :
                            'border-blue-500 text-blue-400 bg-blue-500/10'
                    }`}>
                    {mode === 'learning' ? '🎓 Learning Mode' : mode === 'lab' ? '🧪 Lab Mode' : '🏛️ Government Mode'}
                </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column - 3 cols */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Universal Terminal */}
                    <UniversalTerminal />

                    {/* Container and Cluster Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ContainerCards />
                        <Cluster1Status />
                    </div>

                    {/* System Monitor */}
                    <SystemMonitor />
                </div>

                {/* Right Column - 1 col */}
                <div className="space-y-6">
                    {/* World Clock */}
                    <WorldClock />

                    {/* Task Assistant */}
                    <TaskAssistant />

                    {/* Agent Status */}
                    <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                        <h3 className="text-sm font-mono text-green-400 mb-3 flex items-center">
                            <span className="mr-2">🤖</span>
                            OMEGA BLACK AGENTS
                        </h3>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-green-300">ReconAgent</span>
                                <span className="text-green-400 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-green"></span>
                                    Ready
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-300">WebSecurityAgent</span>
                                <span className="text-green-400 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-green"></span>
                                    Ready
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-300">VulnScanAgent</span>
                                <span className="text-yellow-400 flex items-center">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                    Idle
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-green-300">ComplianceAgent</span>
                                <span className="text-green-400 flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-green"></span>
                                    Ready
                                </span>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-green-500/20 text-xs text-green-500 font-mono">
                            Total: 30 agents | Active: 28 | Ready: 26
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
