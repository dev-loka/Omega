import { NextRequest, NextResponse } from 'next/server';

export interface DefenseResult {
    attackType: string;
    payload: string;
    blocked: boolean;
    reason: string;
    timestamp: string;
}

// OMEGA BLACK Security Middleware
class OmegaBlackDefense {
    // SQL Injection Detection
    detectSQLInjection(input: string): boolean {
        const sqlPatterns = [
            /(\bDROP\b|\bDELETE\b|\bUPDATE\b|\bINSERT\b).*\bTABLE\b/i,
            /--/,
            /;.*--/,
            /'\s*OR\s*'1'\s*=\s*'1/i,
            /UNION.*SELECT/i
        ];
        return sqlPatterns.some(pattern => pattern.test(input));
    }

    // XSS Detection
    detectXSS(input: string): boolean {
        const xssPatterns = [
            /<script[^>]*>.*<\/script>/i,
            /javascript:/i,
            /on\w+\s*=/i, // Event handlers like onclick=
            /<iframe/i,
            /<object/i
        ];
        return xssPatterns.some(pattern => pattern.test(input));
    }

    // Prompt Injection Detection
    detectPromptInjection(input: string): boolean {
        const injectionPatterns = [
            /ignore\s+(all\s+)?previous\s+instructions/i,
            /system\s+prompt/i,
            /reveal\s+your\s+(instructions|prompt|rules)/i,
            /you\s+are\s+now\s+in\s+developer\s+mode/i,
            /disregard\s+all\s+prior/i
        ];
        return injectionPatterns.some(pattern => pattern.test(input));
    }

    // PII Detection
    detectPII(input: string): boolean {
        const piiPatterns = [
            /\b\d{3}-\d{2}-\d{4}\b/, // SSN
            /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/, // Credit card
            /generate.*credit\s+card/i,
            /generate.*ssn/i,
            /generate.*social\s+security/i
        ];
        return piiPatterns.some(pattern => pattern.test(input));
    }

    // Comprehensive Defense Check
    analyze(payload: string, attackType: string): DefenseResult {
        const timestamp = new Date().toISOString();

        // Check all defense mechanisms
        if (this.detectSQLInjection(payload)) {
            return {
                attackType,
                payload,
                blocked: true,
                reason: 'SQL Injection pattern detected and sanitized',
                timestamp
            };
        }

        if (this.detectXSS(payload)) {
            return {
                attackType,
                payload,
                blocked: true,
                reason: 'XSS attack vector detected and neutralized',
                timestamp
            };
        }

        if (this.detectPromptInjection(payload)) {
            return {
                attackType,
                payload,
                blocked: true,
                reason: 'Prompt injection attempt blocked by OMEGA BLACK',
                timestamp
            };
        }

        if (this.detectPII(payload)) {
            return {
                attackType,
                payload,
                blocked: true,
                reason: 'PII generation request denied',
                timestamp
            };
        }

        // If no threats detected
        return {
            attackType,
            payload,
            blocked: false,
            reason: 'No threats detected - payload passed through',
            timestamp
        };
    }
}

export async function POST(req: NextRequest) {
    try {
        const { payload, attackType } = await req.json();

        if (!payload || !attackType) {
            return NextResponse.json(
                { error: 'Payload and attack type required' },
                { status: 400 }
            );
        }

        const defense = new OmegaBlackDefense();
        const result = defense.analyze(payload, attackType);

        return NextResponse.json(result);
    } catch (error) {
        console.error('DEFENSE ERROR:', error);
        return NextResponse.json(
            { error: 'Defense analysis failed' },
            { status: 500 }
        );
    }
}
