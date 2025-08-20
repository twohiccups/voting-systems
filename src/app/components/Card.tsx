'use client';

import React from 'react';

interface CardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A generic Card component that provides consistent styling for items like voting systems cards.
 * It renders as an anchor tag if an `href` is supplied, otherwise as a div.
 */
export function Card({ href, className = '', children }: CardProps) {
  const baseClasses = [
    'group relative block max-w-full rounded-xl border shadow-sm transition',
    'bg-[var(--card)] border-[var(--border)] hover:bg-[var(--card-hover)]',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }
  return <div className={baseClasses}>{children}</div>;
}
