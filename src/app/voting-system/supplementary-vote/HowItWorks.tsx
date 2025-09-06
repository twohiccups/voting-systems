"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters may mark a <strong>first</strong> and an <strong>optional second</strong> preference.</> },
        { text: <>Count first preferences. If a candidate has a <strong>majority</strong>, they win.</> },
        { text: <>If not, only the <strong>top two</strong> candidates remain; others are eliminated.</> },
        { text: <>Transfer ballots of eliminated candidates to the <strong>highest-ranked remaining</strong> (usually the second preference).</> },
        { text: <>Whichever of the top two now has the <strong>most votes</strong> wins.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
