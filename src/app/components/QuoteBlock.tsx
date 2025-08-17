export type QuoteBlockProps = {
    children: React.ReactNode;
    className?: string;
};

export function QuoteBlock({ children, className }: QuoteBlockProps) {
    return (
        <blockquote
            className={[
                "border-l-4 pl-3 sm:pl-4 md:pl-6 italic text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed",
                "border-[var(--ring)] text-[color:var(--foreground)]/90",
                className,
            ].filter(Boolean).join(" ")}
        >
            {children}
        </blockquote>
    );
}