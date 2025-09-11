// =========================
// file: app/features/FeaturesPage.tsx
// =========================
'use client';


import React, { useDeferredValue, useMemo, useState } from 'react';
import HeroHeader from '../components/HeroHeader';
import { Container } from '../components/Container';
import { featureCatalog } from '@/lib/features/catalog';
import { ViewToggle } from '../components/primitives';
import { SectionView } from './components/SectionView';
import { TableView } from './components/TableView';


// === Types shared with child views ===
export type FeatureItem = { label: string; detail?: string };
export type FeatureSection = {
    id: string;
    title: string;
    description?: string;
    items: FeatureItem[];
};
export type ViewMode = 'sections' | 'table';


// === Local utils ===
const normalize = (v: string) =>
    v
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
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


    const visible = useMemo(() => {
        const needle = normalize(deferredQ);
        if (!needle) return featureCatalog as FeatureSection[];
        return featureCatalog.filter((s) => searchableOf(s).includes(needle)) as FeatureSection[];
    }, [deferredQ]);


    return (
        <>
            <HeroHeader
                title={"Election System Features"}
                bgImage="https://images.unsplash.com/photo-1631540700496-af53025473e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageCredit="kommumikation"
                imageCreditLink="https://unsplash.com/@kommumikation"
            />


            <Container>
                <div className="flex flex-wrap gap-2 items-center">
                    <ViewToggle
                        value={view === 'sections' ? 'grid' : 'table'}
                        onChange={(v) => setView(v === 'grid' ? 'sections' : 'table')}
                        aria-label="Toggle features view"
                    />
                    <div className="ml-auto min-w-[200px] max-w-sm">
                        <input
                            className="input w-full"
                            placeholder="Search features, e.g. ‘Condorcet’, ‘lists’, ‘runoff’…"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            inputMode="search"
                            aria-label="Search features"
                        />
                    </div>
                </div>


                {view === 'sections' ? (
                    <SectionView sections={visible} />
                ) : (
                    <TableView sections={visible} />
                )}
            </Container>
        </>
    );
}