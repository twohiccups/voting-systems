'use client';

import React from "react";
import { StepCircle, StepItemData } from "./primitives";
import SectionHeading from "./SectionHeading";

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

    return (

        <div className="theme-transition rounded-2xl border border-border bg-card text-card-foreground shadow-sm p-6 sm:p-8 lg:p-10">
            <SectionHeading title="At their core, voting systems are designed to answer questions like:" />
            <ul className="space-y-4 sm:space-y-5 lg:space-y-6 mt-6">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 sm:gap-4">
                        <StepCircle num={i + 1} />
                        <div>
                            <p className="font-semibold text-base sm:text-lg">
                                {item.question}
                            </p>
                            <p className="text-muted-foreground text-base sm:text-lg">
                                {item.detail}
                            </p>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
