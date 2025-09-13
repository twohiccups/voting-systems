import { BulletList, Td, Th } from '@/app/components/primitives';
import { FeatureSection } from '@/app/types';
import React from 'react';

export function TableView({ sections }: { sections: FeatureSection[] }) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-white/80">
            <table className="min-w-full divide-y divide-[var(--border)]">
                <thead>
                    <tr>
                        <Th>Category</Th>
                        <Th>Items</Th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                    {sections.map((s) => (
                        // anchor target
                        <tr key={s.id} id={s.id} className="align-top">
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
