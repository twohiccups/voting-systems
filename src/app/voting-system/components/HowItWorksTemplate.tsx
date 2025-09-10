"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView, useAnimation } from "framer-motion";
import { StepCircle } from "@/app/components/primitives";
import { FlowStep } from "@/app/types";

// ==========================
// Types
// ==========================
export type FlowStepsProps = {
    steps: FlowStep[];
    className?: string;
    layout?: Partial<{
        /** minimum horizontal slots */
        minSlots: number;
        /** vertical pixels between steps (on top of tallest card) */
        extraGap: number;
        /** how tightly slots pack across the container */
        widthToCardRatio: number;
        /** smaller = closer to center */
        spreadFraction: number;
        /** fallback card width/height (used before first measure) */
        fallbackCard: { width: number; height: number };
    }>;
};

// ==========================
// Component
// ==========================
export default function HowItWorksTemplate({ steps, className, layout }: FlowStepsProps) {
    // Layout defaults
    const MIN_SLOTS = layout?.minSlots ?? 3;
    const EXTRA_GAP = layout?.extraGap ?? 28;
    const WIDTH_TO_CARD_RATIO = layout?.widthToCardRatio ?? 0.92;
    const SPREAD_FRACTION = layout?.spreadFraction ?? 0.28;
    const FALLBACK_CARD = layout?.fallbackCard ?? { width: 280, height: 120 };

    type Offset = { x: number; y: number };

    const containerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLOListElement | null>(null);
    const liRefs = useRef<(HTMLLIElement | null)[]>([]);

    const [offsets, setOffsets] = useState<Offset[]>([]);
    const [containerHeight, setContainerHeight] = useState<number>(400);
    const [cardHeight, setCardHeight] = useState<number>(FALLBACK_CARD.height);

    const prefersReducedMotion = useReducedMotion();

    useLayoutEffect(() => {
        const el = containerRef.current;
        const listEl = listRef.current;
        if (!el || !listEl) return;

        const bounce = (i: number, slots: number) => {
            const period = Math.max((slots - 1) * 2, 1);
            const t = i % period;
            return t <= slots - 1 ? t : period - t;
        };

        const compute = () => {
            const n = steps.length;
            const containerRect = el.getBoundingClientRect();

            const cardRects = liRefs.current
                .filter(Boolean)
                .map((node) => (node as HTMLLIElement).getBoundingClientRect());

            const tallest = Math.max(FALLBACK_CARD.height, ...cardRects.map((r) => r.height || 0));
            const sampleW = FALLBACK_CARD.width;

            const usableW = Math.max(0, (containerRect.width - sampleW) * SPREAD_FRACTION);
            const slots = Math.max(
                MIN_SLOTS,
                Math.floor(containerRect.width / (sampleW * WIDTH_TO_CARD_RATIO))
            );

            const stepX = slots > 1 ? usableW / (slots - 1) : 0;
            const stepY = tallest + EXTRA_GAP;

            const nextOffsets: Offset[] = new Array(n).fill(0).map((_, i) => {
                const slot = bounce(i, slots);
                const x = -usableW / 2 + slot * stepX;
                const y = i * stepY;
                return { x, y };
            });

            setOffsets(nextOffsets);
            setCardHeight(tallest);
            setContainerHeight(tallest + (n - 1) * stepY + EXTRA_GAP);
        };

        const ro = new ResizeObserver(compute);
        ro.observe(el);
        ro.observe(listEl);
        liRefs.current.forEach((n) => n && ro.observe(n));
        // ensure first paint content/ fonts have landed
        requestAnimationFrame(() => requestAnimationFrame(compute));

        return () => ro.disconnect();
    }, [
        steps.length,
        MIN_SLOTS,
        EXTRA_GAP,
        WIDTH_TO_CARD_RATIO,
        SPREAD_FRACTION,
        FALLBACK_CARD.height,
        FALLBACK_CARD.width,
    ]);

    const VIEWPORT_AMOUNT = 0.75;

    return (
        <section className={`not-prose ${className ?? ""}`}>
            <div
                ref={containerRef}
                className="relative rounded-2xl p-4 sm:p-6 overflow-hidden"
                style={{ minHeight: containerHeight }}
            >
                <ol ref={listRef} className="relative grid grid-cols-1">
                    {steps.map((s, i) => {
                        const slotX = offsets[i]?.x ?? 0;
                        const y = offsets[i]?.y ?? 0;
                        const isEvenStep = ((s.num ?? i + 1) % 2) === 0;
                        const dir: 1 | -1 = isEvenStep ? -1 : 1;

                        return (
                            <StepItem
                                key={`${(s.num ?? i + 1).toString()}-${i}`}
                                index={i}
                                liRefs={liRefs}
                                slotX={slotX}
                                y={y}
                                dir={dir}
                                viewportAmount={VIEWPORT_AMOUNT}
                                prefersReducedMotion={!!prefersReducedMotion}
                                fixedHeight={cardHeight}
                            >
                                <div className="relative shrink-0">
                                    <StepCircle num={s.num ?? i + 1} />
                                </div>
                                <p className="text-sm sm:text-base leading-relaxed text-[var(--card-foreground)]">
                                    {s.text}
                                </p>
                            </StepItem>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------
   StepItem: one-time "untangle" animation on first in-view.
   - No scroll linkage, so it never reverses.
-------------------------------------------------------------------*/
type StepItemProps = {
    index: number;
    liRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
    slotX: number;
    y: number;
    dir: 1 | -1;
    viewportAmount: number;
    prefersReducedMotion: boolean;
    fixedHeight: number;
    children: React.ReactNode;
};

function StepItem({
    index,
    liRefs,
    slotX,
    y,
    dir,
    viewportAmount,
    prefersReducedMotion,
    fixedHeight,
    children,
}: StepItemProps) {
    const itemRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        liRefs.current[index] = itemRef.current;
    }, [index, liRefs]);

    const inView = useInView(itemRef, { once: true, amount: viewportAmount });

    const SIDE_BOOST = 44;
    const initialX = dir * (Math.abs(slotX) + SIDE_BOOST);

    const controls = useAnimation();
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (prefersReducedMotion) {
            controls.set({ x: 0, opacity: 1 });
            hasAnimated.current = true;
            return;
        }
        if (inView && !hasAnimated.current) {
            hasAnimated.current = true;
            controls.start({
                x: 0,
                opacity: 1,
                transition: { type: "spring", stiffness: 120, damping: 20 },
            });
        }
    }, [inView, prefersReducedMotion, controls]);

    return (
        <motion.li
            ref={itemRef}
            initial={{ x: initialX, y, opacity: 0 }}
            animate={controls}
            // lock height so all cards match; keep overflow hidden to avoid layout jumps
            style={{ y, height: fixedHeight, maxHeight: fixedHeight, overflow: "hidden" }}
            whileHover={{ scale: 1.06 }}
            className="
        absolute left-1/2 top-0 -translate-x-1/2
        w-full max-w-sm sm:w-[20rem]
        will-change-transform
        rounded-xl bg-[var(--background)]/60 border border-[var(--border)]
        shadow-sm backdrop-blur
        p-3 sm:p-4
        flex gap-3 items-start
      "
        >
            {/* make inner content fill so visual height is consistent */}
            <div className="flex items-start gap-3 w-full h-full">
                {children}
            </div>
        </motion.li>
    );
}
