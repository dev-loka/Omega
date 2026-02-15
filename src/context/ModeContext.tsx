'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type Mode = 'learning' | 'lab' | 'government'

interface ModeContextType {
    mode: Mode
    setMode: (mode: Mode) => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<Mode>('learning')

    useEffect(() => {
        const stored = localStorage.getItem('mode') as Mode | null
        if (stored) setMode(stored)
    }, [])

    const handleSetMode = (newMode: Mode) => {
        setMode(newMode)
        localStorage.setItem('mode', newMode)
    }

    return (
        <ModeContext.Provider value={{ mode, setMode: handleSetMode }}>
            {children}
        </ModeContext.Provider>
    )
}

export function useMode() {
    const context = useContext(ModeContext)
    if (context === undefined) {
        throw new Error('useMode must be used within a ModeProvider')
    }
    return context
}
