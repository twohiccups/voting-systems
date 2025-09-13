"use client";

import * as React from "react";
import ApprovalBallot from "./components/ApprovalBallot";
import MultiChoiceBallot from "./components/MultiChoiceBallot";
import RankedBallot from "./components/RankedBallot";
import ScoredBallot from "./components/ScoreBallot";
import SingleChoiceBallot from "./components/SingleChoiceBallot";
import CumulativeBallot from "./components/CumulativeBallot";
import PartyListBallot from "./components/PartyListBallot";
import PanachageBallot from "./components/PanachageBallot";
import OpenListBallot from "./components/OpenListBallot";
import ClosedListBallot from "./components/ClosedListBallot";
import HeroHeader from "../components/HeroHeader";
import { StepCard, StepList } from "../components/primitives";
import { QuoteBlock } from "../components/QuoteBlock";
import SectionHeading from "../components/SectionHeading";
import { FullBleed } from "@/app/components/FullBleed";
import Section from "@/app/components/Section";
import { Container } from "@/app/components/Container";
import { defaultParties, defaultPartiesClosed, fourCandidates } from "@/lib/candidates/data";

const candidates = fourCandidates;
const parties = defaultParties;
const partiesClosed = defaultPartiesClosed;

function TableOfContents({ sections }: { sections: { id: string; title: string }[] }) {
    const [activeId, setActiveId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] }
        );

        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sections]);

    const onJump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
    };

    return (
        <nav
            aria-label="Table of contents"
            className="sticky top-4 z-10 rounded-2xl border bg-[var(--card)] p-4 shadow-sm"
        >
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">
                On this page
            </div>
            <ul className="space-y-1 text-sm">
                {sections.map((s) => (
                    <li key={s.id}>
                        <a
                            href={`#${s.id}`}
                            onClick={onJump(s.id)}
                            className={
                                "block rounded-md px-2 py-1 outline-none ring-0 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus-visible:bg-[var(--accent)] focus-visible:text-[var(--accent-foreground)] " +
                                (activeId === s.id
                                    ? "font-semibold text-[var(--foreground)]"
                                    : "text-[var(--muted-foreground)]")
                            }
                        >
                            {s.title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

// ---- Refactor: single source of truth for sections (id, title, content) ----

type BallotSection = {
    id: string;
    title: string;
    render: () => React.ReactNode;
};

const BALLOT_SECTIONS: BallotSection[] = [
    {
        id: "single-choice",
        title: "Single-Choice Ballot",
        render: () => <SingleChoiceBallot candidates={candidates} />,
    },
    {
        id: "multi-choice",
        title: "Multi-Choice Ballot",
        render: () => <MultiChoiceBallot candidates={candidates} max={2} />,
    },
    {
        id: "ranked",
        title: "Ranked Ballot",
        render: () => <RankedBallot candidates={candidates} />,
    },
    {
        id: "scored",
        title: "Scored Ballot",
        render: () => <ScoredBallot candidates={candidates} />,
    },
    {
        id: "approval",
        title: "Approval Ballot",
        render: () => <ApprovalBallot candidates={candidates} />,
    },
    {
        id: "cumulative",
        title: "Cumulative Ballot (Variant of Multi-Choice)",
        render: () => <CumulativeBallot candidates={candidates} maxVotes={5} />,
    },
    {
        id: "partylist",
        title: "Party-List Ballot (Closed List)",
        render: () => <ClosedListBallot parties={partiesClosed} />,
    },
    {
        id: "open-list",
        title: "Open-List Party Ballot (Party vote + candidate preferences)",
        render: () => <OpenListBallot parties={parties} preferMax={2} />,
    },
    {
        id: "closed-list",
        title: "Closed-List Party Ballot",
        render: () => <ClosedListBallot parties={partiesClosed} />,
    },
    {
        id: "panachage",
        title: "Panachage (Pick across party lists)",
        render: () => <PanachageBallot parties={parties} seats={5} />,
    },
    {
        id: "panachage-cumulation",
        title: "Panachage with Cumulation (e.g., up to 2 per candidate)",
        render: () => <PanachageBallot parties={parties} seats={5} cumulateMax={2} />,
    },
];

export default function BallotTypesShowcasePage() {
    const ballotItems = [
        { question: "List of options", detail: "Candidates, parties, or issues appear on the ballot" },
        {
            question: "Instructions",
            detail: "Tell voters how to correctly mark their choice",
        },
        {
            question: "Space to mark the vote",
            detail: "Check box, circle, ranking, or other method to record the choice",
        },
    ];

    // Derive the TOC items directly from the single source array
    const tocSections = React.useMemo(
        () => BALLOT_SECTIONS.map(({ id, title }) => ({ id, title })),
        []
    );

    return (
        <>
            <HeroHeader
                title={"Ballot Types Showcase"}
                subtitle="Explore common electoral ballot designs"
                bgImage={
                    "https://images.unsplash.com/photo-1597700331582-aab3614b3c0c?q=60&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                imageCredit="Unseen Histories"
                imageCreditLink="https://unsplash.com/@unseenhistories"
            />

            {/* FullBleed → Section → Container */}
            <FullBleed>
                <Section>
                    <main>
                        <Container>
                            <QuoteBlock>
                                A ballot is the tool voters use to express their choices in an election. It&apos;s usually a piece of
                                paper or electronic form listing the candidates, parties or issues, where the voter marks their
                                selection.
                            </QuoteBlock>

                            <SectionHeading title="A ballot usually contains:" />
                            <StepCard index={0}>
                                <StepList items={ballotItems} />
                            </StepCard>

                            <div className="order-2 md:order-1">
                                <TableOfContents sections={tocSections} />
                            </div>

                            {/* Render all sections from the single source of truth */}
                            {BALLOT_SECTIONS.map(({ id, title, render }) => (
                                <Section key={id}>
                                    <SectionHeading id={id} title={title} />
                                    {render()}
                                </Section>
                            ))}

                            <div className="text-center">
                                <a
                                    href="#top"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                >
                                    ↑ Back to top
                                </a>
                            </div>
                        </Container>
                    </main>
                </Section>
            </FullBleed>
        </>
    );
}
