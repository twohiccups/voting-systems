"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Each voter has <strong>two votes</strong>: one for a local candidate, and one for a party list.</> },
        { text: <>Local candidates are elected by <strong>first-past-the-post</strong> (single-member districts).</> },
        { text: <>Party list votes are tallied separately to allocate <strong>proportional seats</strong>.</> },
        { text: <>Unlike MMP, the two parts are <strong>not adjusted</strong> against each other.</> },
        { text: <>Final results combine both sets of seats: <strong>district winners + party list seats</strong>.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
