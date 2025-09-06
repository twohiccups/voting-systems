"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters cast ballots for <strong>parties</strong> or coalitions.</> },
        { text: <>Seats are allocated <strong>proportionally</strong> at first, based on vote share.</> },
        { text: <>The party (or coalition) with the <strong>largest vote share</strong> receives an extra “majority bonus.”</> },
        { text: <>This bonus grants them <strong>additional seats</strong> to ensure a stable governing majority.</> },
        { text: <>Remaining seats are distributed proportionally among other parties.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
