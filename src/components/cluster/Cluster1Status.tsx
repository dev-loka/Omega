'use client'

import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export default function Cluster1Status() {
    return (
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">Cluster1</h3>
                <span className="text-xs px-2 py-0.5 bg-gray-800 rounded-full text-gray-400">4/8 Pods</span>
            </div>

            <div className="space-y-2">
                {/* Status Summary */}
                <div className="flex items-center space-x-3 text-xs">
                    <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-3 w-3 text-yellow-500 mr-1" />
                        <span className="text-yellow-400">4 alarming</span>
                    </div>
                    <div className="flex items-center">
                        <CheckCircleIcon className="h-3 w-3 text-green-500 mr-1" />
                        <span className="text-green-400">1 healthy</span>
                    </div>
                </div>

                {/* Pod List */}
                <div className="space-y-1 text-xs mt-3">
                    <div className="flex justify-between items-center p-1.5 bg-gray-800 rounded">
                        <span className="text-gray-300 font-mono">dev-website</span>
                        <span className="text-green-400 font-mono">:3000</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-gray-800 rounded">
                        <span className="text-gray-300 font-mono">web3-backend</span>
                        <span className="text-cyan-400 font-mono">:8000</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-gray-800 rounded">
                        <span className="text-gray-300 font-mono">postgres</span>
                        <span className="text-blue-400 font-mono">:5432</span>
                    </div>
                    <div className="flex justify-between items-center p-1.5 bg-gray-800 rounded">
                        <span className="text-gray-300 font-mono">redis-cache</span>
                        <span className="text-orange-400 font-mono">:6379</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
