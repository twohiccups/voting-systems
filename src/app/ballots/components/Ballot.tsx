'use client';

import * as React from 'react';

// Simplified: no globals import, no cx helper. We inline class merging with
// [ ... ].filter(Boolean).join(' ').

export type BallotCardProps = {
    title?: string;
    instructions?: string;
    children: React.ReactNode;
    className?: string;
};

export function BallotCard({ title, instructions, children, className }: BallotCardProps) {
    return (
        <section
            aria-label={title ?? 'Ballot'}
            className={[
                'relative mx-auto w-full max-w-2xl border bg-[var(--card)] text-[var(--card-foreground)] p-5',
                'shadow-sm rounded-none border-[var(--border)] theme-transition',
                className,
            ].filter(Boolean).join(' ')}
        >
            {title ? (
                <header className="mb-3 border-b pb-2 border-[var(--border)]">
                    <h2 className="text-base font-bold uppercase tracking-wide text-[var(--foreground)]">{title}</h2>
                </header>
            ) : null}

            {instructions ? <BallotInstructions className="mb-4">{instructions}</BallotInstructions> : null}

            {children}
        </section>
    );
}

export type BallotInstructionsProps = {
    children: React.ReactNode;
    className?: string;
};

export function BallotInstructions({ children, className }: BallotInstructionsProps) {
    return (
        <p
            className={[
                'text-sm leading-relaxed italic text-[var(--muted-foreground)]',
                "[font-family:cursive,'Comic Sans MS','Brush Script MT',ui-serif]",
                className,
            ].filter(Boolean).join(' ')}
        >
            {children}
        </p>
    );
}

export type CheckboxSquareProps = {
    checked: boolean;
    disabled?: boolean;
    size?: number;
    ariaLabel?: string;
};

function CheckboxSquare({ checked, disabled, size = 30, ariaLabel }: CheckboxSquareProps) {
    return (
        <span
            role="img"
            aria-label={ariaLabel}
            aria-hidden={ariaLabel ? undefined : true}
            className={[
                'flex items-center justify-center border text-[var(--foreground)]',
                // Default: light mode → card background, dark mode → muted background
                'bg-[var(--card)] dark:bg-[var(--muted)]',
                'rounded-none border-[var(--border)] theme-transition',
                disabled ? 'opacity-50' : '',
                checked ? 'bg-[var(--accent)] text-[var(--accent-foreground)]' : '',
            ].filter(Boolean).join(' ')}
            style={{ width: size, height: size }}
        >
            {checked ? (
                <svg
                    width={Math.floor(size * 0.72)}
                    height={Math.floor(size * 0.72)}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M20 6L9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : null}
        </span>
    );
}

export type NumberSquareProps = {
    value: number | null;
    onChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    ariaLabel?: string;
    widthPx?: number;
    heightPx?: number;
};

function NumberSquare({
    value,
    onChange,
    min = 0,
    max = 10,
    disabled,
    ariaLabel,
    widthPx = 40,
    heightPx = 28,
}: NumberSquareProps) {
    return (
        <input
            type="number"
            inputMode="numeric"
            aria-label={ariaLabel}
            min={min}
            max={max}
            value={value ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const next = e.target.value === '' ? null : Number(e.target.value);
                onChange?.(Number.isFinite(next as number) || next === null ? next : null);
            }}
            disabled={disabled}
            className={[
                'h-[28px] w-[40px] border text-center text-sm theme-transition',
                'rounded-none border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
                disabled ? 'opacity-50' : '',
            ].filter(Boolean).join(' ')}
            style={{ width: widthPx, height: heightPx }}
            placeholder="–"
        />
    );
}

export type BallotOptionVariant = 'checkbox' | 'rank' | 'score';

export type BallotOptionProps = {
    /** id is optional now; no htmlFor used */
    id?: string;
    label: string;
    sublabel?: string;
    variant?: BallotOptionVariant;

    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;

    rank?: number | null;
    onRankChange?: (rank: number | null) => void;
    /** Optional overrides for the rank input range (defaults: 1..99) */
    rankMin?: number;
    rankMax?: number;

    score?: number | null;
    onScoreChange?: (score: number | null) => void;
    /** Optional overrides for the score input range (defaults: 0..10) */
    scoreMin?: number;
    scoreMax?: number;

    disabled?: boolean;
    className?: string;
};

export function BallotOption({
    // id is intentionally unused to avoid cross-instance collisions
    label,
    sublabel,
    variant = 'checkbox',
    checked = false,
    onCheckedChange,
    rank = null,
    onRankChange,
    rankMin,
    rankMax,
    score = null,
    onScoreChange,
    scoreMin,
    scoreMax,
    disabled = false,
    className,
}: BallotOptionProps) {
    const control = (() => {
        if (variant === 'checkbox') {
            return (
                <CheckboxSquare
                    checked={!!checked}
                    disabled={disabled}
                    size={30}
                    ariaLabel={undefined /* rely on visible label text */}
                />
            );
        }
        if (variant === 'rank') {
            return (
                <NumberSquare
                    value={rank}
                    onChange={onRankChange}
                    min={rankMin ?? 1}
                    max={rankMax ?? 99}
                    disabled={disabled}
                    ariaLabel={`${label} rank`}
                    widthPx={40}
                    heightPx={28}
                />
            );
        }
        return (
            <NumberSquare
                value={score}
                onChange={onScoreChange}
                min={scoreMin ?? 0}
                max={scoreMax ?? 10}
                disabled={disabled}
                ariaLabel={`${label} score`}
                widthPx={40}
                heightPx={28}
            />
        );
    })();

    return (
        <label
            className={[
                'flex items-center justify-between gap-3 border p-2 theme-transition',
                'rounded-none border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]',
                disabled ? 'pointer-events-none opacity-60' : 'hover:bg-[var(--muted)]',
                className,
            ].filter(Boolean).join(' ')}
        >
            <div className="min-w-0 leading-tight">
                <div className="truncate text-[15px] font-medium text-[var(--foreground)]">{label}</div>
                {sublabel ? <div className="truncate text-xs text-[var(--muted-foreground)]">{sublabel}</div> : null}
            </div>

            {control}

            {variant === 'checkbox' ? (
                // Real checkbox stays inside the label → implicit labeling, no id needed
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={!!checked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckedChange?.(e.target.checked)}
                    disabled={disabled}
                />
            ) : null /* no hidden dummy input for rank/score */}
        </label>
    );
}

export function BallotDivider() {
    return <div className="my-4 h-px w-full bg-[var(--border)] theme-transition" aria-hidden />;
}
