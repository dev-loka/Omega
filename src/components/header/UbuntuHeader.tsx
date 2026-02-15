'use client'

import { useEffect, useState } from 'react'

interface SystemData {
    kernel: string
    hostname: string
    uptime: string
    cpuLoad: number[]
    cpuCount: number
    ramUsed: string
    ramUsedGB: string
    ramTotalGB: string
    time: string
    date: string
    netRx: number
    netTx: number
}

export default function UbuntuHeader() {
    const [data, setData] = useState<SystemData | null>(null)
    const [netSpeed, setNetSpeed] = useState({ rx: 0, tx: 0 })
    const [prevNet, setPrevNet] = useState({ rx: 0, tx: 0 })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/system')
                const json = await res.json()

                // Calculate network speed (bytes per second)
                if (prevNet.rx > 0) {
                    const rxDiff = json.netRx - prevNet.rx
                    const txDiff = json.netTx - prevNet.tx
                    setNetSpeed({
                        rx: Math.max(0, Math.round(rxDiff / 1024)), // KB/s
                        tx: Math.max(0, Math.round(txDiff / 1024))
                    })
                }

                setPrevNet({ rx: json.netRx, tx: json.netTx })
                setData(json)
            } catch (e) {
                console.error('Failed to fetch system data:', e)
            }
        }

        fetchData()
        const interval = setInterval(fetchData, 1000)
        return () => clearInterval(interval)
    }, [prevNet.rx, prevNet.tx])

    if (!data) return null

    return (
        <header className="bg-black/90 text-green-400 border-b border-green-500/30 px-4 py-1.5 flex items-center justify-between text-xs font-mono backdrop-blur-sm">
            <div className="flex items-center space-x-4">
                <span className="font-bold text-green-300">🇮🇳 DEV LOK AI</span>
                <span className="text-green-500">|</span>
                <span>Kernel: {data.kernel}</span>
                <span className="text-green-500">|</span>
                <span>Uptime: {data.uptime}</span>
                <span className="text-green-500">|</span>
                <span>Host: {data.hostname}</span>
            </div>
            <div className="flex items-center space-x-4">
                <span>CPU: {data.cpuLoad[0].toFixed(2)} ({data.cpuCount} cores)</span>
                <span className="text-green-500">|</span>
                <span>RAM: {data.ramUsedGB}/{data.ramTotalGB} GB ({data.ramUsed}%)</span>
                <span className="text-green-500">|</span>
                <span>↓ {netSpeed.rx} KB/s</span>
                <span>↑ {netSpeed.tx} KB/s</span>
                <span className="text-green-500">|</span>
                <span className="text-green-300 font-semibold">{data.time}</span>
                <span className="text-green-400">{data.date}</span>
            </div>
        </header>
    )
}
