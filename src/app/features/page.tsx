'use client';

import React, { useMemo, useState } from "react";
import { BulletList, Td, Th, ViewToggle } from "../components/primitives";
import SectionHeading from "../components/SectionHeading";
import { featureCatalog } from "@/lib/features/catalog";
import { Container } from "../components/Container";
import HeroHeader from "../components/HeroHeader";

// === Types ===
export type FeatureItem = { label: string; detail?: string };

export type FeatureSection = {
    id: string;
    title: string;
    description?: string;
    items: FeatureItem[];
};

type ViewMode = "sections" | "table";


export default function FeaturesPage() {
    const [view, setView] = useState<ViewMode>("sections");
    const [q, setQ] = useState("");

    const visible = useMemo(() => {
        if (!q.trim()) return featureCatalog;
        const needle = q.toLowerCase();
        return featureCatalog.filter((s) =>
            s.title.toLowerCase().includes(needle) ||
            (s.description ?? "").toLowerCase().includes(needle) ||
            s.items.some((it) =>
                it.label.toLowerCase().includes(needle) ||
                (it.detail?.toLowerCase() ?? "").includes(needle)
            )
        );
    }, [q]);

    return (
        <>
            <HeroHeader
                title={"Election System Features"}
                bgImage="https://images.unsplash.com/photo-1631540700496-af53025473e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                imageCredit="kommumikation"
                imageCreditLink="https://unsplash.com/@kommumikation" />

            <Container>
                <div className="flex flex-wrap gap-2 items-center">
                    <ViewToggle
                        value={view === "sections" ? "grid" : "table"}
                        onChange={(v) =>
                            setView(v === "grid" ? "sections" : "table")
                        }
                    />
                    <div className="ml-auto min-w-[200px] max-w-sm">
                        <input
                            className="input w-full"
                            placeholder="Search features, e.g. ‘Condorcet’, ‘lists’, ‘runoff’…"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                </div>

                {view === "sections" ? (
                    <SectionView sections={visible} />
                ) : (
                    <TableView sections={visible} />
                )}
            </Container>
        </>
    );
}

// === Section-based layout (with BulletList) ===
function SectionView({ sections }: { sections: FeatureSection[] }) {
    return (
        <div className="space-y-6 min-h-screen">
            {sections.map((s) => (
                <section
                    key={s.id}
                    id={s.id}                         // 👈 anchor target
                    className={[
                        "rounded-2xl border border-[var(--border)] bg-[var(--card)]",
                        "p-4 sm:p-6",
                        "relative",
                        "ps-4 sm:ps-6",
                    ].join(" ")}
                >
                    <header className="mb-3 sm:mb-4">
                        <h2 className="text-base sm:text-lg font-semibold leading-tight">
                            {s.title}
                        </h2>
                        {s.description ? (
                            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                                {s.description}
                            </p>
                        ) : null}
                    </header>

                    <BulletList
                        items={s.items.map((it) => ({
                            label: it.label,
                            detail: it.detail,
                        }))}
                    />
                </section>
            ))}
        </div>
    );
}

// === Table view (also with BulletList) ===
function TableView({ sections }: { sections: FeatureSection[] }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="min-w-full divide-y divide-[var(--border)]">
                <thead>
                    <tr>
                        <Th>Category</Th>
                        <Th>Items</Th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                    {sections.map((s) => (
                        <tr key={s.id} id={s.id} className="align-top"> {/* 👈 anchor target */}
                            <Td className="font-semibold">
                                <div className="flex flex-col gap-1">
                                    <span>{s.title}</span>
                                    {s.description ? (
                                        <span className="text-xs text-[var(--muted-foreground)]">
                                            {s.description}
                                        </span>
                                    ) : null}
                                </div>
                            </Td>
                            <Td>
                                <BulletList
                                    items={s.items.map((it) => ({
                                        label: it.label,
                                        detail: it.detail,
                                    }))}
                                />
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

