// File: src/app/components/VotingSystemCard.tsx
"use client";
import * as React from "react";
import { Chip } from "./primitives";
import { Card } from "./Card";
import { VotingSystem } from "../types";

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
        <Card
            href={`/voting-system/${slug}`}
            title={name}
            description={shortDescription}
            footer={
                <span className="pointer-events-none">
                    {/* Decorative chip inside the link (not focusable/clickable) */}
                    <Chip ariaLabel={taxonomyId}>{taxonomyId}</Chip>
                </span>
            }
            className={className}
        />
    );
}
