"use client";

import { BulletList, CheckIcon, StepCard, XIcon } from "@/app/components/primitives";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import { ProsCons } from "@/app/types";
import * as React from "react";

/*****************************
 * Pros/Cons Expanded — flex column, full-width cards
 *****************************/


// Card
function ProConCard({ item, tone }: { item: ProsCons, tone: 'pro' | 'con' }) {
    const toneIcon =
        tone === "pro" ? (
            <CheckIcon className="h-4 w-4 text-green-600" />
        ) : (
            <XIcon className="h-4 w-4 text-red-600" />
        );

    return (
        <StepCard className="w-full max-w-none">
            <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-foreground/70">
                    {toneIcon}
                </span>
                <div className="flex-1">
                    <h4 className="text-base font-semibold leading-tight">{item.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">{item.summary}</p>
                </div>
            </div>

            {item.details ? (
                <details className="group mt-4">
                    <summary className="list-none cursor-pointer flex items-center gap-2 text-sm font-medium text-[var(--card-foreground)]">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4 transition-transform group-open:rotate-180"
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M6.293 8.293a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                        </svg>
                        Details
                    </summary>
                    <div className="mt-3 pt-3 border-t border-[var(--border)]">
                        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.details}</p>
                    </div>
                </details>
            ) : null}
        </StepCard>
    );
}

// Renamed to avoid conflict and to use SectionHeading for titles
export function ProsConsListSection({
    id,
    title,
    items,
    tone,
}: {
    id?: string;
    title: string;
    items: ProsCons[],
    tone: "pro" | "con";
}) {
    return (
        <Section>
            <SectionHeading id={id} title={title} />
            <div className="flex flex-col gap-4">
                {items.map((it) => (
                    <ProConCard key={it.title} item={it} tone={tone} />
                ))}
            </div>
        </Section>
    );
}

