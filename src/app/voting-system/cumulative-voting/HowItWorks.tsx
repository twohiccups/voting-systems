"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Several candidates run for <strong>multiple seats</strong> in a district.</> },
        { text: <>Each voter has as many votes as there are seats, and may <strong>allocate multiple votes to a single candidate</strong>.</> },
        { text: <>Ballots are counted: each candidate receives the total number of votes allocated to them.</> },
        { text: <>The <strong>top N candidates</strong> (where N = number of seats) are declared winners.</> },
        { text: <>If tied for the last seat, a tiebreak procedure applies.</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
