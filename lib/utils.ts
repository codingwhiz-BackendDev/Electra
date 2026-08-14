/**
 * lib/utils.ts – Shared utility functions
 */

/** Formats an ISO date string to a readable date */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Formats an ISO date string to a readable date + time */
export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Returns a human-readable label for an election status */
export function electionStatusLabel(
  status: "draft" | "upcoming" | "active" | "ended" | "published"
): string {
  const map = {
    draft: "Draft",
    upcoming: "Upcoming",
    active: "Ongoing",
    ended: "Ended",
    published: "Results Published",
  } as const;
  return map[status];
}

/** Returns a Tailwind colour class for each status badge */
export function electionStatusColor(
  status: "draft" | "upcoming" | "active" | "ended" | "published"
): string {
  const map = {
    draft: "bg-gray-100 text-gray-600",
    upcoming: "bg-blue-100 text-blue-700",
    active: "bg-emerald-100 text-emerald-700",
    ended: "bg-orange-100 text-orange-700",
    published: "bg-green-100 text-green-800",
  } as const;
  return map[status];
}

/** Clamps a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Returns initials from a full name (max 2 letters) */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("");
}
