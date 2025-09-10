'use client'

import PartyListBallot from "@/app/ballots/components/PartyListBallot";
import { defaultPartiesClosed } from "@/lib/candidates/data";

// --- Ballot Example (interactive) ---
export function Ballot() {
    const parties = defaultPartiesClosed;
    const instructions = "Mark one party. Seats are allocated proportionally; the leading party may receive additional bonus seats to ensure a majority."
    return (
        <PartyListBallot parties={parties} instructions={instructions} />
    );
}

