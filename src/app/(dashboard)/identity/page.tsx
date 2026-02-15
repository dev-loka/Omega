'use client'

import { users, devices } from '@/lib/mock/identity'
import Card from '@/components/ui/Card'

export default function IdentityPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Identity & Device Management</h1>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold">Managed Users</h3>
                        <button className="text-sm text-brand-600 font-medium">Add User</button>
                    </div>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded-full bg-brand-100 dark:bg-brand-900 flex items-center justify-center text-brand-700 dark:text-brand-300 font-bold">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-xs text-gray-500">{user.email}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-bold uppercase text-gray-400 mb-1">{user.role}</div>
                                    <div className={`text-[10px] font-bold ${user.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                                        {user.status.toUpperCase()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold">Device Inventory</h3>
                        <button className="text-sm text-brand-600 font-medium">Scan Devices</button>
                    </div>
                    <div className="space-y-4">
                        {devices.map((device) => (
                            <div key={device.id} className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-800 rounded-xl">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg capitalize text-xs">
                                        {device.type}
                                    </div>
                                    <div>
                                        <div className="font-medium">{device.name}</div>
                                        <div className="text-[10px] text-gray-500">Last seen: {device.lastSeen}</div>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-[10px] font-bold ${device.compliance === 'compliant' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {device.compliance.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
