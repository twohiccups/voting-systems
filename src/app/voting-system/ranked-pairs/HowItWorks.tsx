"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters <strong>rank candidates</strong> in order of preference.</> },
        { text: <>Compute all <strong>pairwise head-to-head</strong> results between candidates.</> },
        { text: <>Order those pairwise victories by <strong>strength of victory</strong> (e.g., margin).</> },
        { text: <>“Lock in” the strongest victories one by one, <strong>skipping any that would create a cycle</strong>.</> },
        { text: <>The candidate who is at the top of the final locked graph (no defeats) is the <strong>winner</strong>.</> },
        { text: <>If an unresolved tie remains in ordering or locking, a tiebreak procedure applies.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
