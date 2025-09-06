"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Each voter has <strong>two votes</strong>: one for a local district candidate and one for a party list.</> },
        { text: <>District (constituency) candidates are elected by <strong>first-past-the-post</strong>.</> },
        { text: <>Party list votes determine the <strong>overall proportional share</strong> of seats each party should have.</> },
        { text: <>If a party wins fewer district seats than its proportional share, it receives <strong>additional list seats</strong>.</> },
        { text: <>This ensures the final seat distribution reflects the <strong>party vote proportions</strong>.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
