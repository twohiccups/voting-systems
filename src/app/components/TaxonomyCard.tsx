// File: src/app/components/TaxonomyCard.tsx
"use client";

import * as React from "react";
import { TaxonomySystem } from "../types";
import { Card } from "./Card";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (
        <Card
            title={system.name}
            description={system.shortDescription}
            className="h-full"
        />
    );
}
