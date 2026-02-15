import clsx from 'clsx'
import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={clsx(
                'bg-white dark:bg-gray-900 rounded-xl shadow border border-gray-200 dark:border-gray-800 p-4',
                hover && 'hover:shadow-lg transition-shadow',
                className
            )}
        >
            {children}
        </div>
    )
}
