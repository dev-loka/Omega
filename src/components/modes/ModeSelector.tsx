'use client'

import { useMode, Mode } from '@/context/ModeContext'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import {
    AcademicCapIcon,
    BeakerIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const modes: { id: Mode; label: string; icon: any; description: string; color: string }[] = [
    {
        id: 'learning',
        label: 'Learning Mode',
        icon: AcademicCapIcon,
        description: 'Guided tutorials, sandbox labs, Hindi support, certification paths.',
        color: 'learning',
    },
    {
        id: 'lab',
        label: 'Lab Mode',
        icon: BeakerIcon,
        description: 'Full OMEGA BLACK security suite, bug bounty tools, ROI analytics.',
        color: 'lab',
    },
    {
        id: 'government',
        label: 'Government Mode',
        icon: BuildingOfficeIcon,
        description: 'Air‑gap ready, tamper‑proof logs, Indian IT Act compliance.',
        color: 'gov',
    },
]

export default function ModeSelector() {
    const { mode, setMode } = useMode()

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modes.map((m) => {
                const Icon = m.icon
                const isActive = mode === m.id
                return (
                    <Card
                        key={m.id}
                        className={clsx(
                            'cursor-pointer transition-all',
                            isActive && `ring-2 ring-${m.color}-500`
                        )}
                        hover
                    >
                        <div className="flex flex-col items-center text-center p-4">
                            <Icon className={`h-12 w-12 text-${m.color}-500 mb-3`} />
                            <h3 className="text-lg font-bold">{m.label}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {m.description}
                            </p>
                            <Button
                                variant={isActive ? 'primary' : 'outline'}
                                size="sm"
                                className="mt-4"
                                onClick={() => setMode(m.id)}
                            >
                                {isActive ? 'Active' : 'Switch'}
                            </Button>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
