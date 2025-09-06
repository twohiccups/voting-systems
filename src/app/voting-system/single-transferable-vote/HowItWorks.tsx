"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>A district elects <strong>multiple seats</strong>; voters <strong>rank candidates</strong>.</> },
        { text: <>Calculate the <strong>quota</strong> (e.g., Droop quota) needed to win a seat.</> },
        { text: <>Any candidate at or above the quota is <strong>elected</strong>.</> },
        { text: <>If a candidate exceeds the quota, their <strong>surplus votes are transferred</strong> to next preferences at a fractional value.</> },
        { text: <>If seats remain unfilled, the <strong>lowest candidate is eliminated</strong> and their ballots are transferred to next preferences.</> },
        { text: <>Repeat surplus transfers and eliminations until all seats are filled; certify results.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
