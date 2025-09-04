"use client";

import { Card, CheckIcon, XIcon } from "@/app/components/primitives";
import Section from "@/app/components/Section";
import SectionHeading from "@/app/components/SectionHeading";
import { ProsCons } from "@/app/types";
import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*****************************
 * Pros/Cons Expanded — with animated accordion
 *****************************/

// Card
function ProConCard({ item, tone }: { item: ProsCons; tone: "pro" | "con" }) {
    const toneIcon =
        tone === "pro" ? (
            <CheckIcon className="h-4 w-4 text-green-600" />
        ) : (
            <XIcon className="h-4 w-4 text-red-600" />
        );

    const [open, setOpen] = React.useState(false);
    const panelId = React.useId();
    const prefersReducedMotion = useReducedMotion();

    return (
        <Card title={""}>
            <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-foreground/70">
                    {toneIcon}
                </span>
                <div className="flex-1">
                    <h4 className="text-base font-semibold leading-tight">{item.title}</h4>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">
                        {item.summary}
                    </p>
                </div>
            </div>

            {item.details ? (
                <div className="mt-4">
                    <button
                        type="button"
                        className="group flex w-full items-center gap-2 text-left text-sm font-medium text-[var(--card-foreground)]"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpen((v) => !v)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                            fill="currentColor"
                            aria-hidden
                        >
                            <path d="M6.293 8.293a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                        </svg>
                        Details
                    </button>

                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                id={panelId}
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    transition: prefersReducedMotion
                                        ? { duration: 0 }
                                        : {
                                            height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                                            opacity: { duration: 0.18, delay: 0.06 },
                                        },
                                }}
                                exit={
                                    prefersReducedMotion
                                        ? { height: 0, opacity: 0, transition: { duration: 0 } }
                                        : {
                                            height: 0,
                                            opacity: 0,
                                            transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
                                        }
                                }
                                style={{ overflow: "hidden" }}
                            >
                                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                                    <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                                        {item.details}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : null}
        </Card>
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
    items: ProsCons[];
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
