'use client'

import {
    CommandLineIcon,
    CubeIcon,
    ServerIcon,
    GlobeAltIcon,
    CircleStackIcon,
    CodeBracketIcon,
    CpuChipIcon,
    SparklesIcon,
    BeakerIcon,
    CloudIcon,
    UserGroupIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { useMode } from '@/context/ModeContext'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

const navigation = [
    { name: 'Terminal', icon: CommandLineIcon, href: '/cluster' },
    { name: 'Docker', icon: CubeIcon, href: '/docker' },
    { name: 'Kubernetes', icon: ServerIcon, href: '/cluster' },
    { name: 'dev-website', icon: GlobeAltIcon, href: '/developer' },
    { name: 'postgres', icon: CircleStackIcon, href: '/identity' },
    { name: 'Languages', icon: CodeBracketIcon, href: '/developer' },
    { name: 'Go', icon: CpuChipIcon, href: '/developer' },
    { name: 'AI', icon: SparklesIcon, href: '/security' },
    { name: 'Git', icon: BeakerIcon, href: '/developer' },
    { name: 'VM', icon: CloudIcon, href: '/cluster' },
    { name: 'Agents', icon: UserGroupIcon, href: '/security' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/compliance' },
]

export default function IconSidebar() {
    const { mode } = useMode()
    const pathname = usePathname()

    const modeColor = mode === 'learning' ? 'text-green-500' : mode === 'lab' ? 'text-orange-500' : 'text-blue-500'

    return (
        <aside className="w-20 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-4 space-y-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white mb-2">
                D
            </Link>

            {/* Navigation Icons */}
            <nav className="flex flex-col space-y-3 flex-1">
                {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                'group relative flex justify-center p-2 rounded-lg transition',
                                isActive ? 'bg-brand-600' : 'hover:bg-gray-800'
                            )}
                            title={item.name}
                        >
                            <Icon className={clsx(
                                'h-6 w-6',
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            )} />

                            {/* Tooltip */}
                            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* Mode Indicator */}
            <div className={`text-xl ${modeColor}`}>
                {mode === 'learning' ? '🎓' : mode === 'lab' ? '🧪' : '🏛️'}
            </div>
        </aside>
    )
}
