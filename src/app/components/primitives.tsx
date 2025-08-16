'use client';

import * as React from "react";


export function Dot({ active }: { active: boolean }) {
    return (
        <span
            className={[
                "block h-2 rounded-full transition-all",
                active
                    ? "w-5 bg-[var(--ring)]"
                    : "w-2 bg-[var(--muted-foreground)]/60",
            ].join(" ")}
        />
    );
}

export function PrevIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 18l-6-6 6-6" />
        </svg>
    );
}

export function NextIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 18l6-6-6-6" />
        </svg>
    );
}



export function Chip({
    isActive,
    onClick,
    children,
    ariaLabel,
}: {
    isActive?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    ariaLabel?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={[
                "inline-flex items-center rounded-full border px-3 py-1 text-xs sm:text-sm whitespace-nowrap transition-transform active:scale-[0.98]",
                isActive
                    ? "bg-[var(--ring)] text-[var(--background)] border-[var(--ring)]"
                    : "bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)] hover:bg-[var(--muted)]",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

export function ViewToggle({
    value,
    onChange,
    allowTable = true,
}: {
    value: "grid" | "table";
    onChange: (v: "grid" | "table") => void;
    allowTable?: boolean;
}) {
    return (
        <div
            className="inline-flex rounded-lg border p-0.5 sm:p-1 shadow-sm
                 bg-[var(--card)] border-[var(--border)]"
            role="group"
            aria-label="Toggle view"
        >
            <ToggleButton
                active={value === "grid"}
                onClick={() => onChange("grid")}
                ariaLabel="Grid view"
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span className="sr-only">Grid</span>
            </ToggleButton>

            {allowTable && (
                <ToggleButton
                    active={value === "table"}
                    onClick={() => onChange("table")}
                    ariaLabel="Table view"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 sm:h-4 sm:w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                    <span className="sr-only">Table</span>
                </ToggleButton>
            )}
        </div>
    );
}

export function ToggleButton({
    active,
    onClick,
    ariaLabel,
    children,
}: {
    active?: boolean;
    onClick: () => void;
    ariaLabel?: string;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel}
            className={[
                "inline-flex items-center justify-center rounded-md px-2 py-1 text-xs sm:text-sm",
                active
                    ? "bg-[var(--ring)] text-[var(--background)]"
                    : "text-[var(--muted-foreground)] hover:bg-[var(--muted)]",
            ].join(" ")}
        >
            {children}
        </button>
    );
}

export function Th({ children }: { children: React.ReactNode }) {
    return (
        <th
            scope="col"
            className="px-2 sm:px-3 py-2 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wide
                 text-[var(--muted-foreground)]"
        >
            {children}
        </th>
    );
}

export function Td({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <td
            className={[
                "px-2 sm:px-3 py-2 sm:py-3 text-[var(--card-foreground)]",
                className,
            ].join(" ")}
        >
            {children}
        </td>
    );
}
