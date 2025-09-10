// GeometricBleed.tsx (abstract edition)
'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';

type Variant = 'grid' | 'triangles' | 'hex' | 'orbits' | 'noise-blobs';

export default function GeometricBleed({
    variant = 'orbits',
    className = '',
    children,
    animate = true,
}: {
    variant?: Variant;
    className?: string;
    children: React.ReactNode;
    /** allow turning off motion; still respects prefers-reduced-motion */
    animate?: boolean;
}) {
    const prefersReduced = useReducedMotion();
    const doAnim = animate && !prefersReduced;

    return (
        <div className={`relative isolate ${className}`}>
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                {variant === 'grid' && <GridBG />}
                {variant === 'triangles' && <TrianglesBG />}
                {variant === 'hex' && <HexBG />}
                {variant === 'orbits' && <OrbitsBG animate={doAnim} />}
                {variant === 'noise-blobs' && <NoiseBlobsBG animate={doAnim} />}
            </div>
            {children}
        </div>
    );
}

/* --- existing backgrounds (unchanged) --- */
function GridBG() {
    return (
        <div className="absolute inset-0">
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage:
                        `linear-gradient(0deg, rgba(0,0,0,0.06) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px',
                    backgroundPosition: 'center',
                }}
            />
            <div
                className="absolute inset-0"

            />
        </div>
    );
}

function TrianglesBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
                <linearGradient id="lp" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.12" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#lp)" />
            <g fill="none" stroke="currentColor" strokeOpacity="0.08">
                <path d="M0,180 L220,40 L440,220 Z" />
                <path d="M200,0 L520,0 L360,200 Z" />
                <path d="M60,260 L300,120 L560,300 Z" />
            </g>
        </svg>
    );
}

function HexBG() {
    return (
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
                <pattern id="hex" width="28" height="24.25" patternUnits="userSpaceOnUse">
                    <path
                        d="M14 0 L28 7.25 L28 21.75 L14 29 L0 21.75 L0 7.25 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.08"
                    />
                </pattern>
                <radialGradient id="fade" cx="35%" cy="0%" r="100%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.0" />
                    <stop offset="100%" stopColor="white" stopOpacity="0.9" />
                </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex)" />
            <rect width="100%" height="100%" fill="url(#fade)" />
        </svg>
    );
}

/* --- NEW: abstract variants --- */

/** ORBITS: concentric arcs + soft glows; feels systematic + airy */
function OrbitsBG({ animate }: { animate: boolean }) {
    return (
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
                <radialGradient id="orb-glow" cx="50%" cy="10%" r="80%">
                    <stop offset="0%" stopColor="#e2a1c3" stopOpacity="0.18" />
                    <stop offset="60%" stopColor="#e2a1c3" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <linearGradient id="arc" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#e2d1c3" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#e2a1c3" stopOpacity="0.12" />
                </linearGradient>
                <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" />
                </filter>
            </defs>

            {/* ambient glow */}
            <rect width="100%" height="100%" fill="url(#orb-glow)" />

            {/* rotating arc families */}
            <g
                stroke="url(#arc)"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.5"
                style={{
                    transformOrigin: '50% 50%',
                    animation: animate ? 'orbits-rotate 40s linear infinite' : undefined,
                }}
            >
                {Array.from({ length: 6 }).map((_, i) => (
                    <circle
                        key={i}
                        cx="50%"
                        cy="50%"
                        r={`${28 + i * 8}%`}
                        fill="none"
                        strokeDasharray="3 9"
                    />
                ))}
            </g>

            {/* off-center soft blobs to break symmetry */}
            <g filter="url(#soften)" opacity="0.55">
                <circle cx="20%" cy="10%" r="22%" fill="#e2d1c3" opacity="0.08" />
                <circle cx="85%" cy="85%" r="26%" fill="#e2e1b3" opacity="0.08" />
            </g>

            <style>{`
        @keyframes orbits-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </svg>
    );
}

/** NOISE-BLOBS: layered gradients masked by subtle procedural noise */
function NoiseBlobsBG({ animate }: { animate: boolean }) {
    return (
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
                {/* soft palette fields */}
                <radialGradient id="blobA" cx="20%" cy="15%" r="60%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blobB" cx="85%" cy="30%" r="55%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="blobC" cx="60%" cy="85%" r="65%">
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
                </radialGradient>

                {/* monochrome fractal noise */}
                <filter id="grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves="2"
                        seed="7"
                        result="noise"
                    />
                    <feColorMatrix
                        in="noise"
                        type="saturate"
                        values="0"
                        result="mono"
                    />
                    <feComponentTransfer>
                        <feFuncA type="table" tableValues="0 0.03" />
                    </feComponentTransfer>
                </filter>

                {/* gentle displacement to add organic edges */}
                <filter id="wiggle" x="-10%" y="-10%" width="120%" height="120%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="3" result="turb" />
                    <feDisplacementMap in="SourceGraphic" in2="turb" scale="6" />
                </filter>

                {/* animate noise subtly */}
                <animate id="noiseShift" href="#turbA" attributeName="baseFrequency" values="0.012;0.018;0.012" dur="18s" repeatCount="indefinite" />
            </defs>

            {/* layered fields */}
            <g filter="url(#wiggle)">
                <rect width="100%" height="100%" fill="url(#blobA)" />
                <rect width="100%" height="100%" fill="url(#blobB)" />
                <rect width="100%" height="100%" fill="url(#blobC)" />
            </g>

            {/* subtle universal grain on top */}
            <rect width="100%" height="100%" filter="url(#grain)" />

            {/* optional micro drift using CSS transform to avoid heavy SVG anim when reduced-motion off */}
            <g
                style={{
                    transformOrigin: '50% 50%',
                    animation: animate ? 'blobs-drift 30s ease-in-out infinite alternate' : undefined,
                }}
                opacity="0.35"
            >
                <rect width="100%" height="100%" fill="transparent" />
            </g>

            <style>{`
        @keyframes blobs-drift {
          0% { transform: translate3d(0,0,0) scale(1); }
          100% { transform: translate3d(-1.5%, -1%, 0) scale(1.02); }
        }
      `}</style>
        </svg>
    );
}
