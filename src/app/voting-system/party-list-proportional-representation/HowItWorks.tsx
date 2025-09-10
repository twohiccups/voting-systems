"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters cast a ballot for a <strong>party list</strong> rather than individual candidates.</> },
        { text: <>The total national or district vote determines each party’s <strong>proportion of seats</strong>.</> },
        { text: <>Seats are allocated using a formula (e.g. d’Hondt or Sainte-Laguë).</> },
        { text: <>Within each party, seats are filled by candidates from its list, usually in <strong>pre-set order</strong>.</> },
        { text: <>Some systems allow voters to influence the ranking (open lists), others do not (closed lists).</> },
        { text: <>Results are certified officially.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
