'use client'

import CloseListBallot from "@/app/ballots/components/ClosedListBallot";
import OpenListBallot from "@/app/ballots/components/OpenListBallot";
import { SimpleTabs } from "@/app/components/Tabs";
import { panachageParties } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {

    return (
        <>
            <SimpleTabs defaultValue="open">
                <SimpleTabs.List >
                    <SimpleTabs.Trigger value="open">Open List</SimpleTabs.Trigger>
                    <SimpleTabs.Trigger value="closed">Closed List</SimpleTabs.Trigger>

                </SimpleTabs.List>
                <SimpleTabs.Content value="open">
                    <OpenListBallot parties={panachageParties} />
                </SimpleTabs.Content>
                <SimpleTabs.Content value="closed">
                    <CloseListBallot parties={panachageParties} />
                </SimpleTabs.Content>
            </SimpleTabs>
        </>
    );
}

