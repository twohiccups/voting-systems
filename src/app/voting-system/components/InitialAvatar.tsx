import * as React from 'react';

export type InitialAvatarProps = {
  /** Full display name, e.g. "Alice Johnson (Green)" */
  name: string;
  /** Optional size in px (height=width=size). Default 28 */
  size?: number;
  /** Optional className extension */
  className?: string;
};

/** Extract initials from the name (before any parentheses) */
function getInitials(full: string) {
  const base = full.split('(')[0].trim(); // "Alice Johnson"
  const parts = base
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  if (parts.length === 0) return '??';
  const first = parts[0][0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '';
  return (first + last).toUpperCase();
}


export default function InitialAvatar({ name, size = 28 }: InitialAvatarProps) {
  const initials = getInitials(name);

  return (
    <span
      className="inline-flex items-center justify-center rounded-full border border-border bg-muted text-foreground font-medium"
      style={{ width: size, height: size, fontSize: 12 }}
    >
      {initials}
    </span>

  );
}
