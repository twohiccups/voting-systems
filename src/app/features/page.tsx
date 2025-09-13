// =========================
// file: app/features/FeaturesPage.tsx
// =========================
'use client';

import React, { useDeferredValue, useMemo, useState } from 'react';
import HeroHeader from '../components/HeroHeader';
import { Container } from '../components/Container';
import { featureCatalog } from '@/lib/features/catalog';
import { ViewToggle } from '../components/primitives';
import { TableView } from './components/TableView';
import Section from '../components/Section';
import { FeatureSection } from '../types';
import FeatureCardSection from './components/FeatureCardSection';


export type ViewMode = 'sections' | 'table';

const normalize = (v: string) =>
    v
        .toLowerCase()
        .normalize('NFD')
        // strip combining diacritics
        .replace(/[\u0300-\u036f]/g, '')
        // collapse whitespace
        .replace(/\s+/g, ' ')
        .trim();

const searchableOf = (s: FeatureSection) => {
    const head = `${s.title} ${s.description ?? ''}`;
    const items = s.items.map((it) => `${it.label} ${it.detail ?? ''}`).join(' ');
    return normalize(`${head} ${items}`);
};

export default function FeaturesPage() {
    const [view, setView] = useState<ViewMode>('sections');
    const [q, setQ] = useState('');
    const deferredQ = useDeferredValue(q);

    // Precompute normalized haystacks once
    const indexed = useMemo(
        () =>
            (featureCatalog as FeatureSection[]).map((s) => ({
                section: s,
                haystack: searchableOf(s),
            })),
        []
    );

    const visible = useMemo(() => {
        const needle = normalize(deferredQ);
        if (!needle) return featureCatalog as FeatureSection[];
        return indexed
            .filter(({ haystack }) => haystack.includes(needle))
            .map(({ section }) => section);
    }, [deferredQ, indexed]);

    return (
        <>
            <HeroHeader
                title={'Election System Features'}
                bgImage="https://images.unsplash.com/photo-1631540700496-af53025473e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageCredit="kommumikation"
                imageCreditLink="https://unsplash.com/@kommumikation"
            />

            {/* Tighten spacing below the hero */}
            <Container>
                {/* Controls row: reduced vertical spacing and tighter layout */}
                <div className="flex flex-wrap items-center gap-2 md:gap-3 -mt-4 md:-mt-6 mb-3 md:mb-4">
                    <div className="hidden sm:block">
                        <ViewToggle
                            value={view === 'sections' ? 'grid' : 'table'}
                            onChange={(v) => setView(v === 'grid' ? 'sections' : 'table')}
                            aria-label="Toggle features view"
                        />
                    </div>

                    {/* Make the search expand nicely while staying compact */}
                    <div className="mr-auto min-w-[200px] max-w-sm w-full sm:w-auto">
                        <input
                            className="input w-full"
                            placeholder="Search features"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            inputMode="search"
                            aria-label="Search features"
                        />
                    </div>
                </div>

                {/* Reduce space above the content */}

                {view === 'sections' ? (
                    <>
                        {
                            visible.map((s) => (
                                <Section key={s.id}>
                                    <FeatureCardSection s={s} />
                                </Section>
                            ))
                        }
                    </>
                ) : (

                    <TableView sections={visible} />
                )}
            </Container>
        </>
    );
}
