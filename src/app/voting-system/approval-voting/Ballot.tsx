'use client'

import ApprovalBallot from "@/app/ballots/components/ApprovalBallot";

// --- Ballot Example (interactive) ---
export function Ballot() {
    const candidates = [
        { id: 'a', label: 'Alice Johnson', sublabel: 'Green Party' },
        { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
        { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
        { id: 'd', label: 'Derek Sanchez', sublabel: 'Liberal Party' },
        { id: 'e', label: 'Erika Novak', sublabel: 'Independent' },
    ];

    return (
        <ApprovalBallot candidates={candidates} />
    );
}

