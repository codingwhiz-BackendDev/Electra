/*
 * app/elections/page.tsx – Public Elections Listing  (route: /elections)
 *
 * NEXT.JS CONCEPT: Server Component with async data fetching
 * ───────────────────────────────────────────────────────────
 * Server Components can be async functions. You can await database
 * queries or API calls directly inside the component. No useEffect,
 * no useState for loading — the server waits, then streams the HTML.
 *
 * When you connect PostgreSQL, replace the mock data below with:
 *   import db from "@/lib/db";
 *   const elections = await db.query("SELECT * FROM elections ORDER BY start_date DESC");
 */

import type { Metadata } from "next";
import Link from "next/link";
import type { Election } from "@/types";
import Badge from "@/components/ui/Badge";
import { electionStatusLabel, electionStatusColor, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Elections" };

// ── Mock data (replace with DB query later) ─────────────────────
const mockElections: Election[] = [
  {
    id: "1",
    title: "RUNSA General Elections 2025",
    description: "Annual election for all major RUNSA positions including President, Vice President, Secretary General, and Financial Secretary.",
    startDate: "2025-09-15T08:00:00Z",
    endDate: "2025-09-15T18:00:00Z",
    status: "upcoming",
    positionIds: ["1", "2", "3", "4"],
    createdAt: "2025-08-01T10:00:00Z",
  },
  {
    id: "2",
    title: "Faculty Representative Elections 2025",
    description: "Election of faculty-level representatives to the RUNSA council.",
    startDate: "2025-08-20T08:00:00Z",
    endDate: "2025-08-20T17:00:00Z",
    status: "active",
    positionIds: ["5", "6"],
    createdAt: "2025-07-28T10:00:00Z",
  },
  {
    id: "3",
    title: "Departmental Executives 2025",
    description: "Election for departmental student union executives across all departments.",
    startDate: "2025-07-10T08:00:00Z",
    endDate: "2025-07-10T16:00:00Z",
    status: "published",
    positionIds: ["7", "8"],
    createdAt: "2025-06-20T10:00:00Z",
  },
];

const badgeVariantMap: Record<Election["status"], "blue" | "green" | "orange" | "gray"> = {
  draft: "gray",
  upcoming: "blue",
  active: "green",
  ended: "orange",
  published: "green",
};

export default async function ElectionsPage() {
  // When DB is ready: const elections = await fetchElections();
  const elections = mockElections;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Elections</h1>
        <p className="mt-2 text-gray-500">
          All active and upcoming RUNSA student association elections.
        </p>
      </div>

      {elections.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-lg font-medium">No elections at the moment</p>
          <p className="text-sm mt-1">Check back later for upcoming elections.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {elections.map((election) => (
            <article
              key={election.id}
              className="bg-white rounded-2xl border border-brand-100 shadow-sm hover:shadow-md hover:border-brand-300 transition-all duration-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-lg font-semibold text-gray-900">{election.title}</h2>
                    <Badge
                      variant={badgeVariantMap[election.status]}
                      className={electionStatusColor(election.status)}
                    >
                      {electionStatusLabel(election.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{election.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(election.startDate)} → {formatDate(election.endDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      {election.positionIds.length} position{election.positionIds.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/elections/${election.id}`}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap self-start",
                    election.status === "active"
                      ? "bg-brand-600 text-white hover:bg-brand-700"
                      : election.status === "published"
                      ? "bg-brand-100 text-brand-700 hover:bg-brand-200"
                      : "border border-brand-200 text-brand-700 hover:bg-brand-50",
                  ].join(" ")}
                >
                  {election.status === "active" && "Vote Now"}
                  {election.status === "published" && "View Results"}
                  {(election.status === "upcoming" || election.status === "draft" || election.status === "ended") && "View Details"}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
