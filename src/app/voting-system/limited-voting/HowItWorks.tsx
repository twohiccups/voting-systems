"use client";

import React from "react";
import FlowSteps, { FlowStep } from "../components/HowItWorksTemplate";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Several candidates run for the seat.</> },
        { text: <>Each voter selects <strong>one candidate</strong> on the ballot.</> },
        { text: <>Count the ballots: each marked candidate counts as <strong>one vote</strong>.</> },
        { text: <>The candidate with the <strong>most votes</strong> wins.</> },
        { text: <>If tied, a tiebreak procedure applies.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <FlowSteps steps={steps} />;
}
