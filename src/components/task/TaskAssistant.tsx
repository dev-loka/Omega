'use client'

import { useState } from 'react'
import { SparklesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const tasks = [
    { id: 1, name: 'Check pods status', command: 'kubectl get pods' },
    { id: 2, name: 'Explore logs', command: 'kubectl logs <pod>' },
    { id: 3, name: 'View resources', command: 'kubectl top pods' },
    { id: 4, name: 'Deploy Helm chart', command: 'helm install' },
]

export default function TaskAssistant() {
    const [selectedTask, setSelectedTask] = useState<number | null>(null)
    const [showWarning, setShowWarning] = useState(true)

    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    <SparklesIcon className="h-5 w-5 mr-2 text-brand-400" />
                    Task Assistant
                </h2>
                <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">Claude Opus</span>
            </div>

            {/* Warning Banner */}
            {showWarning && (
                <div className="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg flex items-start">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-200">
                        <p className="font-semibold">Warning: Unable to connect to the server</p>
                        <p className="text-xs text-yellow-300 mt-1">
                            Check kubeconfig context, ensure firewall/open port for API. <br />
                            Run `kubectl config view`, `kubectl cluster-info`. <br />
                            Restart local cluster with `sharrionante` (?) or use `kubectl proxy`.
                        </p>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="mt-2 text-xs underline text-yellow-400"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}

            {/* Task Buttons */}
            <div className="space-y-2">
                {tasks.map((task) => (
                    <button
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={`w-full text-left p-2 rounded-lg transition ${selectedTask === task.id
                                ? 'bg-brand-600 text-white'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                    >
                        <span className="text-sm font-medium">{task.name}</span>
                        <span className="block text-xs text-gray-400 mt-0.5 font-mono">{task.command}</span>
                    </button>
                ))}
            </div>

            {/* Quick Fix Button */}
            <div className="mt-4 pt-3 border-t border-gray-700">
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium flex items-center justify-center">
                    <span className="mr-2">Fix Connection</span>
                    <span className="text-xs opacity-75">(kubectl to pods)</span>
                </button>
            </div>
        </div>
    )
}
