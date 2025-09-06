"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters <strong>rank candidates</strong> from most to least preferred.</> },
        { text: <>Points are assigned: the top rank gets the most points, the next rank fewer, and so on.</> },
        { text: <>If a voter does <strong>not rank a candidate</strong>, that candidate receives the <strong>lowest possible points</strong> from that ballot.</> },
        { text: <>Each candidate&apos;s points are summed across all ballots.</> },
        { text: <>The candidate with the <strong>highest total score</strong> is declared the winner.</> },
        { text: <>For multiple seats, the top N candidates win.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
