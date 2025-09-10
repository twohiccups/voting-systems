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
            // Keep the subtle lift/scale, drop the shadow (SystemCard already has hover shadow)
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.995 }}
            transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.6 }}
            // Ensure the wrapper respects rounded corners and clips any inner effects
            className={[
                "cursor-pointer will-change-transform h-full",
                "rounded-xl overflow-hidden",            // <-- important
                className,
            ].join(" ")}
        >
            <SystemCard
                href={`/voting-system/${slug}`}
                title={name}
                description={shortDescription}
                footer={
                    <span className="pointer-events-none">
                        <Chip ariaLabel={taxonomyId}>{taxonomyId}</Chip>
                    </span>
                }
                // Avoid adding an extra background layer on hover here if you want
                // the cleanest corners; shadow is enough for hover affordance.
                className="theme-transition h-full flex flex-col justify-between min-h-[164px] w-full"
            />
        </motion.div>
    );
}
