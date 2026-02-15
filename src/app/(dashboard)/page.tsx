'use client'

import { useMode } from '@/context/ModeContext'
import ModeSelector from '@/components/modes/ModeSelector'

export default function DashboardHome() {
    const { mode } = useMode()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Welcome to DEV LOK AI</h1>
                <div className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                        backgroundColor: mode === 'learning' ? '#10b98120' : mode === 'lab' ? '#f59e0b20' : '#3b82f620',
                        color: mode === 'learning' ? '#10b981' : mode === 'lab' ? '#f59e0b' : '#3b82f6',
                        border: `1px solid ${mode === 'learning' ? '#10b981' : mode === 'lab' ? '#f59e0b' : '#3b82f6'}`
                    }}
                >
                    {mode === 'learning' ? '🎓 Learning Mode' : mode === 'lab' ? '🧪 Lab Mode' : '🏛️ Government Mode'}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Select Operational Mode</h2>
                    <ModeSelector />
                </div>

                <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">Sovereign AI-Native Platform</h2>
                    <p className="opacity-90 mb-6 text-lg">
                        India's first unified platform for developers and security researchers.
                        Fully air-gap ready and IT Act compliant.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="text-3xl font-bold">60+</div>
                            <div className="text-sm opacity-80">Security Tools</div>
                        </div>
                        <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <div className="text-3xl font-bold">30</div>
                            <div className="text-sm opacity-80">AI Agents</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
