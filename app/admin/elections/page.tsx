import type { Metadata } from "next";
import Link from "next/link";
import type { Election } from "@/types";
import Badge from "@/components/ui/Badge";
import { electionStatusLabel, electionStatusColor, formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Elections" };

const mockElections: Election[] = [
  { id: "1", title: "RUNSA General Elections 2025", description: "Annual election for all major RUNSA positions.", startDate: "2025-09-15T08:00:00Z", endDate: "2025-09-15T18:00:00Z", status: "upcoming", positionIds: ["1", "2", "3", "4"], createdAt: "2025-08-01T10:00:00Z" },
  { id: "2", title: "Faculty Representative Elections 2025", description: "Election of faculty-level representatives.", startDate: "2025-08-20T08:00:00Z", endDate: "2025-08-20T17:00:00Z", status: "active", positionIds: ["5", "6"], createdAt: "2025-07-28T10:00:00Z" },
  { id: "3", title: "Departmental Executives 2025", description: "Departmental student union executives.", startDate: "2025-07-10T08:00:00Z", endDate: "2025-07-10T16:00:00Z", status: "published", positionIds: ["7", "8"], createdAt: "2025-06-20T10:00:00Z" },
];

const badgeVariantMap: Record<Election["status"], "blue" | "green" | "orange" | "gray"> = {
  draft: "gray", upcoming: "blue", active: "green", ended: "orange", published: "green",
};

export default function AdminElectionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Elections</h1>
          <p className="text-gray-500 mt-1">Create and manage RUNSA elections.</p>
        </div>
        <Link
          href="/admin/elections/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75V9h5.25a.75.75 0 010 1.5H10.75v5.25a.75.75 0 01-1.5 0V10.5H4a.75.75 0 010-1.5h5.25V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
          New Election
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50">
            <tr>
              {["Election", "Status", "Dates", "Positions", "Actions"].map((h) => (
                <th key={h} scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {mockElections.map((el) => (
              <tr key={el.id} className="hover:bg-brand-50/40 transition-colors">
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900 text-sm">{el.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{el.description}</p>
                </td>
                <td className="px-5 py-4">
                  <Badge variant={badgeVariantMap[el.status]} className={electionStatusColor(el.status)}>
                    {electionStatusLabel(el.status)}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500 whitespace-nowrap">
                  <span>{formatDate(el.startDate)}</span>
                  <span className="block">{formatDate(el.endDate)}</span>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{el.positionIds.length}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/elections/${el.id}`} className="text-xs font-medium text-brand-600 hover:text-brand-700">Edit</Link>
                    {el.status === "ended" && (
                      <Link href={`/admin/results`} className="text-xs font-medium text-emerald-600 hover:text-emerald-700">Publish Results</Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
