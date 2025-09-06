"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters give each candidate a <strong>score</strong> on a fixed scale (e.g., 1–5 or 0–10).</> },
        { text: <>A voter may score multiple candidates the same or differently; unscored candidates count as the minimum.</> },
        { text: <>Sum all scores each candidate received to get a <strong>total score</strong>.</> },
        { text: <>The candidate with the <strong>highest total score</strong> wins.</> },
        { text: <>If tied, use a predefined tiebreak (e.g., higher median score, head-to-head, or runoff).</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
