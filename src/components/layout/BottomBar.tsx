'use client'

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 left-20 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 flex justify-between items-center text-xs text-gray-400 z-50">
            {/* Left Section - System Stats */}
            <div className="flex items-center space-x-4">
                <span className="flex items-center">
                    <span className="text-gray-500 mr-1">RAM:</span>
                    <span className="text-green-400">2.4%</span>
                </span>
                <span className="flex items-center">
                    <span className="text-gray-500 mr-1">CPU:</span>
                    <span className="text-cyan-400">15.2%</span>
                </span>
                <span className="flex items-center">
                    <span className="text-gray-500 mr-1">Net:</span>
                    <span className="text-blue-400">0.2 KB/s</span>
                </span>
            </div>

            {/* Center Section - Status */}
            <div className="flex items-center space-x-3">
                <span className="text-gray-500">DEV LOK AI Platform</span>
                <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1 animate-pulse"></span>
                    <span className="text-green-400">Online</span>
                </span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-500">30 Agents Ready</span>
            </div>

            {/* Right Section - Version */}
            <div className="flex items-center space-x-2">
                <span className="text-gray-500">OMEGA BLACK v1.0.0</span>
                <span className="text-gray-600">|</span>
                <span className="text-cyan-400">Claude Opus 4 Ready</span>
            </div>
        </div>
    )
}
