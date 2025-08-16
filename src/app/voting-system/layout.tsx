'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Common layout for Voting System pages (TailwindCSS + Next.js App Router)
 *
 * No external libraries. Icons replaced with inline emoji / SVG where needed.
 * If you introduce reusable primitives, place them in your shared primitives file
 * or reuse the ones you already have.
 *
 * Suggested path: app/(site)/systems/layout.tsx
 */

// Types you mentioned
export interface TaxonomySystem {
    id: string;
    name: string;
    shortDescription: string;
}

export interface VotingSystem {
    id: string;
    name: string;
    shortDescription: string;
    taxonomyId: string;
    slug: string;
}

/**
 * Optional: If you have real data, replace SIDEBAR with a generated structure.
 * Example shape shown here to keep the file self‑contained and runnable.
 */


export default function SystemsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-svh bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
            {/* Skip link */}
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 rounded-lg bg-neutral-900 px-3 py-2 text-white dark:bg-white dark:text-neutral-900"
            >
                Skip to content
            </a>

            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-neutral-800 dark:bg-neutral-950/80">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                            <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center">🏛️</span>
                            <span className="font-semibold tracking-tight">How Leaders Are Chosen</span>
                        </Link>
                        <span className="hidden items-center gap-2 text-sm text-neutral-500 sm:flex">
                            <span aria-hidden className="inline-block h-4 w-4">›</span>
                            <Link href="/systems" className="hover:underline">Systems</Link>
                        </span>
                    </div>

                    <nav className="hidden items-center gap-6 text-sm sm:flex">
                        <Link href="/systems" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">Explore Systems</Link>
                        <Link href="/taxonomy" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">Taxonomy</Link>
                        <Link href="/about" className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white">About</Link>
                    </nav>
                </div>
            </header>

            {/* Body grid */}
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-4 py-6 sm:px-6 lg:px-8">
                {/* Sidebar */}
                <aside className="col-span-12 lg:col-span-3">
                    <details className="group lg:open" open>
                        <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl border border-neutral-200/70 bg-neutral-50 px-4 py-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                            <span className="inline-flex items-center gap-2">
                                <span aria-hidden className="inline-block h-4 w-4">🌐</span> Browse systems
                            </span>
                            <span aria-hidden className="inline-block h-4 w-4 transition-transform group-open:rotate-90">›</span>
                        </summary>
                        {/* <nav aria-label="Taxonomy" className="mt-3 space-y-4 rounded-xl">
                            {SIDEBAR.map(({ taxonomy, systems }) => (
                                <div key={taxonomy.id} className="rounded-xl border border-neutral-200/70 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
                                    <Link
                                        href={`/systems?type=${encodeURIComponent(taxonomy.id)}`}
                                        className="mb-2 inline-flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900"
                                    >
                                        <span className="inline-flex items-center gap-2">{taxonomy.name}</span>
                                        <span aria-hidden className="inline-block h-4 w-4">›</span>
                                    </Link>
                                    <ul className="space-y-1 pl-2">
                                        {systems.map((s) => (
                                            <li key={s.id}>
                                                <Link
                                                    href={`/systems/${s.slug}`}
                                                    className="block rounded-md px-2 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                                                >
                                                    {s.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </nav> */}
                    </details>
                </aside>

                {/* Main content */}
                <main id="content" className="col-span-12 lg:col-span-9">
                    <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                        {children}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="border-t border-neutral-200/70 py-8 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <p>
                            © {new Date().getFullYear()} How Leaders Are Chosen • An interactive guide to voting systems worldwide
                        </p>
                        <nav className="flex items-center gap-4">
                            <Link href="/systems" className="hover:underline">Explore Systems</Link>
                            <Link href="/glossary" className="hover:underline">Glossary</Link>
                            <Link href="/credits" className="hover:underline">Credits</Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
}
