// File: src/app/components/VotingSystemCard.tsx
"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Chip } from "./primitives";
import { SystemCard } from "./SystemCard";
import { VotingSystem } from "@/lib/taxonomy/types";

export type VotingSystemCardProps = {
    system: VotingSystem;
    className?: string;
};

export default function VotingSystemCard({
    system,
    className = "",
}: VotingSystemCardProps) {
    const { name, shortDescription, taxonomyId, slug } = system;

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.02, boxShadow: "0 10px 24px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.6 }}
            className={`cursor-pointer will-change-transform ${className}`}
        >
            <SystemCard
                href={`/voting-system/${slug}`}
                title={name}
                description={shortDescription}
                footer={
                    <span className="pointer-events-none">
                        {/* Decorative chip inside the link (not focusable/clickable) */}
                        <Chip ariaLabel={taxonomyId}>{taxonomyId}</Chip>
                    </span>
                }
                // Keep SystemCard’s own smooth color/focus transitions
                className="theme-transition hover:bg-[var(--muted)]"
            />
        </motion.div>
    );
}
