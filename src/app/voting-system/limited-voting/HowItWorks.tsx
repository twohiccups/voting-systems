"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Several candidates compete for <strong>multiple seats</strong> in a district.</> },
        { text: <>Each voter may cast <strong>fewer votes than the number of seats</strong> available (e.g. 1 vote in a 3-seat race).</> },
        { text: <>Ballots are counted: each chosen candidate receives <strong>one vote</strong> from that voter.</> },
        { text: <>The <strong>top N candidates</strong> (where N = number of seats) win the election.</> },
        { text: <>If tied for the last seat, a tiebreak procedure applies.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
