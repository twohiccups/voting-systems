'use client';

import React from 'react';
import Link from 'next/link';
import HeroHeader from '../components/HeroHeader';

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
        <>
            {children}
            {/* <HeroHeader title={''} bgImage={''} /> */}
        </>
    );
}
