'use client'

import { useState } from 'react'

export default function UniversalTerminal() {
    const [lines] = useState([
        'Welcome to DEV LOK AI Universal Terminal',
        'Initializing OMEGA BLACK agent system...',
        'Loading 30 AI agents...',
        '✓ ReconAgent ready',
        '✓ WebSecurityAgent ready',
        '✓ All systems operational',
        '',
    ])

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-3">
                <div className="text-brand-400 font-semibold">Universal AI Terminal</div>
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
            </div>

            <div className="space-y-1 text-green-400">
                {lines.map((line, i) => (
                    <div key={i} className="text-xs">
                        {line}
                    </div>
                ))}

                <div className="flex items-center mt-2">
                    <span className="text-purple-400 mr-2">$</span>
                    <span className="text-cyan-400">kubectl get pods</span>
                    <span className="ml-2 text-gray-500">← AI Suggested</span>
                </div>

                <div className="flex items-center">
                    <span className="text-purple-400 mr-2">$</span>
                    <span className="text-cyan-400">helm list</span>
                    <span className="ml-2 text-gray-500">← Run to see deployments</span>
                </div>
            </div>
        </div>
    )
}
