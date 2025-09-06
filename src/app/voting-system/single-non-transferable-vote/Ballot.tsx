'use client'

import { BallotCard, BallotOption } from "@/app/ballots/components/Ballot";
import { useState } from "react";

// --- Ballot Example (interactive) ---
export function Ballot() {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const candidates = [
        { id: 'a', label: 'Alice Johnson', sublabel: 'Green Party' },
        { id: 'b', label: 'Brian Smith', sublabel: 'Conservative Party' },
        { id: 'c', label: 'Carla Nguyen', sublabel: 'Liberal Party' },
    ];

    return (
        <BallotCard
            title="Mayor Election"
            instructions="Vote for ONE candidate only by marking the box next to their name."
        >
            <div role="group" aria-label="FPTP choices" className="grid gap-2">
                {candidates.map((c) => (
                    <BallotOption
                        key={c.id}
                        id={c.id}
                        label={c.label}
                        sublabel={c.sublabel}
                        variant="checkbox"
                        checked={selectedId === c.id}
                        onCheckedChange={(isChecked) =>
                            setSelectedId(isChecked ? c.id : null)
                        }
                    />
                ))}
            </div>
        </BallotCard>
    );
}

