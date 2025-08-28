"use client";

import * as React from "react";

/*****************************
 * Minimal UI Primitives (no external UI libs)
 * - TailwindCSS-based
 * - Self-contained so you can drop this file in and import ProsConsExpanded
 *****************************/

// CARD
export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={
                "rounded-2xl border border-border bg-card text-card-foreground shadow-sm " +
                className
            }
            {...props}
        />
    );
}
export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={"p-5 " + className} {...props} />;
}
export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={"p-5 pt-0 " + className} {...props} />;
}
export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={"text-lg font-semibold leading-tight " + className} {...props} />;
}


// SEPARATOR
export function Separator({ className = "" }: { className?: string }) {
    return <div className={"h-px w-full bg-border/80 " + className} />;
}

// BUTTON (unstyled ghost variant by default)
export function Button({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const base =
        "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium border border-transparent hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50";
    return <button className={base + " " + className} {...props} />;
}

/*****************************
 * Collapsible (no Radix dependency)
 *****************************/
export function Collapsible({ defaultOpen = false, children, className = "" }: { defaultOpen?: boolean; children: React.ReactNode; className?: string }) {
    return <div data-collapsible className={className}>{children}</div>;
}
export function CollapsibleTrigger({ children, onToggle, className = "", asChild = false }: { children: React.ReactNode; onToggle?: (open: boolean) => void; className?: string; asChild?: boolean }) {
    const [open, setOpen] = React.useState(false);
    const trigger = (
        <Button
            className={"group w-full justify-between px-0 hover:bg-transparent " + className}
            onClick={() => {
                setOpen((o) => {
                    const next = !o;
                    onToggle?.(next);
                    return next;
                });
            }}
            aria-expanded={open}
        >
            <span className="text-sm font-medium">Learn more</span>
            <ChevronDown className={"h-4 w-4 transition-transform " + (open ? "rotate-180" : "")} />
        </Button>
    );

    return asChild ? (
        <>{trigger}</>
    ) : (
        <div data-collapsible-trigger>{trigger}</div>
    );
}
export function CollapsibleContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    // Simple uncontrolled content – the Trigger won't actually control this because we're avoiding context.
    // For a real app, you'd wire up context. Here we just always show, but visually tuck behind the trigger UX.
    return <div className={"data-[state=open]:animate-in mt-2 " + className}>{children}</div>;
}

/*****************************
 * Tiny inline SVG icons to avoid extra deps
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
function ChevronDown(props: React.SVGAttributes<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M6.293 8.293a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
        </svg>
    );
}

/*****************************
 * Pros/Cons Expanded (self-contained)
 *****************************/


function ProConItem({
    icon,
    title,
    summary,
    details,
    impacts,
}: {
    icon: React.ReactNode;
    title: string;
    summary: string;
    details?: string;
    impacts?: string[];
}) {
    return (
        <Card className="h-full">
            <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground/70">
                        {icon}
                    </span>
                    <div className="flex-1">
                        <CardTitle className="text-base leading-tight">{title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{summary}</p>
                    </div>
                </div>

            </CardHeader>

            {details ? (
                <CardContent className="pt-0">
                    {/* Simple always-visible content with a chevron-styled trigger */}
                    <details className="group">
                        <summary className="list-none cursor-pointer flex items-center justify-between">
                            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                        </summary>
                        <Separator className="my-3" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{details}</p>
                    </details>
                </CardContent>
            ) : null}
        </Card>
    );
}

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
        summary:
            "Single-mark tallies produce quick preliminaries and uncomplicated recounts.",
        details:
            "Even in large jurisdictions, preliminary results can be reported quickly and recounts are comparatively simple, keeping election-night logistics and budgets lean.",
        impacts: ["Speed", "Cost"],
    },
    {
        title:
            "Clear single representative per district (with single-member districts).",
        summary:
            "Accountability is direct—constituents know exactly who represents them.",
        details:
            "Each area elects a single winner who is easy to identify and contact. If voters are unhappy, there’s a clear person to hold to account in the next election.",
        impacts: ["Representation", "Accountability"],
    },
];

const WEAKNESSES = [
    {
        title: "Winners may have <50% support in multi-candidate races.",
        summary:
            "Plurality winners can take office without majority backing in crowded fields.",
        details:
            "When three or more credible candidates split the vote, the winner may be opposed by most voters, which can feel counter‑majoritarian—especially when margins are tight.",
        impacts: ["Legitimacy", "Mandate"],
    },
    {
        title: "Encourages strategic voting; minor‑party ‘spoiler’ effects.",
        summary:
            "Voters may pick a viable second choice to avoid ‘wasting’ their vote.",
        details:
            "Smaller parties can split ideologically similar blocs and unintentionally help an opponent win. This dynamic can also discourage sincere voting and depress minor‑party growth.",
        impacts: ["Voter Behavior", "Party System"],
    },
    {
        title: "Often disproportional seat outcomes vs. vote share.",
        summary:
            "Seat totals can amplify regional strongholds and under‑represent dispersed voters.",
        details:
            "A party can secure a majority of seats without a majority of votes if its support is efficiently distributed across districts, producing mismatches between votes and seats.",
        impacts: ["Proportionality", "Fairness"],
    },
];

function SectionBlock({
    title,
    items,
    tone,
}: {
    title: string;
    items: typeof STRENGTHS;
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

            <div className="grid gap-4 md:grid-cols-2">
                {items.map((it) => (
                    <ProConItem
                        key={it.title}
                        icon={toneIcon}
                        title={it.title}
                        summary={it.summary}
                        details={it.details}
                        impacts={it.impacts}
                    />
                ))}
            </div>
        </section>
    );
}

function OptionalAddOns() {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                <h3 className="text-lg font-semibold">Context & Tips</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">When it’s a good fit</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Works best where two frontrunners dominate, party systems are stable, and speed/clarity of results is a high priority.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">When it struggles</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Less ideal with many credible candidates, vibrant minor parties/independents, or when majority legitimacy is the key requirement.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Common misconceptions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        “If my top choice can’t win, my vote doesn’t matter.” Votes still shape margins, party strategy, and future candidacies—even when your favorite doesn’t prevail.
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Mitigations</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Non‑partisan primaries or runoffs can ensure majority winners; targeted voter education can reduce unintentional spoiler effects.
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default function ProsConsExpanded() {
    return (
        <div className="not-prose space-y-8">
            <SectionBlock title="Strengths" items={STRENGTHS} tone="pro" />
            <SectionBlock title="Weaknesses" items={WEAKNESSES} tone="con" />
            <OptionalAddOns />
        </div>
    );
}
