import { NextResponse } from 'next/server'
import Docker from 'dockerode'

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

export async function GET() {
    try {
        const containers = await docker.listContainers({ all: true })

        // Format container data for frontend
        const formattedContainers = containers.map(container => ({
            id: container.Id,
            name: container.Names[0]?.replace('/', '') || 'unknown',
            image: container.Image,
            state: container.State,
            status: container.Status,
            ports: container.Ports.map(p => ({
                private: p.PrivatePort,
                public: p.PublicPort,
                type: p.Type
            })),
            created: container.Created,
            labels: container.Labels
        }))

        return NextResponse.json(formattedContainers)
    } catch (err: any) {
        console.error('Docker API error:', err)
        return NextResponse.json({
            error: 'Failed to list containers',
            message: err.message
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const { action, id } = await req.json()

        if (!id || !action) {
            return NextResponse.json({
                error: 'Missing required fields: id and action'
            }, { status: 400 })
        }

        const container = docker.getContainer(id)

        switch (action) {
            case 'start':
                await container.start()
                break
            case 'stop':
                await container.stop()
                break
            case 'restart':
                await container.restart()
                break
            case 'pause':
                await container.pause()
                break
            case 'unpause':
                await container.unpause()
                break
            case 'remove':
                await container.remove({ force: true })
                break
            default:
                return NextResponse.json({
                    error: 'Invalid action. Allowed: start, stop, restart, pause, unpause, remove'
                }, { status: 400 })
        }

        return NextResponse.json({
            success: true,
            action,
            containerId: id
        })
    } catch (err: any) {
        console.error('Docker operation error:', err)
        return NextResponse.json({
            error: 'Operation failed',
            message: err.message
        }, { status: 500 })
    }
}
