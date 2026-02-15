'use client'

import { useEffect, useRef } from 'react'

export default function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Characters to display - mix of binary, katakana, and symbols
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン¢£¥§©®°±µ¶'
        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops: number[] = new Array(columns).fill(1)

        // Animation loop
        const draw = () => {
            // Fade effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Matrix green color
            ctx.fillStyle = '#0f0'
            ctx.font = fontSize + 'px monospace'

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]
                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                // Reset drop randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }
            requestAnimationFrame(draw)
        }

        draw()

        return () => window.removeEventListener('resize', resize)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full -z-10 opacity-15 pointer-events-none"
            style={{ background: 'black' }}
        />
    )
}
