'use client';

import React from "react";
import { StepCircle, StepItemData } from "./primitives";
import SectionHeading from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function IntroSection() {
    const items: StepItemData[] = [
        {
            question: "How many winners will there be?",
            detail: "One president, a few council members, or an entire legislature?",
        },
        {
            question: "How do voters express their choice?",
            detail: "Pick one, rank several, or score each candidate?",
        },
        {
            question: "What's needed to win?",
            detail: "Just more votes than others, or an absolute majority?",
        },
        {
            question: "How closely should results reflect the overall vote share?",
            detail: "Proportional representation or winner-takes-all?",
        },
    ];

    const prefersReduced = useReducedMotion();

    // Always return a Variants object so TS is happy; when reduced,
    // the "hidden" and "show" states are identical (no motion).
    const container: Variants = prefersReduced
        ? { hidden: {}, show: {} }
        : {
            hidden: {},
            show: {
                transition: {
                    staggerChildren: 0.2, // slower
                    delayChildren: 0.15, // starts a bit later
                },
            },
        };

    const item: Variants = prefersReduced
        ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
        : {
            hidden: { opacity: 0, y: 16 },
            show: {
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    stiffness: 240, // lower stiffness = slower
                    damping: 30,
                    mass: 1,
                },
            },
        };

    const circle: Variants = prefersReduced
        ? { hidden: { scale: 1, opacity: 1 }, show: { scale: 1, opacity: 1 } }
        : {
            hidden: { scale: 0.85, opacity: 0 },
            show: {
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 400, damping: 26 },
            },
        };

    return (
        <div className="theme-transition rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 sm:p-8 lg:p-10">
            <SectionHeading title="At their core, voting systems are designed to answer questions like:" />

            <motion.ul
                className="space-y-4 sm:space-y-5 lg:space-y-6 mt-6"
                variants={container}
                initial={prefersReduced ? false : "hidden"}
                whileInView={prefersReduced ? undefined : "show"}
                viewport={{ once: true, amount: 0.7 }} // trigger later (more of the section must be visible)
            >
                {items.map((itemData, i) => (
                    <motion.li
                        key={i}
                        className="flex items-start gap-3 sm:gap-4"
                        variants={item}
                    >
                        <motion.div variants={circle}>
                            <StepCircle num={i + 1} />
                        </motion.div>

                        <div>
                            <p className="font-semibold text-base sm:text-lg">
                                {itemData.question}
                            </p>
                            <p className="text-muted-foreground text-base sm:text-lg">
                                {itemData.detail}
                            </p>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}
