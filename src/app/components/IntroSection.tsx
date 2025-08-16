'use client';

export default function IntroSection() {
    const items = [
        {
            question: "How many winners will there be?",
            detail: "One president, a few council members, or an entire legislature?",
        },
        {
            question: "How do voters express their choice?",
            detail: "Pick one, rank several, or score each candidate?",
        },
        {
            question: "What's needed to win?",
            detail: "Just more votes than others, or an absolute majority?",
        },
        {
            question: "How closely should results reflect the overall vote share?",
            detail: "Proportional representation or winner-takes-all?",
        },
    ];

    return (
        <section className="theme-transition max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12 space-y-6 sm:space-y-8 md:space-y-10 text-[var(--foreground)]">
            {/* Pull-quote intro */}
            <blockquote
                className="border-l-4 pl-3 sm:pl-4 md:pl-6 italic text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed
                   border-[var(--ring)] text-[color:var(--foreground)]/90"
            >
                Voting systems are the rules that determine how votes are cast,
                counted, and turned into outcomes. Whether choosing a single leader
                like a president or filling every seat in a parliament, the voting
                system shapes not only the result — but the nature of political power
                itself.
            </blockquote>

            {/* Card with rest of content */}
            <div
                className="theme-transition rounded-2xl border p-3 sm:p-4 md:p-6 lg:p-8 shadow-sm
                   bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]"
            >
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-5 md:mb-6">
                    At their core, voting systems are designed to answer questions like:
                </h3>

                <ul className="space-y-3 sm:space-y-4">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start">
                            <div
                                className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full
                           flex items-center justify-center font-bold mr-3 sm:mr-4 text-xs sm:text-sm
                           bg-[var(--ring)] text-[var(--background)]"
                                aria-hidden="true"
                            >
                                {i + 1}
                            </div>

                            <div>
                                <p className="font-semibold text-[var(--card-foreground)] text-sm sm:text-base">
                                    {item.question}
                                </p>
                                <p className="text-[var(--muted-foreground)] text-xs sm:text-sm">
                                    {item.detail}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
