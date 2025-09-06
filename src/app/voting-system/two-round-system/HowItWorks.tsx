"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Round 1: voters select <strong>one candidate</strong>.</> },
        { text: <>If a candidate wins a <strong>majority</strong> in Round 1, they are elected.</> },
        { text: <>Otherwise, the top two candidates (or a defined set) advance to a <strong>second round</strong>.</> },
        { text: <>Round 2: voters choose again among the remaining candidates.</> },
        { text: <>The candidate with the <strong>most votes in Round 2</strong> wins.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
