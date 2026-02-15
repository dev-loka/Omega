"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldExclamationIcon, ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/solid';

type LogEntry = {
    id: string;
    timestamp: string;
    type: 'SYSTEM' | 'ATTACK' | 'DEFENSE' | 'CRITICAL' | 'SUCCESS';
    message: string;
};

interface AttackVector {
    type: string;
    payload: string;
    severity: string;
    description: string;
}

export const PhantomTerminal = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [active, setActive] = useState(false);
    const [stats, setStats] = useState({ attacks: 0, blocked: 0, breached: 0 });
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of terminal
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const addLog = (type: LogEntry['type'], message: string) => {
        setLogs(prev => [...prev, {
            id: Math.random().toString(36),
            timestamp: new Date().toLocaleTimeString(),
            type,
            message
        }]);
    };

    const initiateSequence = async () => {
        setActive(true);
        setLogs([]);
        setStats({ attacks: 0, blocked: 0, breached: 0 });

        addLog('SYSTEM', '🔴 Initializing OMEGA PHANTOM Protocol...');
        await sleep(800);
        addLog('SYSTEM', '⚡ Connecting to attack vector generator...');
        await sleep(600);

        try {
            // Generate attack vectors
            const attackResponse = await fetch('/api/phantom/attack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetEndpoint: '/api/chat' })
            });

            const { attacks } = await attackResponse.json();
            addLog('SUCCESS', `✓ Generated ${attacks.length} attack vectors`);
            await sleep(500);

            // Execute each attack
            for (const attack of attacks) {
                await executeAttack(attack);
                await sleep(1500);
            }

            addLog('SYSTEM', '🎯 Red Team Simulation Complete');
            addLog('SYSTEM', `📊 Results: ${stats.attacks} attacks, ${stats.blocked} blocked, ${stats.breached} breached`);

        } catch (error) {
            addLog('CRITICAL', `❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        setActive(false);
    };

    const executeAttack = async (attack: AttackVector) => {
        setStats(prev => ({ ...prev, attacks: prev.attacks + 1 }));

        addLog('ATTACK', `🔥 [${attack.type}] ${attack.description}`);
        addLog('ATTACK', `   Payload: "${attack.payload.substring(0, 60)}${attack.payload.length > 60 ? '...' : ''}"`);

        await sleep(400);

        try {
            // Test defense
            const defenseResponse = await fetch('/api/phantom/defend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    payload: attack.payload,
                    attackType: attack.type
                })
            });

            const result = await defenseResponse.json();

            if (result.blocked) {
                setStats(prev => ({ ...prev, blocked: prev.blocked + 1 }));
                addLog('DEFENSE', `✓ OMEGA BLACK: ${result.reason}`);
            } else {
                setStats(prev => ({ ...prev, breached: prev.breached + 1 }));
                addLog('CRITICAL', `⚠️ VULNERABILITY DETECTED: ${result.reason}`);
            }
        } catch (error) {
            addLog('CRITICAL', `❌ Defense check failed: ${error instanceof Error ? error.message : 'Unknown'}`);
        }
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="w-full max-w-4xl rounded-lg border border-red-500/30 bg-black font-mono text-sm shadow-[0_0_30px_rgba(220,38,38,0.2)]">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-red-500/30 bg-red-950/20 px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${active ? 'animate-pulse bg-red-500' : 'bg-gray-500'}`} />
                    <span className="font-bold tracking-widest text-red-500">OMEGA PHANTOM v1.0</span>
                    <span className="text-xs text-gray-500">Autonomous Red Team</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                        <BoltIcon className="h-3 w-3 text-yellow-500" />
                        <span className="text-gray-400">Attacks: <span className="text-yellow-500">{stats.attacks}</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ShieldCheckIcon className="h-3 w-3 text-emerald-500" />
                        <span className="text-gray-400">Blocked: <span className="text-emerald-500">{stats.blocked}</span></span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ShieldExclamationIcon className="h-3 w-3 text-red-500" />
                        <span className="text-gray-400">Breached: <span className="text-red-500">{stats.breached}</span></span>
                    </div>
                </div>

                <button
                    onClick={initiateSequence}
                    disabled={active}
                    className="rounded border border-red-500/50 bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-400 hover:bg-red-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    aria-label="Initiate red team simulation"
                >
                    {active ? 'ENGAGED...' : 'INITIATE RED TEAM'}
                </button>
            </div>

            {/* Terminal Output */}
            <div ref={scrollRef} className="h-96 overflow-y-auto p-4 bg-gradient-to-b from-black to-gray-950">
                <AnimatePresence>
                    {logs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            className="text-center text-gray-600 mt-32"
                        >
                            <ShieldExclamationIcon className="mx-auto h-12 w-12 mb-3 text-red-900" />
                            <p className="text-sm">AWAITING DIRECTIVES...</p>
                            <p className="text-xs text-gray-700 mt-2">Click "INITIATE RED TEAM" to begin autonomous security testing</p>
                        </motion.div>
                    )}

                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mb-2 flex items-start gap-3 leading-relaxed"
                        >
                            <span className="text-xs text-gray-600 shrink-0">[{log.timestamp}]</span>

                            {log.type === 'SYSTEM' && (
                                <span className="text-cyan-400">{log.message}</span>
                            )}
                            {log.type === 'ATTACK' && (
                                <span className="text-yellow-500">{log.message}</span>
                            )}
                            {log.type === 'DEFENSE' && (
                                <span className="text-emerald-500 flex items-center gap-1">
                                    <ShieldCheckIcon className="h-3 w-3 shrink-0" /> {log.message}
                                </span>
                            )}
                            {log.type === 'CRITICAL' && (
                                <span className="text-red-500 flex items-center gap-1 font-bold">
                                    <ShieldExclamationIcon className="h-3 w-3 shrink-0 animate-pulse" /> {log.message}
                                </span>
                            )}
                            {log.type === 'SUCCESS' && (
                                <span className="text-emerald-400">{log.message}</span>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing Cursor */}
                {active && (
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="h-4 w-2 bg-red-500 inline-block"
                    />
                )}
            </div>
        </div>
    );
};
