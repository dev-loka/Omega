'use client'

import { useTheme } from '@/context/ThemeContext'
import { useMode } from '@/context/ModeContext'
import { SunIcon, MoonIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface HeaderProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
    const { theme, toggleTheme } = useTheme()
    const { mode } = useMode()

    const modeColors = {
        learning: 'bg-learning-500',
        lab: 'bg-lab-500',
        government: 'bg-gov-500',
    }

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center px-4">
            <div className="flex-1 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${modeColors[mode]}`} aria-hidden="true" />
                    <span className="text-sm font-medium">
                        {mode === 'learning' ? 'Learning Mode' : mode === 'lab' ? 'Lab Mode' : 'Gov Mode'}
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-3">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px]"
                    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
                </button>
                <button
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[44px] min-w-[44px]"
                    aria-label="User profile"
                >
                    <UserCircleIcon className="h-6 w-6" />
                </button>
            </div>
        </header>
    )
}
