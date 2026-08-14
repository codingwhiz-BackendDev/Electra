import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin Overview" };

const stats = [
  { label: "Total Voters", value: "420", sub: "+12 this week", color: "text-brand-600", bg: "bg-brand-50" },
  { label: "Active Elections", value: "1", sub: "1 upcoming", color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Candidates", value: "14", sub: "Across 3 elections", color: "text-purple-600", bg: "bg-purple-50" },
  { label: "Votes Cast Today", value: "87", sub: "28% turnout", color: "text-emerald-600", bg: "bg-emerald-50" },
];

const quickActions = [
  { href: "/admin/elections", label: "Create Election", desc: "Set up a new election with positions and dates." },
  { href: "/admin/candidates", label: "Add Candidate", desc: "Register a new candidate for an election." },
  { href: "/admin/voters", label: "Manage Voters", desc: "Approve, verify, or remove voter accounts." },
  { href: "/admin/results", label: "Publish Results", desc: "Review and publish verified election results." },
];

const recentActivity = [
  { time: "2 mins ago", text: "New voter registered: Blessing Okonkwo" },
  { time: "15 mins ago", text: "Election 'Faculty Rep 2025' voting started" },
  { time: "1 hr ago", text: "Candidate Halima Yusuf approved for CS Secretary" },
  { time: "3 hrs ago", text: "Results published for Departmental Executives 2025" },
  { time: "Yesterday", text: "Position 'PRO' added to General Elections 2025" },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-1">Manage the entire RUNSA election process from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-brand-100 p-5 shadow-sm">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group bg-white rounded-xl border border-brand-100 p-5 hover:border-brand-300 hover:shadow-md transition-all"
              >
                <p className="font-semibold text-brand-700 group-hover:text-brand-800 text-sm mb-1">
                  {a.label} →
                </p>
                <p className="text-xs text-gray-500">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-brand-100 shadow-sm divide-y divide-brand-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="px-4 py-3">
                <p className="text-xs text-gray-500">{item.time}</p>
                <p className="text-sm text-gray-700 mt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
