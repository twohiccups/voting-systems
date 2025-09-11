// components/Footer.tsx
"use client";
import * as React from "react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] min-h-[200px]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Left: open source note */}

                {/* Right: navigation links */}
                <nav className="flex flex-wrap gap-4 text-sm">
                    <Link
                        href="/"
                        className="hover:text-[var(--foreground)] transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/features"
                        className="hover:text-[var(--foreground)] transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="/ballot"
                        className="hover:text-[var(--foreground)] transition-colors"
                    >
                        Ballots
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
