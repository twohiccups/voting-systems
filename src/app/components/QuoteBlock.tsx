import React from "react";

export type QuoteBlockProps = {
    children: React.ReactNode;
    className?: string;
};

export function QuoteBlock({ children, className = "" }: QuoteBlockProps) {
    return (
        <blockquote
            className={`border-l-4 pl-4 sm:pl-6 italic text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 border-ring text-justify tracking-wide ${className}`}        >
            {children}
        </blockquote>
    );
}
