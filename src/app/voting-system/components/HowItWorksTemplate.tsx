"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, type SpringOptions } from "framer-motion";
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
    // Defaults mirror the original HowItWorks component
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
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [cardHeight, setCardHeight] = useState<number>(140);

    const prefersReducedMotion = useReducedMotion();

    useLayoutEffect(() => {
        const el = containerRef.current;
        const listEl = listRef.current;
        if (!el || !listEl) return;

        // Map indices into "bouncing" slot positions across available columns
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

            // Horizontal spread region: +/- usableW/2 from center
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
            setContainerWidth(containerRect.width);
            setCardHeight(tallest);

            const totalHeight = tallest + (n - 1) * stepY + EXTRA_GAP;
            setContainerHeight(totalHeight);
        };

        const ro = new ResizeObserver(compute);
        ro.observe(el);
        ro.observe(listEl);
        liRefs.current.forEach((n) => n && ro.observe(n));
        compute();

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

    const connectors = useMemo(() => {
        if (!containerWidth || !cardHeight || offsets.length < 2) return [] as string[];
        const cx = (i: number) => containerWidth / 2 + (offsets[i]?.x ?? 0);
        const cy = (i: number) => (offsets[i]?.y ?? 0) + cardHeight / 2;

        const paths: string[] = [];
        for (let i = 0; i < offsets.length - 1; i++) {
            const x1 = cx(i);
            const y1 = cy(i);
            const x2 = cx(i + 1);
            const y2 = cy(i + 1);
            const mx = (x1 + x2) / 2;
            // Simple symmetrical cubic curve between step centers
            paths.push(`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`);
        }
        return paths;
    }, [containerWidth, cardHeight, offsets]);

    // ==========================
    // Animation tuning knobs
    // ==========================
    const WIGGLE_PX = 14; // left/right amplitude
    const LIFT_PX = 16; // slight lift on the way in
    const STAGGER = 0.06; // seconds between each item’s start
    const X_DURATION = 0.9; // total wiggle time

    // Typed spring options (fix TS vs ValueTransition)
    const Y_SPRING: SpringOptions = { stiffness: 260, damping: 22, mass: 0.8 };

    // Trigger later in viewport
    const VIEWPORT_AMOUNT = 0.75; // 75% visible
    const VIEWPORT_MARGIN = "-10% 0% -10% 0%"; // shrink top/bottom viewport

    return (
        <section className={`not-prose ${className ?? ""}`}>
            <div
                ref={containerRef}
                className="relative rounded-2xl p-4 sm:p-6 overflow-hidden"
                style={{ minHeight: containerHeight }}
            >
                <svg
                    className="pointer-events-none absolute inset-0"
                    width={containerWidth}
                    height={containerHeight}
                    viewBox={`0 0 ${containerWidth} ${containerHeight}`}
                    aria-hidden="true"
                >
                    <defs>
                        <linearGradient id="flow-stroke" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--muted-foreground)" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.15" />
                        </linearGradient>
                        <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                        </filter>
                    </defs>
                    {connectors.map((d, idx) => (
                        <g key={idx}>
                            <path d={d} stroke="url(#flow-stroke)" strokeWidth={4} fill="none" filter="url(#flow-glow)" />
                            <path d={d} stroke="url(#flow-stroke)" strokeWidth={2} fill="none" />
                        </g>
                    ))}
                </svg>

                <ol ref={listRef} className="relative grid grid-cols-1">
                    {steps.map((s, i) => {
                        const targetX = offsets[i]?.x ?? 0;
                        const targetY = offsets[i]?.y ?? 0;
                        const isEvenStep = ((s.num ?? i + 1) % 2) === 0;
                        const dir: 1 | -1 = isEvenStep ? -1 : 1;

                        return (
                            <StepItem
                                key={`${(s.num ?? i + 1).toString()}-${i}`}
                                index={i}
                                liRefs={liRefs}
                                targetX={targetX}
                                targetY={targetY}
                                dir={dir}
                                wigglePx={WIGGLE_PX}
                                liftPx={LIFT_PX}
                                stagger={STAGGER}
                                xDuration={X_DURATION}
                                ySpring={Y_SPRING}
                                viewportAmount={VIEWPORT_AMOUNT}
                                viewportMargin={VIEWPORT_MARGIN}
                                prefersReducedMotion={prefersReducedMotion ? true : false}
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
   StepItem: in-view detection + animation that also renders visible
   on first paint if already in view (page reload fix).
-------------------------------------------------------------------*/
type StepItemProps = {
    index: number;
    liRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
    targetX: number;
    targetY: number;
    dir: 1 | -1;
    wigglePx: number;
    liftPx: number;
    stagger: number;
    xDuration: number;
    ySpring: SpringOptions;
    viewportAmount: number;
    viewportMargin: string;
    prefersReducedMotion: boolean;
    children: React.ReactNode;
};

function StepItem({
    index,
    liRefs,
    targetX,
    targetY,
    dir,
    wigglePx,
    liftPx,
    stagger,
    xDuration,
    ySpring,
    viewportAmount,
    prefersReducedMotion,
    children,
}: StepItemProps) {
    const itemRef = useRef<HTMLLIElement | null>(null);

    // Mirror into the measurement array (TS-safe: return void)
    React.useEffect(() => {
        liRefs.current[index] = itemRef.current;
    }, [index, liRefs]);

    const inView = useInView(itemRef, {
        once: true,
        amount: viewportAmount,
    });

    // If already visible at mount (or reduced motion), don't hide it.
    const initialX = targetX;
    const initialY = prefersReducedMotion ? targetY : targetY - liftPx;
    const initialOpacity = inView || prefersReducedMotion ? 1 : 0;

    const xKeyframes = prefersReducedMotion
        ? [targetX]
        : [
            targetX + dir * wigglePx,
            targetX - dir * wigglePx * 0.7,
            targetX + dir * wigglePx * 0.45,
            targetX - dir * wigglePx * 0.2,
            targetX,
        ];

    const yKeyframes = prefersReducedMotion ? [targetY] : [targetY - liftPx, targetY];

    return (
        <motion.li
            ref={itemRef}
            initial={{ x: initialX, y: initialY, opacity: initialOpacity }}
            animate={
                inView
                    ? { x: xKeyframes, y: yKeyframes, opacity: 1 }
                    : { x: initialX, y: initialY, opacity: initialOpacity }
            }
            transition={{
                delay: index * stagger,
                x: prefersReducedMotion
                    ? undefined
                    : { duration: xDuration, times: [0, 0.33, 0.6, 0.8, 1], ease: "easeOut" },
                y: prefersReducedMotion ? undefined : { ...ySpring },
                opacity: { duration: 0.3, ease: "easeOut" },
            }}
            whileHover={{ scale: 1.1 }}
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
            {children}
        </motion.li>
    );
}
