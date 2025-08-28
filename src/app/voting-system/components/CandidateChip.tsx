// components/CandidateChip.tsx
import * as React from "react";


/** Extract initials from the name (before any parentheses) */
function getInitials(full: string) {
    const base = full.split('(')[0].trim(); // "Alice Johnson"
    const parts = base
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .filter(Boolean);
    if (parts.length === 0) return '??';
    const first = parts[0][0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
    return (first + last).toUpperCase();
}

/** Extract party inside parentheses if present */
function getParty(full: string) {
    const m = full.match(/\(([^)]+)\)/);
    return m ? m[1].trim() : null;
}


function bgClassFor(name: string) {
    const party = getParty(name)?.toLowerCase();
    if (party?.includes('green')) return 'bg-green-600';
    if (party?.includes('conservative')) return 'bg-blue-600';
    if (party?.includes('liberal')) return 'bg-red-600';

    // fallback: hash-based palette for stability
    const palette = ['bg-sky-600', 'bg-amber-600', 'bg-violet-600', 'bg-rose-600', 'bg-emerald-600', 'bg-cyan-600'];
    const hash = Array.from(name).reduce((s, ch) => s + ch.charCodeAt(0), 0);
    return palette[hash % palette.length];
}



export function CandidateChip({ name }: { name: string }) {
    const initials = getInitials(name);
    const party = getParty(name);
    const bg = bgClassFor(name);

    return (
        <div className="flex items-center gap-2 rounded-full border px-2 py-1 text-xs">
            <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-white font-medium ${bg}`}
            >
                {initials}
            </span>
            <span className="font-medium">{name.split("(")[0].trim()}</span>
            {party && <span className="text-muted-foreground">({party})</span>}
        </div>
    );
}
