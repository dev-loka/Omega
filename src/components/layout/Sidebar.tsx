'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMode } from '@/context/ModeContext'
import {
    HomeIcon,
    CodeBracketIcon,
    ShieldExclamationIcon,
    DocumentCheckIcon,
    IdentificationIcon,
    ServerIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Developer Center', href: '/developer', icon: CodeBracketIcon },
    { name: 'Security Operations', href: '/security', icon: ShieldExclamationIcon },
    { name: 'Compliance Dashboard', href: '/compliance', icon: DocumentCheckIcon },
    { name: 'Identity & Device', href: '/identity', icon: IdentificationIcon },
    { name: 'Cluster', href: '/cluster', icon: ServerIcon },
]

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
    const pathname = usePathname()
    const { mode } = useMode()

    const modeColors = {
        learning: 'bg-learning-500',
        lab: 'bg-lab-500',
        government: 'bg-gov-500',
    }

    return (
        <aside
            className={clsx(
                'flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300',
                sidebarOpen ? 'w-64' : 'w-20'
            )}
        >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-800">
                {sidebarOpen ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        DEV LOK AI
                    </span>
                ) : (
                    <span className="text-xl font-bold text-purple-600">D</span>
                )}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {sidebarOpen ? (
                        <ChevronDoubleLeftIcon className="h-5 w-5" />
                    ) : (
                        <ChevronDoubleRightIcon className="h-5 w-5" />
                    )}
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1 px-2">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={clsx(
                                        'flex items-center p-2 rounded-lg transition-colors',
                                        isActive
                                            ? 'bg-gray-100 dark:bg-gray-800 text-brand-600 dark:text-brand-400'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    )}
                                >
                                    <Icon className="h-6 w-6 shrink-0" />
                                    {sidebarOpen && <span className="ml-3 font-medium">{item.name}</span>}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className={clsx(
                    'flex items-center p-2 rounded-lg',
                    sidebarOpen ? 'space-x-3' : 'justify-center'
                )}>
                    <div className={clsx('h-3 w-3 rounded-full shrink-0', modeColors[mode])} />
                    {sidebarOpen && (
                        <span className="text-sm font-medium capitalize">
                            {mode} Mode
                        </span>
                    )}
                </div>
            </div>
        </aside>
    )
}
