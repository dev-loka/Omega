import { NextRequest } from 'next/server'
import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
        return new Response('Missing container id parameter', { status: 400 })
    }

    try {
        const container = docker.getContainer(id)

        // Get container stats (streaming)
        const statsStream = await container.stats({ stream: false })

        // Calculate CPU percentage
        const cpuDelta = statsStream.cpu_stats.cpu_usage.total_usage -
            statsStream.precpu_stats.cpu_usage.total_usage
        const systemDelta = statsStream.cpu_stats.system_cpu_usage -
            statsStream.precpu_stats.system_cpu_usage
        const cpuPercent = (cpuDelta / systemDelta) * statsStream.cpu_stats.online_cpus * 100

        // Calculate memory usage
        const memUsage = statsStream.memory_stats.usage
        const memLimit = statsStream.memory_stats.limit
        const memPercent = (memUsage / memLimit) * 100

        // Network I/O
        const networks = statsStream.networks || {}
        let netRx = 0, netTx = 0
        Object.values(networks).forEach((net: any) => {
            netRx += net.rx_bytes || 0
            netTx += net.tx_bytes || 0
        })

        // Block I/O
        const blockIO = statsStream.blkio_stats.io_service_bytes_recursive || []
        let ioRead = 0, ioWrite = 0
        blockIO.forEach((io: any) => {
            if (io.op === 'Read') ioRead += io.value
            if (io.op === 'Write') ioWrite += io.value
        })

        return Response.json({
            cpu: {
                percent: cpuPercent.toFixed(2),
                usage: statsStream.cpu_stats.cpu_usage.total_usage
            },
            memory: {
                usage: memUsage,
                limit: memLimit,
                percent: memPercent.toFixed(2),
                usageMB: (memUsage / 1024 / 1024).toFixed(2),
                limitMB: (memLimit / 1024 / 1024).toFixed(2)
            },
            network: {
                rx: netRx,
                tx: netTx,
                rxMB: (netRx / 1024 / 1024).toFixed(2),
                txMB: (netTx / 1024 / 1024).toFixed(2)
            },
            blockIO: {
                read: ioRead,
                write: ioWrite,
                readMB: (ioRead / 1024 / 1024).toFixed(2),
                writeMB: (ioWrite / 1024 / 1024).toFixed(2)
            }
        })
    } catch (err: any) {
        return Response.json({
            error: 'Failed to get container stats',
            message: err.message
        }, { status: 500 })
    }
}
