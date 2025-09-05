import React from "react";

export default function Section({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={[
                "space-y-6 sm:space-y-8 lg:space-y-10",
                className,
            ].join(" ")}
        >
            {children}
        </section>
    );
}
