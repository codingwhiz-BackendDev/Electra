import type { Metadata } from "next";
import Link from "next/link";
import type { Candidate } from "@/types";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Candidates" };

const mockCandidates: Candidate[] = [
  { id: "c1", userId: "u1", electionId: "2", positionId: "5", name: "Emeka Nwosu", department: "Electrical Engineering", level: "400", manifesto: "Advocate for better lab facilities and internships." },
  { id: "c2", userId: "u2", electionId: "2", positionId: "5", name: "Fatima Bello", department: "Civil Engineering", level: "300", manifesto: "Repair workshop and secure corporate sponsors." },
  { id: "c3", userId: "u3", electionId: "2", positionId: "6", name: "Chidi Obi", department: "Computer Science", level: "400", manifesto: "Expanded research grants and better internet." },
  { id: "c4", userId: "u4", electionId: "2", positionId: "6", name: "Aisha Musa", department: "Biochemistry", level: "300", manifesto: "Equip labs and build mentorship programme." },
  { id: "c10", userId: "u10", electionId: "3", positionId: "7", name: "Tunde Adeyemi", department: "Computer Science", level: "400", manifesto: "Advocacy and better student welfare." },
  { id: "c11", userId: "u11", electionId: "3", positionId: "7", name: "Ngozi Eze", department: "Computer Science", level: "300", manifesto: "Transparent governance and inclusivity." },
];

export default function AdminCandidatesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-500 mt-1">Register and manage election candidates.</p>
        </div>
        <Link
          href="/admin/candidates/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75V9h5.25a.75.75 0 010 1.5H10.75v5.25a.75.75 0 01-1.5 0V10.5H4a.75.75 0 010-1.5h5.25V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
          Add Candidate
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50">
            <tr>
              {["Candidate", "Department", "Level", "Position ID", "Election", "Actions"].map((h) => (
                <th key={h} scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {mockCandidates.map((c) => (
              <tr key={c.id} className="hover:bg-brand-50/40 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
                      {getInitials(c.name)}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-600">{c.department}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{c.level}L</td>
                <td className="px-5 py-4 text-sm text-gray-500 font-mono text-xs">{c.positionId}</td>
                <td className="px-5 py-4 text-sm text-gray-500 font-mono text-xs">{c.electionId}</td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <button className="text-xs font-medium text-brand-600 hover:text-brand-700">Edit</button>
                    <button className="text-xs font-medium text-red-500 hover:text-red-600">Remove</button>
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
