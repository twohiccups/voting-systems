// components/Footer.tsx
"use client";
import * as React from "react";
import Link from "next/link";
import GeometricBleed from "./GeometricBleed";

export function Footer() {
    return (
        <footer className="border-t border-[var(--border)] bg-black text-[)]">
            <GeometricBleed >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Left: open source note */}

                    {/* Right: navigation links */}
                    <nav className="flex flex-wrap gap-4 text-sm">
                        <Link
                            href="/about"
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/systems"
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            Voting Systems
                        </Link>
                        <Link
                            href="/resources"
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            Resources
                        </Link>
                        <Link
                            href="/contact"
                            className="hover:text-[var(--foreground)] transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </GeometricBleed>
        </footer>
    );
}
