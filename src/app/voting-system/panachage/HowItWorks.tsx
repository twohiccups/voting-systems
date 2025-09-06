"use client";

import React from "react";
import HowItWorksTemplate from "../components/HowItWorksTemplate";
import { FlowStep } from "@/app/types";

export default function HowItWorks() {
    const steps: FlowStep[] = [
        { text: <>Voters receive a <strong>party list ballot</strong> with multiple candidates.</> },
        { text: <>They may either approve the full list or <strong>mix and match candidates</strong> from different lists (panachage).</> },
        { text: <>Voters can also <strong>strike out names</strong> they dislike, which removes those candidates’ votes, or give extra support to favorites.</> },
        { text: <>Each candidate accumulates votes from all lists where they appear, minus any struck-out votes.</> },
        { text: <>The <strong>party totals</strong> determine how many seats each party wins.</> },
        { text: <>Within each party, the <strong>top-ranking candidates</strong> by votes fill the seats.</> },
    ];

    return <HowItWorksTemplate steps={steps} />;
}
