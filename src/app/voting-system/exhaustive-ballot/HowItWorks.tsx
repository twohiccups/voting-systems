"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>All candidates are listed on the ballot.</> },
        { text: <>Each voter selects <strong>one candidate</strong> in the first round.</> },
        { text: <>If no candidate wins a majority, the <strong>lowest-ranked candidate is eliminated</strong>.</> },
        { text: <>Voters cast a fresh ballot in the next round with remaining candidates.</> },
        { text: <>Rounds continue until one candidate achieves a <strong>majority</strong>.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
