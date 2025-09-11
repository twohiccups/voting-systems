import React from 'react';
import Link from 'next/link';
import { Container } from '@/app/components/Container';
import { Card, BulletList } from '@/app/components/primitives';
import Section from '@/app/components/Section';
import SectionHeading from '@/app/components/SectionHeading';
import { FeatureSection } from '../page';


const isBallotSection = (s: FeatureSection) => s.title.toLowerCase() === 'ballot type' || s.id === 'ballot-type';


export function SectionView({ sections }: { sections: FeatureSection[] }) {
    return (
        <Container>
            {sections.map((s) => (
                <Section key={s.id}>
                    <SectionHeading title={s.title} />
                    <Card>
                        <header className="mb-3 sm:mb-4 flex items-center justify-between gap-3">
                            {s.description ? (
                                <p className="mt-1 text-md italic text-[var(--muted-foreground)]">{s.description}</p>
                            ) : (
                                <span className="sr-only">No description</span>
                            )}
                        </header>


                        <BulletList items={s.items.map((it) => ({ label: it.label, detail: it.detail }))} />


                        {isBallotSection(s) && (
                            <Link href="/ballots" className="text-sm font-medium text-[var(--link)] hover:underline whitespace-nowrap">
                                <div className="mt-3">Learn more →</div>
                            </Link>
                        )}
                    </Card>
                </Section>
            ))}
        </Container>
    );
}