"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters <strong>rank all candidates</strong> in order of preference.</> },
        { text: <>Each pair of candidates is compared in a head-to-head contest: on each ballot, whichever of the two is ranked higher earns that voter’s support in the matchup.</> },
        { text: <>A candidate earns <strong>1 point for each head-to-head win</strong>, <strong>0.5 points for each tie</strong>, and <strong>0 points for a loss</strong>.</> },
        { text: <>Points are totaled across all pairwise matchups.</> },
        { text: <>The candidate with the <strong>highest Copeland score</strong> is the winner.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
