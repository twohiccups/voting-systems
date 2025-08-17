


'use client';

import * as React from 'react';
import { BallotCard, BallotOption } from '../../ballots/components/Ballot';
import HeroHeader from '@/app/components/HeroHeader';

function FptpBallot() {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);

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


export default function Page() {
    return (<>

        <HeroHeader title={'First Past The Post'} subtitle='' bgImage={''}>

        </HeroHeader>
        <FptpBallot />
    </>)
}