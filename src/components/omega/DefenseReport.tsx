"use client";

import React from 'react';
import { DocumentArrowDownIcon, ShieldCheckIcon, ShieldExclamationIcon, ClockIcon } from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';

interface DefenseReportProps {
    stats: {
        attacks: number;
        blocked: number;
        breached: number;
    };
    timestamp: string;
}

export const DefenseReport: React.FC<DefenseReportProps> = ({ stats, timestamp }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Header
        doc.setFontSize(20);
        doc.setTextColor(220, 38, 38); // Red
        doc.text('OMEGA PHANTOM', 20, 20);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text('Autonomous Red Team Security Report', 20, 28);

        // Metadata
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date(timestamp).toLocaleString()}`, 20, 36);
        doc.text('Classification: INTERNAL USE ONLY', 20, 42);

        // Divider
        doc.setDrawColor(220, 38, 38);
        doc.line(20, 48, 190, 48);

        // Executive Summary
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Executive Summary', 20, 58);

        doc.setFontSize(10);
        doc.text(`Total Attack Vectors Tested: ${stats.attacks}`, 30, 68);
        doc.text(`Successfully Blocked: ${stats.blocked}`, 30, 75);
        doc.text(`Vulnerabilities Detected: ${stats.breached}`, 30, 82);

        const successRate = stats.attacks > 0
            ? ((stats.blocked / stats.attacks) * 100).toFixed(1)
            : '0.0';
        doc.text(`Defense Success Rate: ${successRate}%`, 30, 89);

        // Risk Assessment
        doc.setFontSize(14);
        doc.text('Risk Assessment', 20, 105);

        doc.setFontSize(10);
        if (stats.breached === 0) {
            doc.setTextColor(16, 185, 129); // Green
            doc.text('✓ SECURE: All attack vectors successfully blocked', 30, 115);
            doc.text('  No immediate action required.', 30, 122);
        } else if (stats.breached <= 2) {
            doc.setTextColor(234, 179, 8); // Yellow
            doc.text('⚠ MODERATE RISK: Some vulnerabilities detected', 30, 115);
            doc.text('  Recommend immediate patch deployment.', 30, 122);
        } else {
            doc.setTextColor(220, 38, 38); // Red
            doc.text('⚠ HIGH RISK: Multiple vulnerabilities detected', 30, 115);
            doc.text('  URGENT: Deploy security patches immediately.', 30, 122);
        }

        // Recommendations
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Recommendations', 20, 140);

        doc.setFontSize(10);
        doc.text('1. Review OMEGA BLACK security rules for detected vulnerabilities', 30, 150);
        doc.text('2. Update prompt sanitization patterns', 30, 157);
        doc.text('3. Implement additional input validation layers', 30, 164);
        doc.text('4. Schedule follow-up red team simulation in 7 days', 30, 171);

        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('DEVLOKA OMEGA - Sovereign AI Command Center', 20, 280);
        doc.text('Digital Atmanirbharta | Indian IT Act Compliant', 20, 285);

        // Save
        doc.save(`OMEGA_PHANTOM_Report_${new Date(timestamp).toISOString().split('T')[0]}.pdf`);
    };

    const successRate = stats.attacks > 0
        ? ((stats.blocked / stats.attacks) * 100).toFixed(1)
        : '0.0';

    const getRiskLevel = () => {
        if (stats.breached === 0) return { level: 'SECURE', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
        if (stats.breached <= 2) return { level: 'MODERATE', color: 'text-yellow-500', bg: 'bg-yellow-500/10' };
        return { level: 'HIGH RISK', color: 'text-red-500', bg: 'bg-red-500/10' };
    };

    const risk = getRiskLevel();

    return (
        <div className="w-full max-w-2xl rounded-lg border border-gray-700 bg-gray-900 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Defense Report</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                        <ClockIcon className="h-4 w-4" />
                        {new Date(timestamp).toLocaleString()}
                    </p>
                </div>
                <button
                    onClick={generatePDF}
                    className="flex items-center gap-2 rounded bg-red-500/10 border border-red-500/50 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-black transition-colors"
                    aria-label="Download PDF report"
                >
                    <DocumentArrowDownIcon className="h-5 w-5" />
                    Export PDF
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="rounded-lg bg-gray-800 p-4">
                    <div className="text-2xl font-bold text-white">{stats.attacks}</div>
                    <div className="text-xs text-gray-400">Attack Vectors</div>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-4">
                    <div className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
                        <ShieldCheckIcon className="h-6 w-6" />
                        {stats.blocked}
                    </div>
                    <div className="text-xs text-gray-400">Blocked</div>
                </div>
                <div className="rounded-lg bg-red-500/10 p-4">
                    <div className="text-2xl font-bold text-red-500 flex items-center gap-2">
                        <ShieldExclamationIcon className="h-6 w-6" />
                        {stats.breached}
                    </div>
                    <div className="text-xs text-gray-400">Breached</div>
                </div>
            </div>

            {/* Risk Assessment */}
            <div className={`rounded-lg ${risk.bg} border border-gray-700 p-4 mb-4`}>
                <div className="flex items-center gap-2 mb-2">
                    <div className={`text-sm font-bold ${risk.color}`}>RISK LEVEL: {risk.level}</div>
                </div>
                <div className="text-sm text-gray-300">
                    Defense Success Rate: <span className="font-bold text-white">{successRate}%</span>
                </div>
            </div>

            {/* Recommendations */}
            <div className="text-sm text-gray-400">
                <div className="font-semibold text-white mb-2">Recommendations:</div>
                <ul className="list-disc list-inside space-y-1">
                    <li>Review OMEGA BLACK security rules</li>
                    <li>Update prompt sanitization patterns</li>
                    <li>Schedule follow-up simulation in 7 days</li>
                </ul>
            </div>
        </div>
    );
};
