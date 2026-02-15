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

        // Create a readable stream for Server-Sent Events
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const logStream = await container.logs({
                        follow: true,
                        stdout: true,
                        stderr: true,
                        timestamps: true,
                        tail: 100 // Last 100 lines
                    })

                    // Docker multiplexes stdout/stderr, we need to demux
                    logStream.on('data', (chunk: Buffer) => {
                        // Docker uses 8-byte header: [stream_type, 0, 0, 0, size...]
                        // We'll send the raw data for now
                        const message = chunk.toString('utf-8')
                        controller.enqueue(`data: ${JSON.stringify({ log: message })}\n\n`)
                    })

                    logStream.on('end', () => {
                        controller.enqueue(`data: ${JSON.stringify({ status: 'stream_ended' })}\n\n`)
                        controller.close()
                    })

                    logStream.on('error', (err: Error) => {
                        controller.enqueue(`data: ${JSON.stringify({ error: err.message })}\n\n`)
                        controller.close()
                    })
                } catch (err: any) {
                    controller.enqueue(`data: ${JSON.stringify({ error: err.message })}\n\n`)
                    controller.close()
                }
            },
            cancel() {
                // Cleanup when client disconnects
                console.log('Log stream cancelled')
            }
        })

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache, no-transform',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no' // Disable nginx buffering
            },
        })
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: 'Failed to get container logs', message: err.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
