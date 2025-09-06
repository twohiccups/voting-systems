"use client";

import React from "react";
import FlowSteps from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";
import HowItWorksTemplate from "../components/HowItWorksTemplate";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Several candidates run for <strong>multiple seats</strong> in a district.</> },
        { text: <>Each voter can select up to <strong>as many candidates</strong> as there are seats.</> },
        { text: <>Ballots are counted: each chosen candidate receives <strong>one vote</strong> from that voter.</> },
        { text: <>All candidates’ votes are tallied across the district.</> },
        { text: <>The <strong>top N candidates</strong> (where N = number of seats) are declared winners.</> },
        { text: <>If tied for the last seat, a tiebreak procedure applies.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
