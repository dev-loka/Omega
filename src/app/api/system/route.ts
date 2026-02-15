import { NextResponse } from 'next/server'
import os from 'os'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function GET() {
    try {
        // CPU load average (1, 5, 15 min)
        const loadAvg = os.loadavg()

        // Memory
        const totalMem = os.totalmem()
        const freeMem = os.freemem()
        const usedMemPercent = ((totalMem - freeMem) / totalMem * 100).toFixed(1)
        const usedMemGB = ((totalMem - freeMem) / 1024 / 1024 / 1024).toFixed(1)
        const totalMemGB = (totalMem / 1024 / 1024 / 1024).toFixed(1)

        // Uptime
        const uptimeSec = os.uptime()
        const uptimeDays = Math.floor(uptimeSec / 86400)
        const uptimeHours = Math.floor((uptimeSec % 86400) / 3600)
        const uptimeMinutes = Math.floor((uptimeSec % 3600) / 60)

        // Disk usage
        let diskUsed = 0, diskTotal = 0, diskPercent = 0
        try {
            const { stdout } = await execAsync('df -k / | tail -1')
            const parts = stdout.trim().split(/\s+/)
            diskTotal = parseInt(parts[1]) * 1024
            diskUsed = parseInt(parts[2]) * 1024
            diskPercent = Math.round((diskUsed / diskTotal) * 100)
        } catch (e) {
            // Fallback for non-Linux systems
            diskPercent = 0
        }

        // Process count
        let processCount = 0
        try {
            const { stdout } = await execAsync('ps -e --no-headers | wc -l')
            processCount = parseInt(stdout.trim())
        } catch (e) {
            processCount = 0
        }

        // Network traffic (cumulative bytes)
        let netRx = 0, netTx = 0
        try {
            const { stdout } = await execAsync('cat /proc/net/dev | grep -E "eth0|enp|wlan" | head -1')
            const parts = stdout.trim().split(/\s+/)
            netRx = parseInt(parts[1], 10) || 0
            netTx = parseInt(parts[9], 10) || 0
        } catch (e) {
            // Fallback
            netRx = 0
            netTx = 0
        }

        // CPU temperature (if available)
        let cpuTemp = 0
        try {
            const { stdout } = await execAsync('sensors 2>/dev/null | grep "Core 0" | awk "{print $3}" | cut -c2-3')
            cpuTemp = parseInt(stdout.trim()) || 0
        } catch (e) {
            cpuTemp = 0
        }

        return NextResponse.json({
            kernel: os.release(),
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            uptime: `${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m`,
            cpuLoad: loadAvg,
            cpuTemp,
            cpuCount: os.cpus().length,
            ramUsed: usedMemPercent,
            ramUsedGB: usedMemGB,
            ramTotalGB: totalMemGB,
            diskUsed,
            diskTotal,
            diskPercent,
            processCount,
            netRx,
            netTx,
            time: new Date().toLocaleTimeString('en-IN', { hour12: false }),
            date: new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch system data' }, { status: 500 })
    }
}
