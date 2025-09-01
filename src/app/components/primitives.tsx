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


export function CheckIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export function XIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
            <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
}
export function InfoIcon(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 5.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM11 10h2v7h-2v-7z" />
        </svg>
    );
}


// ---------- Types ----------
export type StepItemData = {
    question: React.ReactNode;
    detail?: React.ReactNode;
};

export type StepListProps = {
    items: StepItemData[];
    startIndex?: number; // default 1
    className?: string;
    itemClassName?: string;
    renderNumber?: boolean | ((index: number) => React.ReactNode);
};

export type StepItemProps = {
    /** Optional display index/label. If omitted, no circle is shown. */
    index?: React.ReactNode;
    question: React.ReactNode;
    detail?: React.ReactNode;
    className?: string;
    circleClassName?: string;
};

export type StepCardProps = {
    title?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    titleClassName?: string;
};




export const StepCircle: React.FC<{ num?: React.ReactNode; className?: string }> = ({ num }) => (
    <div className="mr-3 sm:mr-4 mt-0.5 flex-shrink-0 inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center
                       rounded-md bg-gray-800 text-white text-xs sm:text-sm font-semibold"
        aria-hidden
    >
        {num}
    </div>
);






// ---------- Row: StepItem ----------
export const StepItem: React.FC<StepItemProps> = ({ index, question, detail, className, circleClassName }) => (
    <li className={["flex items-start", className].filter(Boolean).join(" ")}>
        {index !== undefined && index !== null ? (
            <StepCircle num={index} className={circleClassName} />
        ) : null}
        <div>
            <p className="font-semibold text-[var(--card-foreground)] text-sm sm:text-base">{question}</p>
            {detail ? (
                <p className="text-[var(--muted-foreground)] text-xs sm:text-sm">{detail}</p>
            ) : null}
        </div>
    </li>
);

// ---------- Collection: StepList ----------
export const StepList: React.FC<StepListProps> = ({
    items,
    startIndex = 1,
    className,
    itemClassName,
    renderNumber = true,
}) => (
    <ul className={["space-y-3 sm:space-y-4", className].filter(Boolean).join(" ")}>
        {items.map((item, i) => {
            const baseIndex = startIndex + i;
            const computedIndex =
                typeof renderNumber === "function"
                    ? renderNumber(baseIndex)
                    : renderNumber === false
                        ? undefined
                        : baseIndex;

            return (
                <StepItem
                    key={i}
                    index={computedIndex}
                    question={item.question}
                    detail={item.detail}
                    className={itemClassName}
                />
            );
        })}
    </ul>
);

// ---------- Layout wrapper: StepCard ----------
export const StepCard: React.FC<StepCardProps> = ({ title, children, className, titleClassName }) => (
    <div
        className={[
            "theme-transition rounded-2xl border p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm",
            "bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]",
            className,
        ].filter(Boolean).join(" ")}
    >
        {title ? (
            <h3 className={["text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6", titleClassName].filter(Boolean).join(" ")}>{title}</h3>
        ) : null}
        {children}
    </div>
);


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

export type BadgeProps = {
    children: React.ReactNode;
    /** Accepts known palette colors, but also any string */
    color?: "green" | "blue" | "red" | "gray" | (string & {});
    className?: string;
};

const colorClasses: Record<"green" | "blue" | "red" | "gray", { bg: string; text: string }> = {
    green: { bg: "bg-green-100", text: "text-green-700" },
    blue: { bg: "bg-blue-100", text: "text-blue-700" },
    red: { bg: "bg-red-100", text: "text-red-700" },
    gray: { bg: "bg-gray-100", text: "text-gray-700" },
};

function resolveColor(color?: string) {
    return (color && color in colorClasses ? color : "gray") as keyof typeof colorClasses;
}

export function Badge({ children, color, className = "" }: BadgeProps) {
    const resolved = resolveColor(color);
    const c = colorClasses[resolved];
    return (
        <span
            className={[
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                c.bg,
                c.text,
                className,
            ].join(" ")}
        >
            {children}
        </span>
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


// --- BulletList: small dot, centered, mobile-friendly ---
export function BulletList({
    items,
    className = "",
    itemClassName = "",
}: {
    items: { label: React.ReactNode; detail?: React.ReactNode }[];
    className?: string;
    itemClassName?: string;
}) {
    return (
        <ul className={["space-y-2 sm:space-y-3", className].join(" ")}>
            {items.map((it, i) => (
                <li
                    key={i}
                    className={[
                        // grid keeps the dot size fixed and gives text the rest of the line
                        "grid grid-cols-[auto_1fr] gap-x-2 sm:gap-x-3",
                        // vertically center the dot vs. the whole text block
                        "items-center",
                        itemClassName,
                    ].join(" ")}
                >
                    <span
                        className="block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[var(--ring)]"
                        aria-hidden
                    />
                    <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base text-[var(--card-foreground)] leading-snug">
                            {it.label}
                        </p>
                        {it.detail ? (
                            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-snug">
                                {it.detail}
                            </p>
                        ) : null}
                    </div>
                </li>
            ))}
        </ul>
    );
}
