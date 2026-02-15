'use client'

import { useEffect, useState } from 'react'
import Gauge from '@/components/ui/Gauge'

interface SystemData {
    cpuLoad: number[]
    cpuTemp: number
    cpuCount: number
    ramUsed: string
    ramUsedGB: string
    ramTotalGB: string
    diskPercent: number
    diskUsed: number
    diskTotal: number
    processCount: number
    netRx: number
    netTx: number
}

export default function SystemMonitor() {
    const [data, setData] = useState<SystemData | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/system')
                const json = await res.json()
                setData(json)
            } catch (e) {
                console.error('Failed to fetch system data:', e)
            }
        }

        fetchData()
        const interval = setInterval(fetchData, 2000)
        return () => clearInterval(interval)
    }, [])

    if (!data) {
        return (
            <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="text-green-500 text-sm font-mono animate-pulse">Loading system data...</div>
            </div>
        )
    }

    return (
        <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 space-y-4 backdrop-blur-sm">
            <h3 className="text-sm font-mono text-green-400 flex items-center">
                <span className="mr-2">📊</span>
                SYSTEM MONITOR
            </h3>

            <div className="space-y-3">
                {/* CPU Load */}
                <div>
                    <div className="text-xs text-green-300 mb-1.5 flex justify-between">
                        <span>CPU Load ({data.cpuCount} cores)</span>
                        {data.cpuTemp > 0 && <span className="text-yellow-400">🌡️ {data.cpuTemp}°C</span>}
                    </div>
                    <Gauge value={data.cpuLoad[0] * 10} max={100} unit="%" />
                    <div className="text-xs text-green-500 mt-1 font-mono">
                        1m: {data.cpuLoad[0].toFixed(2)} | 5m: {data.cpuLoad[1].toFixed(2)} | 15m: {data.cpuLoad[2].toFixed(2)}
                    </div>
                </div>

                {/* RAM */}
                <div>
                    <div className="text-xs text-green-300 mb-1.5">Memory</div>
                    <Gauge value={parseFloat(data.ramUsed)} max={100} unit="%" />
                </div>

                {/* Disk */}
                <div>
                    <div className="text-xs text-green-300 mb-1.5">Disk Usage</div>
                    <Gauge value={data.diskPercent} max={100} unit="%" />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-green-500/20">
                    <div className="flex flex-col items-center justify-center border border-green-500/20 p-2 rounded bg-black/30">
                        <div className="text-2xl text-green-400 font-mono">{data.processCount}</div>
                        <div className="text-xs text-green-300">Processes</div>
                    </div>

                    <div className="flex flex-col items-center justify-center border border-green-500/20 p-2 rounded bg-black/30">
                        <div className="text-2xl text-green-400 font-mono">
                            {((data.netRx + data.netTx) / 1024 / 1024).toFixed(0)}
                        </div>
                        <div className="text-xs text-green-300">MB Total</div>
                    </div>
                </div>

                {/* Network Traffic */}
                <div className="border-t border-green-500/20 pt-2">
                    <div className="text-xs text-green-300 mb-1">Network Traffic</div>
                    <div className="flex justify-between text-sm font-mono">
                        <span className="text-green-400">⬇️ {(data.netRx / 1024 / 1024).toFixed(2)} MB</span>
                        <span className="text-green-400">⬆️ {(data.netTx / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
