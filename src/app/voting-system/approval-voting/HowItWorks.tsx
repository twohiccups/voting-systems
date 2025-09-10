"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters may <strong>approve of as many candidates</strong> as they like.</> },
        { text: <>Each approved candidate receives <strong>one vote</strong> from that voter.</> },
        { text: <>All votes are tallied across the electorate.</> },
        { text: <>The candidate with the <strong>most approvals</strong> wins.</> },
        { text: <>If electing multiple seats, the <strong>top N</strong> candidates are selected.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
