'use client';

import * as React from "react";
import { TaxonomySystem } from "../types";

export default function TaxonomyCard({ system }: { system: TaxonomySystem }) {
    return (
        <article className="h-full border rounded-xl shadow-sm">
            <header className="p-3 sm:p-4 md:p-5 ">
                <h3 className="font-semibold text-base sm:text-lg">{system.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{system.shortDescription}</p>
            </header>
        </article>
    );
}
