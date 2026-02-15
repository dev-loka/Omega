'use client'

import { useEffect, useState } from 'react'

const cities = [
    { name: 'India (IST)', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
    { name: 'UTC', timezone: 'UTC', flag: '🌍' },
    { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
    { name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
    { name: 'Sydney', timezone: 'Australia/Sydney', flag: '🇦🇺' },
]

export default function WorldClock() {
    const [times, setTimes] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        const update = () => {
            const newTimes: any = {}
            cities.forEach(city => {
                newTimes[city.name] = new Date().toLocaleTimeString('en-IN', {
                    timeZone: city.timezone,
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })
            })
            setTimes(newTimes)
        }
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-gray-900/80 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm">
            <h3 className="text-sm font-mono text-green-400 mb-3 flex items-center">
                <span className="mr-2">🌐</span>
                WORLD CLOCK
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
                {cities.map(city => (
                    <div key={city.name} className="flex justify-between border-b border-green-500/10 pb-1.5">
                        <span className="text-green-300 flex items-center">
                            <span className="mr-1">{city.flag}</span>
                            {city.name}
                        </span>
                        <span className="text-green-400 font-mono font-semibold">
                            {times[city.name] || '--:--:--'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
