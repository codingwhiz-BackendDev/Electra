/*
 * app/dashboard/page.tsx – Voter Dashboard  (route: /dashboard)
 *
 * NEXT.JS CONCEPT: Protected Server Component
 * ─────────────────────────────────────────────
 * In production, add an auth check here using getCurrentUser() from
 * lib/auth.ts and redirect unauthenticated users:
 *
 *   import { redirect } from "next/navigation";
 *   const user = await getCurrentUser();
 *   if (!user) redirect("/login");
 *
 * `redirect()` from "next/navigation" works in Server Components and
 * throws a special error that Next.js catches to issue the redirect.
 */

import type { Metadata } from "next";
import Link from "next/link";
import type { Election } from "@/types";
import Badge from "@/components/ui/Badge";
import { electionStatusLabel, electionStatusColor, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "My Dashboard" };

// ── Mock session user ──────────────────────────────────────────
const mockUser = {
  name: "Amara Okafor",
  email: "amara.okafor@runsa.edu.ng",
  studentId: "RUNSA/2021/CS/042",
  department: "Computer Science",
  level: "400",
  isVerified: true,
};

// ── Mock elections (replace with DB query) ─────────────────────
const activeElections: Election[] = [
  {
    id: "2",
    title: "Faculty Representative Elections 2025",
    description: "Vote for your faculty representative to the RUNSA council.",
    startDate: "2025-08-20T08:00:00Z",
    endDate: "2025-08-20T17:00:00Z",
    status: "active",
    positionIds: ["5", "6"],
    createdAt: "2025-07-28T10:00:00Z",
  },
];

const upcomingElections: Election[] = [
  {
    id: "1",
    title: "RUNSA General Elections 2025",
    description: "Annual election for all major RUNSA executive positions.",
    startDate: "2025-09-15T08:00:00Z",
    endDate: "2025-09-15T18:00:00Z",
    status: "upcoming",
    positionIds: ["1", "2", "3", "4"],
    createdAt: "2025-08-01T10:00:00Z",
  },
];

// IDs of elections this user has already voted in
const votedElectionIds = new Set<string>(["3"]);

export default function DashboardPage() {
  const initials = mockUser.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Welcome header ───────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xl font-bold shadow-md">
          {initials}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {mockUser.department} · {mockUser.level}L ·{" "}
            {mockUser.isVerified ? (
              <span className="text-brand-600 font-medium">✓ Verified</span>
            ) : (
              <span className="text-amber-600 font-medium">⚠ Email not verified</span>
            )}
          </p>
        </div>
      </div>

      {/* ── Stats row ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Active Elections", value: activeElections.length, color: "text-brand-600" },
          { label: "Upcoming", value: upcomingElections.length, color: "text-blue-600" },
          { label: "Votes Cast", value: votedElectionIds.size, color: "text-emerald-600" },
          { label: "Results Available", value: 1, color: "text-purple-600" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-brand-100 p-5 text-center shadow-sm"
          >
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Active elections ──────────────────────────────────── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Active Elections</h2>
          <Link href="/elections" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            View all →
          </Link>
        </div>

        {activeElections.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">No active elections right now.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {activeElections.map((el) => {
              const hasVoted = votedElectionIds.has(el.id);
              return (
                <div
                  key={el.id}
                  className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{el.title}</h3>
                      <Badge variant="green" className={electionStatusColor(el.status)}>
                        {electionStatusLabel(el.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{el.description}</p>
                    <p className="text-xs text-gray-400">Closes: {formatDate(el.endDate)}</p>
                  </div>

                  {hasVoted ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-100 px-4 py-2 text-sm font-medium text-brand-700 whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Voted
                    </span>
                  ) : (
                    <Link
                      href={`/elections/${el.id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors whitespace-nowrap shadow-sm"
                    >
                      Cast Your Vote
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Upcoming elections ────────────────────────────────── */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Elections</h2>

        {upcomingElections.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">No upcoming elections scheduled.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {upcomingElections.map((el) => (
              <div
                key={el.id}
                className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900">{el.title}</h3>
                    <Badge variant="blue" className={electionStatusColor(el.status)}>
                      {electionStatusLabel(el.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{el.description}</p>
                  <p className="text-xs text-gray-400">Opens: {formatDate(el.startDate)}</p>
                </div>
                <Link
                  href={`/elections/${el.id}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-200 px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors whitespace-nowrap"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Account info ──────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My Account</h2>
        <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {[
              { label: "Full Name", value: mockUser.name },
              { label: "Email", value: mockUser.email },
              { label: "Student ID", value: mockUser.studentId },
              { label: "Department", value: mockUser.department },
              { label: "Level", value: `${mockUser.level}L` },
              { label: "Account Status", value: mockUser.isVerified ? "Verified ✓" : "Pending Verification" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="text-gray-400 text-xs uppercase tracking-wide">{item.label}</dt>
                <dd className="font-medium text-gray-800 mt-0.5">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
