"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>A district elects <strong>multiple seats</strong>.</> },
        { text: <>Each voter casts <strong>one vote for a single candidate</strong> (no transfers).</> },
        { text: <>Count all votes: each marked candidate receives <strong>one vote</strong>.</> },
        { text: <>The <strong>top N candidates</strong> by votes (where N = number of seats) win.</> },
        { text: <>If tied for the last seat, a tiebreak procedure applies.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
