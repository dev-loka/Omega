'use client'

import { frameworks, evidenceList } from '@/lib/mock/compliance'
import Card from '@/components/ui/Card'

export default function CompliancePage() {
    const statusColors = {
        'on-track': 'text-green-600 dark:text-green-400',
        'at-risk': 'text-yellow-600 dark:text-yellow-400',
        'behind': 'text-red-600 dark:text-red-400',
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Compliance Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {frameworks.map((f) => (
                    <Card key={f.name}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">{f.name}</h3>
                                <p className={`text-sm font-medium capitalize ${statusColors[f.status]}`}>{f.status}</p>
                            </div>
                            <div className="text-2xl font-bold">{f.progress}%</div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                            <div
                                className="bg-brand-600 h-2 rounded-full transition-all"
                                style={{ width: `${f.progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{f.controlsImplemented} / {f.totalControls} Controls</span>
                            <span>{f.totalControls - f.controlsImplemented} remaining</span>
                        </div>
                    </Card>
                ))}
            </div>

            <Card>
                <h3 className="font-bold mb-4">Recent Evidence Collection</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-800">
                                <th className="pb-3 font-medium">Document</th>
                                <th className="pb-3 font-medium">Framework</th>
                                <th className="pb-3 font-medium">Uploaded</th>
                                <th className="pb-3 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {evidenceList.map((ev) => (
                                <tr key={ev.id}>
                                    <td className="py-3 font-medium">{ev.title}</td>
                                    <td className="py-3">{ev.framework}</td>
                                    <td className="py-3 text-gray-500">{ev.uploaded}</td>
                                    <td className="py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ev.status === 'verified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {ev.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}
