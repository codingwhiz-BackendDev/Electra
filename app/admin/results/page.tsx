import type { Metadata } from "next";
import type { Election } from "@/types";
import Badge from "@/components/ui/Badge";
import { electionStatusLabel, electionStatusColor, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Results" };

const electionsWithResults: Array<Election & { totalVotes: number; turnout: number }> = [
  {
    id: "3",
    title: "Departmental Executives 2025",
    description: "Departmental student union elections.",
    startDate: "2025-07-10T08:00:00Z",
    endDate: "2025-07-10T16:00:00Z",
    status: "published",
    positionIds: ["7", "8"],
    createdAt: "2025-06-20T10:00:00Z",
    totalVotes: 312,
    turnout: 74.3,
  },
  {
    id: "2",
    title: "Faculty Representative Elections 2025",
    description: "Faculty-level representative elections.",
    startDate: "2025-08-20T08:00:00Z",
    endDate: "2025-08-20T17:00:00Z",
    status: "ended",
    positionIds: ["5", "6"],
    createdAt: "2025-07-28T10:00:00Z",
    totalVotes: 198,
    turnout: 47.1,
  },
];

export default function AdminResultsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Results</h1>
        <p className="text-gray-500 mt-1">Review vote tallies and publish official results.</p>
      </div>

      <div className="flex flex-col gap-5">
        {electionsWithResults.map((el) => (
          <div key={el.id} className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h2 className="font-semibold text-gray-900">{el.title}</h2>
                  <Badge variant={el.status === "published" ? "green" : "orange"} className={electionStatusColor(el.status)}>
                    {electionStatusLabel(el.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mb-3">{el.description}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span>📅 {formatDate(el.startDate)} – {formatDate(el.endDate)}</span>
                  <span>🗳 {el.totalVotes} votes cast ({el.turnout}% turnout)</span>
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                {el.status === "ended" && (
                  <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm">
                    Publish Results
                  </button>
                )}
                {el.status === "published" && (
                  <a
                    href="/results"
                    className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    View Published
                  </a>
                )}
              </div>
            </div>

            {/* Turnout bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Voter Turnout</span>
                <span className="font-medium text-brand-600">{el.turnout}%</span>
              </div>
              <div className="h-2 rounded-full bg-brand-100" role="progressbar" aria-valuenow={el.turnout} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="h-full rounded-full bg-brand-500 transition-all"
                  style={{ width: `${el.turnout}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
