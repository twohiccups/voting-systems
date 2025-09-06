import * as React from 'react';

// ------------------------------------
// Types
// ------------------------------------

// common.tsx
export type FooterActionsProps = {
    summary: React.ReactNode;
    warning?: React.ReactNode;              // legacy: treated as warningAlways
    warningAlways?: React.ReactNode;        // NEW: show always
    warningOnSubmit?: React.ReactNode;      // NEW: show only after submit attempt & invalid
    helper?: React.ReactNode;

    onClear?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
    isValid?: boolean;
    className?: string;
};

export function FooterActions({
    summary,
    warning,                // legacy alias
    warningAlways,
    warningOnSubmit,
    helper,
    onClear,
    onSubmit,
    submitLabel = 'Submit',
    isValid = true,
    className,
}: FooterActionsProps) {
    const [attempted, setAttempted] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleClear = () => {
        onClear?.();
        setAttempted(false);
        setSubmitted(false);
    };

    const handleSubmit = () => {
        setAttempted(true);
        if (isValid) {
            onSubmit?.();
            setSubmitted(true);
        }
    };

    const submittedMsg = submitted ? 'Submitted' : undefined;

    const always = warningAlways ?? warning; // back-compat

    return (
        <div
            className={[
                'mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between',
                className,
            ].filter(Boolean).join(' ')}
        >
            {/* Left: summary + messages */}
            <div className="text-sm leading-relaxed text-[var(--muted-foreground)] space-y-2">
                <div>{summary}</div>

                {/* ALWAYS-ON warning (e.g., live validation like duplicates) */}
                {always ? (
                    <div role="status" className="text-[13px] text-red-600 dark:text-red-400">
                        {always}
                    </div>
                ) : null}

                {/* SUBMIT-ONLY warning (e.g., “you must rank all candidates”) */}
                {attempted && !isValid && warningOnSubmit ? (
                    <div role="alert" className="text-[13px] text-red-600 dark:text-red-400">
                        {warningOnSubmit}
                    </div>
                ) : null}

                {helper ? <div className="text-[12px] opacity-80">{helper}</div> : null}
                {submittedMsg ? (
                    <span aria-live="polite" className="sr-only">{submittedMsg}</span>
                ) : null}
            </div>

            {/* Right: actions */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 w-full sm:w-auto">
                <button
                    type="button"
                    onClick={handleClear}
                    className={[
                        'border px-4 py-2 theme-transition',
                        'rounded-none border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]',
                        'hover:bg-[var(--muted)] w-full sm:w-auto',
                    ].join(' ')}
                >
                    Clear
                </button>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitted}
                    className={[
                        'px-4 py-2 theme-transition w-full sm:w-auto',
                        submitted
                            ? 'rounded-none bg-green-600 text-white hover:opacity-90'
                            : 'rounded-none bg-[var(--accent)] text-[var(--accent-foreground)] hover:opacity-90',
                        'disabled:opacity-50 disabled:pointer-events-none',
                    ].join(' ')}
                >
                    {submitted ? 'Submitted' : submitLabel}
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
