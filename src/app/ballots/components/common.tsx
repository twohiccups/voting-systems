import * as React from 'react';

// ------------------------------------
// Types
// ------------------------------------

// ------------------------------------
// Shared UI Bits
// ------------------------------------


export function FooterActions({
    onClear,
    summary,
    isValid,
    warning,
    helper,
}: {
    onClear: () => void;
    summary: string;
    isValid: boolean;
    warning?: string;
    helper?: string;
}) {
    return (
        <div className="mt-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
                <p className="text-sm text-[var(--foreground)]">{summary}</p>
                {warning ? (
                    <p className="mt-1 text-xs text-red-600">{warning}</p>
                ) : helper ? (
                    <p className="mt-1 text-xs text-[var(--muted-foreground)]">{helper}</p>
                ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-2">
                <button
                    type="button"
                    onClick={onClear}
                    className="px-3 py-1 text-sm border rounded-none theme-transition border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] hover:bg-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                >
                    Clear
                </button>
                <button
                    type="button"
                    disabled={!isValid}
                    onClick={() => alert('This is a demo. Hook up your own submit handler!')}
                    className="px-3 py-1 text-sm border rounded-none theme-transition border-[var(--border)] bg-[var(--accent)] text-[var(--accent-foreground)] disabled:opacity-50"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

// ------------------------------------
// Helpers
// ------------------------------------
export function labelFor(list: { id: string; label: string }[], id: string | null): string {
    const item = list.find((x) => x.id === id);
    return item ? item.label : '—';
}

export function hasDuplicateRanks(map: Record<string, number | null>): boolean {
    const values = Object.values(map).filter((v): v is number => v !== null);
    return new Set(values).size !== values.length;
}

export function rankSummary(
    list: { id: string; label: string }[],
    map: Record<string, number | null>
): string {
    const filled = Object.entries(map)
        .filter(([, v]) => v !== null)
        .sort((a, b) => (a[1]! as number) - (b[1]! as number))
        .map(([id, r]) => `${(r as number).toString()}. ${labelFor(list, id)}`);
    return filled.length ? `Your ranking: ${filled.join('  •  ')}` : 'No ranks yet.';
}

export function scoreSummary(
    list: { id: string; label: string }[],
    map: Record<string, number | null>
): string {
    const parts = Object.entries(map)
        .filter(([, v]) => v !== null)
        .map(([id, s]) => `${labelFor(list, id)}: ${s}`);
    return parts.length ? `Your scores → ${parts.join('  •  ')}` : 'No scores yet.';
}
