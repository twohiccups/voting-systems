
// --- File: app/ballots/components/Ballot.tsx (refactor)
"use client";

import PanachageBallot from "@/app/ballots/components/PanachageBallot";
import { SimpleTabs } from "@/app/components/Tabs";
import { panachageParties } from "@/lib/candidates/data";

export default function Ballot() {
    return (
        <div className="space-y-4">
            <SimpleTabs defaultValue="one">
                <SimpleTabs.List>
                    <SimpleTabs.Trigger value="one">One per candidate</SimpleTabs.Trigger>
                    <SimpleTabs.Trigger value="cumulative">Cumulative</SimpleTabs.Trigger>
                </SimpleTabs.List>

                <SimpleTabs.Content value="one">
                    <PanachageBallot parties={panachageParties} />
                </SimpleTabs.Content>

                <SimpleTabs.Content value="cumulative">
                    <PanachageBallot parties={panachageParties} cumulateMax={2} />
                </SimpleTabs.Content>
            </SimpleTabs>
        </div>
    );
}