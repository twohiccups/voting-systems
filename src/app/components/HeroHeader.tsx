// components/HeroHeader.tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

type HeroHeaderProps = {
    title: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string; // can be internal route or hash (e.g., "/about" or "#systems")
    bgImage: string | StaticImageData; // public path or imported image
    fullHeight?: boolean; // optional: make hero full screen height
};

export default function HeroHeader({
    title,
    subtitle,
    ctaText,
    ctaLink,
    bgImage,
    fullHeight = false,
}: HeroHeaderProps) {
    return (
        <header
            className={`bg-gray-900 relative w-full ${fullHeight ? "h-screen" : "h-[60vh]"
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
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 max-w-3xl">
                <h1 className="text-4xl sm:text-6xl font-bold mb-4">{title}</h1>

                {subtitle ? (
                    <p className="text-lg sm:text-2xl mb-8">{subtitle}</p>
                ) : null}

                {ctaText && ctaLink ? (
                    <Link
                        href={ctaLink}
                        className="inline-block px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 font-medium transition"
                        aria-label={ctaText}
                    >
                        {ctaText}
                    </Link>
                ) : null}
            </div>
        </header>
    );
}
