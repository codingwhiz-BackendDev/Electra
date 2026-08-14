import type { Metadata } from "next";
import type { User } from "@/types";
import { getInitials } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Voters" };

const mockVoters: User[] = [
  { id: "u1", name: "Emeka Nwosu", email: "emeka.nwosu@runsa.edu.ng", role: "voter", isVerified: true, studentId: "RUNSA/2021/EE/012", department: "Electrical Engineering", level: "400", createdAt: "2025-08-01T10:00:00Z" },
  { id: "u2", name: "Fatima Bello", email: "fatima.bello@runsa.edu.ng", role: "voter", isVerified: true, studentId: "RUNSA/2022/CE/009", department: "Civil Engineering", level: "300", createdAt: "2025-08-02T11:00:00Z" },
  { id: "u3", name: "Chidi Obi", email: "chidi.obi@runsa.edu.ng", role: "voter", isVerified: false, studentId: "RUNSA/2021/CS/033", department: "Computer Science", level: "400", createdAt: "2025-08-03T09:30:00Z" },
  { id: "u4", name: "Aisha Musa", email: "aisha.musa@runsa.edu.ng", role: "voter", isVerified: true, studentId: "RUNSA/2022/BC/017", department: "Biochemistry", level: "300", createdAt: "2025-08-03T14:00:00Z" },
  { id: "u5", name: "Blessing Okonkwo", email: "blessing.okonkwo@runsa.edu.ng", role: "voter", isVerified: false, studentId: "RUNSA/2023/MA/004", department: "Mass Communication", level: "200", createdAt: "2025-08-14T08:00:00Z" },
];

export default function AdminVotersPage() {
  const verified = mockVoters.filter((v) => v.isVerified).length;
  const pending = mockVoters.length - verified;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Voters</h1>
          <p className="text-gray-500 mt-1">Manage registered student voter accounts.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Voters", value: mockVoters.length, color: "text-gray-700" },
          { label: "Verified", value: verified, color: "text-brand-600" },
          { label: "Pending Verification", value: pending, color: "text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-brand-100 p-4 text-center shadow-sm">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-brand-100">
          <thead className="bg-brand-50">
            <tr>
              {["Student", "Email", "Student ID", "Dept / Level", "Status", "Actions"].map((h) => (
                <th key={h} scope="col" className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {mockVoters.map((v) => (
              <tr key={v.id} className="hover:bg-brand-50/40 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
                      {getInitials(v.name)}
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{v.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{v.email}</td>
                <td className="px-5 py-4 text-xs font-mono text-gray-500">{v.studentId}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{v.department}<br /><span className="text-xs text-gray-400">{v.level}L</span></td>
                <td className="px-5 py-4">
                  <span className={[
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    v.isVerified ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-700",
                  ].join(" ")}>
                    {v.isVerified ? "✓ Verified" : "Pending"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    {!v.isVerified && (
                      <button className="text-xs font-medium text-brand-600 hover:text-brand-700">Verify</button>
                    )}
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
