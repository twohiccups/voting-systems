// components/HeroHeader.tsx
"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

type HeroHeaderProps = {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    bgImage: string | StaticImageData;
    fullHeight?: boolean;
};

export default function HeroHeader({
    title,
    subtitle,
    ctaText,
    ctaLink,
    bgImage,
    fullHeight = false,
}: HeroHeaderProps) {
    // demo image override (remove if not needed)
    bgImage =
        "https://images.unsplash.com/photo-1643228995868-bf698f67d053?w=1400&auto=format&fit=crop&q=100&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8fA%3D%3D";

    // --- Typewriter using React state ---
    const [display, setDisplay] = useState<string>("");
    const [typingDone, setTypingDone] = useState<boolean>(false);
    const count = useMotionValue(0);

    useEffect(() => {
        if (!subtitle) {
            setDisplay("");
            setTypingDone(true);
            return;
        }

        setDisplay("");
        setTypingDone(false);
        count.set(0);

        const base = 0.8; // seconds
        const perChar = 0.035;
        const total = Math.max(base, subtitle.length * perChar);

        const controls = animate(count, subtitle.length, {
            duration: total,
            ease: "linear",
            onUpdate: (latest) => {
                const l = Math.max(0, Math.min(subtitle.length, Math.round(latest)));
                setDisplay(subtitle.slice(0, l));
            },
            onComplete: () => {
                setDisplay(subtitle);
                setTypingDone(true);
            },
        });

        return () => controls.stop();
    }, [subtitle, count]);

    return (
        <header
            className={`relative w-full ${fullHeight ? "h-screen" : "h-[70vh]"
                } flex items-center justify-center text-center text-white`}
            role="banner"
            aria-label="Hero header"
        >
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={bgImage}
                    alt="Hero background"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 max-w-3xl">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">{title}</h1>

                {/* Animated subtitle (block-level so button is below) */}
                {subtitle ? (
                    <p
                        className="text-lg sm:text-2xl mb-8 block text-center"
                        aria-live="polite"
                    >
                        <span style={{ whiteSpace: "pre-wrap" }}>{display}</span>
                        {!typingDone && (
                            <motion.span
                                className="ml-1 inline-block w-[0.6ch] h-[1em] align-baseline bg-white/80 rounded-sm"
                                aria-hidden="true"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{
                                    duration: 0.9,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                        )}
                    </p>
                ) : null}

                {ctaText && ctaLink ? (
                    <Link
                        href={ctaLink}
                        className={[
                            "inline-block px-6 py-3 rounded-full font-medium transition theme-transition active:scale-[0.98]",
                            "bg-[var(--accent)] text-[var(--accent-foreground)] border border-[var(--accent)] hover:brightness-110",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2",
                        ].join(" ")}
                    >
                        {ctaText}
                    </Link>
                ) : null}
            </div>
        </header>
    );
}
