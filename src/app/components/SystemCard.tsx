// File: components/Card.tsx
"use client";
import * as React from "react";
import Link from "next/link";

type SystemCardProps = {
    href: string;
    title?: string;
    description?: string;
    footer?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
};

export function SystemCard({
    href,
    title,
    description,
    footer,
    className = "",
    children,
}: SystemCardProps) {
    return (
        <Link href={href} className="block focus-visible:outline-none">
            <div
                className={[
                    // layout + container
                    "relative max-w-full rounded-xl border p-3 sm:p-4 overflow-hidden",
                    // theme tokens
                    "bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]",
                    // motion/hover
                    "transition-[transform,box-shadow] duration-150 ease-out hover:shadow-md",
                    // focus ring (applied on div so corners are respected)
                    "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                    // link reset
                    "no-underline",
                    className,
                ].join(" ")}
            >
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

                {description && (
                    <p className="text-base line-clamp-3 md:line-clamp-none lg:line-clamp-3">
                        {description}
                    </p>
                )}

                {footer && <div className="mt-3">{footer}</div>}
                {children}
            </div>
        </Link>
    );
}
