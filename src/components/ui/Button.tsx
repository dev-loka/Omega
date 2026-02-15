import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'outline'
    size?: 'sm' | 'md' | 'lg'
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}: ButtonProps) {
    const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
    const variants = {
        primary: 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800',
    }
    const sizes = {
        sm: 'px-3 py-2 text-sm min-h-[44px]',
        md: 'px-4 py-2.5 text-sm min-h-[44px]',
        lg: 'px-6 py-3 text-base min-h-[48px]',
    }
    return (
        <button
            className={clsx(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    )
}
