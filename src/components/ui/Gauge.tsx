interface GaugeProps {
    value: number
    max: number
    unit?: string
    color?: string
}

export default function Gauge({ value, max, unit = '', color = 'green' }: GaugeProps) {
    const percentage = Math.min((value / max) * 100, 100)

    const getColor = () => {
        if (percentage > 90) return 'bg-red-500'
        if (percentage > 75) return 'bg-yellow-500'
        return `bg-${color}-500`
    }

    return (
        <div className="relative w-full">
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-green-500/20">
                <div
                    className={`h-full ${getColor()} transition-all duration-300 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-xs text-green-400 mt-1 font-mono">
                {value.toFixed(1)}{unit} / {max}{unit}
            </div>
        </div>
    )
}
