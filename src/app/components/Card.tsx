// File: components/Card.tsx
"use client";
import * as React from "react";
import Link from "next/link";

type CardProps = {
    href?: string;
    title?: string;
    description?: string;
    footer?: React.ReactNode; // e.g. taxonomy Chip
    className?: string;
    children?: React.ReactNode;
};

export function Card({
    href,
    title,
    description,
    footer,
    className = "",
    children,
}: CardProps) {
    const Wrapper = href ? Link : "div";

    return (
        <Wrapper
            href={href as string}
            className={[
                "group relative inline-block max-w-full rounded-xl border p-3 sm:p-4 shadow-sm transition",
                "bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]",
                "hover:shadow-md active:scale-[0.998]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                className,
            ].join(" ")}
        >
            {/* Title */}
            {title && (
                <h3
                    className={[
                        "mb-1.5 sm:mb-2 text-sm sm:text-base md:text-lg font-semibold leading-snug",
                        "line-clamp-2 md:line-clamp-none lg:line-clamp-2",
                    ].join(" ")}
                >
                    {title}
                </h3>
            )}

            {/* Description */}
            {description && (
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] line-clamp-3 md:line-clamp-none lg:line-clamp-3">
                    {description}
                </p>
            )}

            {/* Footer / Chip */}
            {footer && <div className="mt-3">{footer}</div>}

            {/* Custom children (optional extra content) */}
            {children}

            {/* Subtle hover overlay */}
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-[var(--ring)]/20" />
        </Wrapper>
    );
}
