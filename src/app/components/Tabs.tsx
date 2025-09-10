// --- File: app/components/primitives/Tabs.tsx
"use client";

import { ReactNode, useCallback, useEffect, useId, useMemo, useRef, useState, createContext, useContext } from "react";
import clsx from "clsx";
import { Chip } from "./primitives";

export type TabValue = string;

export type TabsProps = {
    value?: TabValue;
    defaultValue?: TabValue;
    onValueChange?: (value: TabValue) => void;
    /** If true, arrow keys move focus without activation (manual). Default false = automatic activation. */
    manual?: boolean;
    className?: string;
    children: ReactNode;
};

export function Tabs({ value, defaultValue, onValueChange, manual = false, className, children }: TabsProps) {
    const [internal, setInternal] = useState<TabValue | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const active = (isControlled ? value : internal) ?? "";

    const setActive = useCallback(
        (v: TabValue) => {
            if (!isControlled) setInternal(v);
            onValueChange?.(v);
        },
        [isControlled, onValueChange]
    );

    return (
        <TabsContextProvider value={{ active, setActive, manual }}>
            <div className={clsx("w-full", className)}>{children}</div>
        </TabsContextProvider>
    );
}

// ---- Context
type Ctx = {
    active: TabValue;
    setActive: (v: TabValue) => void;
    manual: boolean;
    register: (v: TabValue, ref: HTMLButtonElement | null) => void;
    getOrdered: () => { value: TabValue; ref: HTMLButtonElement | null }[];
};

const TabsCtx = createContext<Ctx | null>(null);

function TabsContextProvider({
    value,
    children,
}: {
    value: Omit<Ctx, "register" | "getOrdered"> & { manual: boolean };
    children: ReactNode;
}) {
    const itemsRef = useRef<{ value: TabValue; ref: HTMLButtonElement | null }[]>([]);
    const register = useCallback((v: TabValue, ref: HTMLButtonElement | null) => {
        const i = itemsRef.current.findIndex((x) => x.value === v);
        if (i === -1) itemsRef.current.push({ value: v, ref });
        else itemsRef.current[i].ref = ref;
    }, []);
    const getOrdered = useCallback(() => itemsRef.current, []);
    const ctx = useMemo<Ctx>(() => ({ ...value, register, getOrdered }), [value, register, getOrdered]);
    return <TabsCtx.Provider value={ctx}>{children}</TabsCtx.Provider>;
}

function useTabsCtx() {
    const ctx = useContext(TabsCtx);
    if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
    return ctx;
}

// ---- Tabs.List
export function TabsList({ children }: { className?: string; children: ReactNode }) {
    const listId = useId();
    return (
        <div role="tablist" aria-orientation="horizontal" id={listId} className="flex gap-2 justify-center mb-4">
            {children}
        </div>
    );
}

export function TabTrigger({
    value,
    children,
}: {
    value: TabValue;
    children: React.ReactNode;
    className?: string;
}) {
    const { active, setActive, register } = useTabsCtx();
    const ref = useRef<HTMLButtonElement | null>(null);
    const selected = active === value;

    useEffect(() => {
        register(value, ref.current);
    }, [register, value]);

    return (
        <Chip
            isActive={selected}
            onClick={() => setActive(value)}
            ariaLabel={typeof children === "string" ? children : undefined}

            aria-selected={selected}
            aria-controls={`panel-${value}`}
        >
            {children}
        </Chip>
    );
}


// ---- Tabs.Content
export function TabContent({ value, children, className }: { value: TabValue; children: ReactNode; className?: string }) {
    const { active } = useTabsCtx();
    const selected = active === value;
    return (
        <div
            role="tabpanel"
            id={`panel-${value}`}
            aria-labelledby={`tab-${value}`}
            hidden={!selected}
            className={clsx(selected ? "block" : "hidden", className)}
        >
            {selected ? children : null}
        </div>
    );
}

// Convenience composite
export const SimpleTabs = Object.assign(Tabs, { List: TabsList, Trigger: TabTrigger, Content: TabContent });
