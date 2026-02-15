'use client'

import { useState, useRef, useEffect } from 'react'
import { PlayIcon, ClipboardIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface TerminalWindowProps {
    title?: string
    initialCommands?: string[]
    onCommand?: (cmd: string) => void
}

export default function TerminalWindow({ title = 'Terminal', initialCommands = [], onCommand }: TerminalWindowProps) {
    const [history, setHistory] = useState<Array<{ type: 'input' | 'output'; content: string }>>([
        { type: 'output', content: 'Welcome to DevLok AI Terminal' },
        { type: 'output', content: 'Type `help` for available commands' },
        ...initialCommands.map(cmd => ({ type: 'input' as const, content: cmd })),
    ])
    const [input, setInput] = useState('')
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        const cmd = input.trim()
        setHistory(prev => [...prev, { type: 'input', content: cmd }])
        setInput('')

        // Simulate command execution
        setTimeout(() => {
            let output = ''
            if (cmd === 'kubectl get pods') {
                output = 'NAME                     READY   STATUS    RESTARTS   AGE\nweb3-backend-7d8f5d4c5-abcde   1/1     Running   0          2d\nredis-cache-6f9d7c9f8-xyz12   1/1     Running   0          2d\npostgres-5f7b9c6d8-98765      1/1     Running   0          2d'
            } else if (cmd.startsWith('kubectl logs')) {
                output = '[INFO] 2026-02-14T10:23:45Z - Server started\n[INFO] 2026-02-14T10:23:46Z - Connected to database\n[WARN] 2026-02-14T10:24:01Z - Slow query detected'
            } else if (cmd === 'helm list') {
                output = 'NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART\nweb3-backend    default         3               2026-02-12 15:43:22 +0530 IST    deployed        web3-backend-2.2.0'
            } else if (cmd === 'help') {
                output = 'Available commands:\n  kubectl get pods\n  kubectl logs <pod>\n  helm list\n  docker ps\n  devloka status'
            } else {
                output = `Command not recognized: ${cmd}`
            }
            setHistory(prev => [...prev, { type: 'output', content: output }])
            if (onCommand) onCommand(cmd)
        }, 500)
    }

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-sm text-gray-300 font-mono">{title}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-700 rounded">
                        <ClipboardIcon className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded">
                        <XMarkIcon className="h-4 w-4 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-sm text-green-400 bg-gray-950 h-96 overflow-y-auto">
                {history.map((item, idx) => (
                    <div key={idx} className={`mb-1 ${item.type === 'input' ? 'text-cyan-400' : 'text-green-400'}`}>
                        {item.type === 'input' ? (
                            <div className="flex">
                                <span className="text-purple-400 mr-2">$</span>
                                <span>{item.content}</span>
                            </div>
                        ) : (
                            <pre className="whitespace-pre-wrap text-green-300">{item.content}</pre>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Terminal Input */}
            <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 bg-gray-800 border-t border-gray-700">
                <span className="text-purple-400 mr-2 font-mono">$</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-green-400 font-mono placeholder-gray-600"
                    placeholder="Type a command..."
                />
                <button type="submit" className="p-1 hover:bg-gray-700 rounded">
                    <PlayIcon className="h-4 w-4 text-gray-400" />
                </button>
            </form>
        </div>
    )
}
