"use client";
import React from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// 👇 Make Link motion-capable
const MotionLink = motion(Link);

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export default function HeroHeader({
    title,
    subtitle,
    ctaText,
    ctaLink,
    bgImage,
    imageCredit,
    imageCreditLink,
    creditPosition = "bottom-right",
}: {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    bgImage?: string;
    /** Visible text like "Photo: Jane Doe via Unsplash" */
    imageCredit?: string;
    /** Optional href for the credit; opens in a new tab if provided */
    imageCreditLink?: string;
    /** Which corner to place the credit in */
    creditPosition?: Corner;
}) {
    return (
        <header
            className="relative isolate overflow-hidden"
            style={{
                backgroundImage: bgImage ? `url(${bgImage})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/30" />

            {/* Content */}
            <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 py-20 text-center text-white">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        className="mx-auto mb-10 max-w-3xl text-lg text-white/90"
                    >
                        {subtitle}
                    </motion.p>
                )}

                {ctaText && ctaLink && <MotionCTA href={ctaLink} label={ctaText} />}
            </div>

            {/* Optional image credit */}
            {imageCredit && (
                <ImageCredit
                    text={imageCredit}
                    href={imageCreditLink}
                    position={creditPosition}
                />
            )}
        </header>
    );
}

/** Small, legible credit pill with corner placement */
function ImageCredit({
    text,
    href,
    position = "bottom-right",
}: {
    text: string;
    href?: string;
    position?: Corner;
}) {
    const posClasses: Record<Corner, string> = {
        "top-left": "top-3 left-3",
        "top-right": "top-3 right-3",
        "bottom-left": "bottom-3 left-3",
        "bottom-right": "bottom-3 right-3",
    };

    const base =
        "pointer-events-auto absolute z-[5] select-none rounded-full bg-black/55 px-3 py-1 text-xs text-white/90 backdrop-blur-sm ring-1 ring-white/15 shadow-sm";

    const content = (
        <span className="inline-flex items-center gap-1.5">
            <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 opacity-80"
            >
                <path
                    fill="currentColor"
                    d="M12 7a2 2 0 110 4 2 2 0 010-4zm0 5c-3.31 0-6 1.57-6 3.5V17h12v-1.5C18 13.57 15.31 12 12 12z"
                />
            </svg>
            <span className="truncate max-w-[60vw] sm:max-w-none">
                {text}
            </span>
        </span>
    );

    return (
        <div className={`${base} ${posClasses[position]}`} role="note" aria-label="Image credit">
            {href ? (
                <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white px-1"
                >
                    {content}
                </Link>
            ) : (
                <span className=" text-white px-1">{content}</span>
            )}
        </div>
    );
}

/** Animated CTA — motion(Link), no nested <a> */
function MotionCTA({ href, label }: { href: string; label: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

    const rotateX = useTransform(springY, [-20, 20], [8, -8]);
    const rotateY = useTransform(springX, [-20, 20], [-8, 8]);

    function onMouseMove(e: React.MouseEvent) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        x.set(relX);
        y.set(relY);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <MotionLink
            href={href}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            whileTap={{ scale: 0.98 }}
            style={{ rotateX, rotateY, transformPerspective: 700 }}
            className="group relative inline-flex select-none items-center gap-2 overflow-hidden rounded-[999px] px-7 py-3 font-medium text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,.75)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_20px_40px_-12px_rgba(99,102,241,.85)] focus:outline-none"
        >
            {/* Outer animated border */}
            <motion.span
                aria-hidden
                className="pointer-events-none absolute -inset-[2px] rounded-[999px] bg-[linear-gradient(90deg,var(--tw-gradient-stops))] from-sky-400 via-violet-400 to-fuchsia-400 opacity-80 blur-[6px]"
                animate={{ backgroundPositionX: ["0%", "100%"], backgroundPositionY: ["0%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 200%" }}
            />

            {/* Morphing background layer */}
            <MorphingBackground />

            {/* Shine sweep */}
            <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.35),transparent)]"
                whileHover={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            {/* Label */}
            <span className="relative z-10 text-base tracking-wide">{label}</span>

            {/* Arrow nudge */}
            <motion.svg
                viewBox="0 0 24 24"
                className="relative z-10 h-5 w-5"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
                <path fill="currentColor" d="M13 5l7 7-7 7M5 12h14" className="opacity-90" />
            </motion.svg>
        </MotionLink>
    );
}

function MorphingBackground() {
    return (
        <motion.span aria-hidden className="absolute inset-0 -z-10" initial={false}>
            <motion.span
                className="absolute inset-0 rounded-[999px] bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500"
                animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% 100%" }}
            />
            <motion.span
                className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"
                initial={{ borderRadius: "999px" }}
                whileHover={{ borderRadius: "24px" }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
            />
            <motion.span
                className="absolute -inset-2 rounded-[999px] bg-fuchsia-500/20 blur-2xl"
                whileHover={{ opacity: 0.6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
        </motion.span>
    );
}
