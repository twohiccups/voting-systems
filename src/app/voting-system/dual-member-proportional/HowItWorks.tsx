"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Each district elects <strong>two representatives</strong>.</> },
        { text: <>Voters cast a ballot for a <strong>party and its two local candidates</strong>.</> },
        { text: <>The first seat in each district is awarded to the candidate with the <strong>most votes</strong>.</> },
        { text: <>The <strong>second seats</strong> are distributed to other parties (B, C, etc.) so that overall seat shares roughly match each party’s vote share.</> },
        { text: <>Mathematical formulas redistribute these second seats until proportionality is achieved.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
