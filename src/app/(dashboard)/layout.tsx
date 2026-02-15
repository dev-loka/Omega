'use client'

import { ReactNode } from 'react'
import IconSidebar from '@/components/layout/IconSidebar'
import UbuntuHeader from '@/components/header/UbuntuHeader'
import MatrixRain from '@/components/background/MatrixRain'
import BottomBar from '@/components/layout/BottomBar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex h-screen bg-black text-green-400 overflow-hidden">
            {/* Matrix Rain Background */}
            <MatrixRain />

            {/* Icon Sidebar */}
            <IconSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Ubuntu-Style Header */}
                <UbuntuHeader />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 pb-20 z-10">
                    {children}
                </main>

                {/* Bottom Status Bar */}
                <BottomBar />
            </div>
        </div>
    )
}
