"use client";

import { BulletList, Chip, StepCard } from "@/app/components/primitives";
import * as React from "react";

/*****************************
 * Pros/Cons Expanded — flex column, full-width cards
 * - Cards stack in a single column and expand to container width
 * - Removed CSS multi-columns & span-on-open logic
 * - StepCard forced to full width with max-w-none
 *****************************/
function CheckIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414l2.293 2.293 6.543-6.543a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function XIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function InfoIcon(props: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm.75 5.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM11 10h2v7h-2v-7z" />
    </svg>
  );
}

// Data
const STRENGTHS = [
  {
    title: "Very simple ballots and counting; easy to explain.",
    summary:
      "Voters mark one name and you add up the marks—fewer steps, fewer mistakes.",
    details:
      "Poll workers need minimal training, audit trails are straightforward, and error rates tend to stay low because there are fewer places to go wrong.",
    impacts: ["Voter Experience", "Administration"],
  },
  {
    title: "Fast results and low administrative cost.",
    summary: "Single-mark tallies produce quick preliminaries and uncomplicated recounts.",
    details:
      "Even in large jurisdictions, preliminary results can be reported quickly and recounts are comparatively simple, keeping election-night logistics and budgets lean.",
    impacts: ["Speed", "Cost"],
  },
  {
    title: "Clear single representative per district (with single-member districts).",
    summary: "Accountability is direct—constituents know exactly who represents them.",
    details:
      "Each area elects a single winner who is easy to identify and contact. If voters are unhappy, there’s a clear person to hold to account in the next election.",
    impacts: ["Representation", "Accountability"],
  },
] as const;

const WEAKNESSES = [
  {
    title: "Winners may have <50% support in multi-candidate races.",
    summary: "Plurality winners can take office without majority backing in crowded fields.",
    details:
      "When three or more credible candidates split the vote, the winner may be opposed by most voters, which can feel counter-majoritarian—especially when margins are tight.",
    impacts: ["Legitimacy", "Mandate"],
  },
  {
    title: "Encourages strategic voting; minor-party ‘spoiler’ effects.",
    summary: "Voters may pick a viable second choice to avoid ‘wasting’ their vote.",
    details:
      "Smaller parties can split ideologically similar blocs and unintentionally help an opponent win. This dynamic can also discourage sincere voting and depress minor-party growth.",
    impacts: ["Voter Behavior", "Party System"],
  },
  {
    title: "Often disproportional seat outcomes vs. vote share.",
    summary:
      "Seat totals can amplify regional strongholds and under-represent dispersed voters.",
    details:
      "A party can secure a majority of seats without a majority of votes if its support is efficiently distributed across districts, producing mismatches between votes and seats.",
    impacts: ["Proportionality", "Fairness"],
  },
] as const;

type Item = (typeof STRENGTHS)[number] & { tone: "pro" | "con" };

function ProConCard({ item }: { item: Item }) {
  const toneIcon =
    item.tone === "pro" ? (
      <CheckIcon className="h-4 w-4 text-green-600" />
    ) : (
      <XIcon className="h-4 w-4 text-red-600" />
    );

  return (
    // Full-width card; no max width cap
    <StepCard className="w-full max-w-none">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--muted)] text-foreground/70">
          {toneIcon}
        </span>
        <div className="flex-1">
          <h4 className="text-base font-semibold leading-tight">{item.title}</h4>
          <p className="text-sm text-[var(--muted-foreground)] mt-1">{item.summary}</p>
        </div>
      </div>

      {item.details ? (
        <details className="group mt-4">
          <summary className="list-none cursor-pointer flex items-center gap-2 text-sm font-medium text-[var(--card-foreground)]">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-open:rotate-180"
              fill="currentColor"
              aria-hidden
            >
              <path d="M6.293 8.293a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
            </svg>
            Details
          </summary>
          <div className="mt-3 pt-3 border-t border-[var(--border)]">
            <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
              {item.details}
            </p>
          </div>
        </details>
      ) : null}
    </StepCard>
  );
}

// Section with flex column: cards take full width of the container
function Section({
  title,
  items,
  tone,
}: {
  title: string;
  items: readonly {
    title: string;
    summary: string;
    details?: string;
    impacts?: string[];
  }[];
  tone: "pro" | "con";
}) {
  const toneIcon =
    tone === "pro" ? (
      <CheckIcon className="h-4 w-4 text-green-600" />
    ) : (
      <XIcon className="h-4 w-4 text-red-600" />
    );

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        {toneIcon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Flex column stack; full-width cards */}
      <div className="flex flex-col gap-4">
        {items.map((it) => (
          <ProConCard key={it.title} item={{ ...it, tone }} />
        ))}
      </div>
    </section>
  );
}

function ContextAndTips() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <InfoIcon className="h-4 w-4" />
        <h3 className="text-lg font-semibold">Context & Tips</h3>
      </div>

      {/* Simple responsive grid for auxiliary content; cards themselves still full width within their grid cell */}
      <div className="grid gap-4 md:grid-cols-2 items-start">
        <StepCard title="When it’s a good fit">
          <p className="text-sm text-[var(--muted-foreground)]">
            Works best where two frontrunners dominate, party systems are stable, and speed/clarity of results is a high priority.
          </p>
        </StepCard>

        <StepCard title="When it struggles">
          <p className="text-sm text-[var(--muted-foreground)]">
            Less ideal with many credible candidates, vibrant minor parties/independents, or when majority legitimacy is the key requirement.
          </p>
        </StepCard>

        <StepCard title="Common misconceptions">
          <BulletList
            items={[
              {
                label: "“If my top choice can’t win, my vote doesn’t matter.”",
                detail:
                  "Votes still shape margins, party strategy, and future candidacies—even when your favorite doesn’t prevail.",
              },
            ]}
          />
        </StepCard>

        <StepCard title="Mitigations">
          <BulletList
            items={[
              { label: "Non-partisan primaries or runoffs", detail: "Can ensure majority winners." },
              { label: "Voter education", detail: "Reduces unintentional spoiler effects." },
            ]}
          />
        </StepCard>
      </div>
    </section>
  );
}

export default function ProsConsExpanded() {
  return (
    <div className="not-prose space-y-8">
      <Section title="Strengths" items={STRENGTHS} tone="pro" />
      <Section title="Weaknesses" items={WEAKNESSES} tone="con" />
      <ContextAndTips />
    </div>
  );
}
