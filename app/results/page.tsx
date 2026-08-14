/*
 * app/results/page.tsx – Published Results  (route: /results)
 */

import type { Metadata } from "next";
import Link from "next/link";
import type { ElectionResult } from "@/types";
import { formatDateTime, getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Election Results" };

// ── Mock published result ──────────────────────────────────────
const mockResult: ElectionResult = {
  election: {
    id: "3",
    title: "Departmental Executives 2025",
    description: "Results for departmental student union elections.",
    startDate: "2025-07-10T08:00:00Z",
    endDate: "2025-07-10T16:00:00Z",
    status: "published",
    positionIds: ["7", "8"],
    createdAt: "2025-06-20T10:00:00Z",
  },
  positionResults: [
    {
      position: { id: "7", title: "CS Department President", description: "", maxVotesPerVoter: 1 },
      totalVotes: 312,
      candidates: [
        { id: "c10", userId: "u10", electionId: "3", positionId: "7", name: "Tunde Adeyemi", department: "Computer Science", level: "400", manifesto: "", voteCount: 178, percentage: 57.1 },
        { id: "c11", userId: "u11", electionId: "3", positionId: "7", name: "Ngozi Eze", department: "Computer Science", level: "300", manifesto: "", voteCount: 134, percentage: 42.9 },
      ],
    },
    {
      position: { id: "8", title: "CS Department Secretary", description: "", maxVotesPerVoter: 1 },
      totalVotes: 299,
      candidates: [
        { id: "c12", userId: "u12", electionId: "3", positionId: "8", name: "Halima Yusuf", department: "Computer Science", level: "300", manifesto: "", voteCount: 192, percentage: 64.2 },
        { id: "c13", userId: "u13", electionId: "3", positionId: "8", name: "Samuel Owusu", department: "Computer Science", level: "200", manifesto: "", voteCount: 107, percentage: 35.8 },
      ],
    },
  ],
  totalVoters: 420,
  totalVotesCast: 312,
  turnoutPercentage: 74.3,
  publishedAt: "2025-07-11T09:00:00Z",
};

export default function ResultsPage() {
  const result = mockResult;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Results</h1>
      <p className="text-gray-500 mb-10">Officially verified and published results.</p>

      {/* Result card */}
      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden mb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-5 text-white">
          <h2 className="text-xl font-bold">{result.election.title}</h2>
          <p className="text-brand-100 text-sm mt-1">
            Published {formatDateTime(result.publishedAt)}
          </p>
        </div>

        {/* Turnout stats */}
        <div className="grid grid-cols-3 divide-x divide-brand-100 border-b border-brand-100">
          {[
            { label: "Registered Voters", value: result.totalVoters },
            { label: "Votes Cast", value: result.totalVotesCast },
            { label: "Voter Turnout", value: `${result.turnoutPercentage}%` },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-4 text-center">
              <p className="text-2xl font-bold text-brand-700">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Turnout progress bar */}
        <div className="px-6 py-4 border-b border-brand-100">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Voter Turnout</span>
            <span className="font-medium text-brand-700">{result.turnoutPercentage}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-brand-100 overflow-hidden" role="progressbar" aria-valuenow={result.turnoutPercentage} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-full rounded-full bg-brand-500 transition-all"
              style={{ width: `${result.turnoutPercentage}%` }}
            />
          </div>
        </div>

        {/* Position results */}
        <div className="divide-y divide-brand-100">
          {result.positionResults.map(({ position, candidates, totalVotes }) => {
            const winner = candidates[0]; // sorted by voteCount descending
            return (
              <section key={position.id} className="px-6 py-6">
                <h3 className="font-semibold text-gray-900 mb-4">{position.title}</h3>

                <div className="space-y-4">
                  {candidates
                    .slice()
                    .sort((a, b) => b.voteCount - a.voteCount)
                    .map((candidate, idx) => {
                      const isWinner = candidate.id === winner.id;
                      return (
                        <div key={candidate.id}>
                          <div className="flex items-center gap-3 mb-2">
                            <div className={[
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-sm",
                              isWinner
                                ? "bg-brand-600 text-white"
                                : "bg-brand-100 text-brand-700",
                            ].join(" ")}>
                              {getInitials(candidate.name)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium text-gray-900 text-sm">{candidate.name}</span>
                                {isWinner && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
                                    🏆 Winner
                                  </span>
                                )}
                                {idx > 0 && (
                                  <span className="text-xs text-gray-400">#{idx + 1}</span>
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{candidate.department} · {candidate.level}L</span>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-bold text-brand-700">{candidate.percentage}%</p>
                              <p className="text-xs text-gray-400">{candidate.voteCount} votes</p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="ml-13 h-2 rounded-full bg-brand-100 overflow-hidden" role="progressbar" aria-valuenow={candidate.percentage} aria-valuemin={0} aria-valuemax={100}>
                            <div
                              className={[
                                "h-full rounded-full transition-all",
                                isWinner ? "bg-brand-600" : "bg-brand-300",
                              ].join(" ")}
                              style={{ width: `${candidate.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                <p className="text-xs text-gray-400 mt-3">Total valid votes: {totalVotes}</p>
              </section>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/elections"
          className="inline-flex items-center gap-2 rounded-lg border border-brand-200 px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors"
        >
          View All Elections
        </Link>
      </div>
    </div>
  );
}
