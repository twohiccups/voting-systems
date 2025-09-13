"use client";

import * as React from "react";
import {
    coerceFromString,
    getFacetValue,
    type Any,
    type UnifiedFilters,
    type EnabledFeatureKey,
    type CategoryKey,
} from "@/utils/featureFilters";

type FacetKey = EnabledFeatureKey | CategoryKey;

type FacetBaseProps<T extends readonly (string | number)[]> = {
    label: string;
    facetKey: FacetKey;
    filters: UnifiedFilters;
    options: readonly [Any, ...T]; // first is ANY
    onChange: (key: FacetKey, value: UnifiedFilters[FacetKey]) => void;
};


export const FacetSelect = React.memo(function FacetSelect<T extends readonly (string | number)[]>({
    label,
    facetKey,
    filters,
    options,
    onChange,
}: FacetBaseProps<T>) {
    const value = getFacetValue(filters, facetKey);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const raw = e.target.value;
        const next = coerceFromString(options, raw);
        onChange(facetKey, next as UnifiedFilters[FacetKey]);
    };

    return (
        <div className="flex flex-col">
            <span className="text-muted-foreground font-semibold mb-1 ">{label}:</span>
            <select
                className="text-base rounded-md border bg-white px-2 py-2 w-full sm:w-[90%]"
                value={String(value)}
                onChange={handleChange}
            >
                {options.map((opt) => (
                    <option key={String(opt)} value={String(opt)}>
                        {String(opt)}
                    </option>
                ))}
            </select>
        </div >
    );
}) as <T extends readonly (string | number)[]>(props: FacetBaseProps<T>) => React.JSX.Element;

