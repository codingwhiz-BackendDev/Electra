import type { Metadata } from "next";
import type { Position } from "@/types";

export const metadata: Metadata = { title: "Manage Positions" };

const mockPositions: Position[] = [
  { id: "1", title: "President", description: "Head of the student association, chairs all RUNSA meetings.", maxVotesPerVoter: 1 },
  { id: "2", title: "Vice President", description: "Assists the President and acts in their absence.", maxVotesPerVoter: 1 },
  { id: "3", title: "Secretary General", description: "Records and manages all official correspondence.", maxVotesPerVoter: 1 },
  { id: "4", title: "Financial Secretary", description: "Manages RUNSA funds and financial records.", maxVotesPerVoter: 1 },
  { id: "5", title: "Faculty Rep – Engineering", description: "Represents Engineering faculty students.", maxVotesPerVoter: 1 },
  { id: "6", title: "Faculty Rep – Sciences", description: "Represents Sciences faculty students.", maxVotesPerVoter: 1 },
  { id: "7", title: "CS Department President", description: "Head of Computer Science student union.", maxVotesPerVoter: 1 },
  { id: "8", title: "CS Department Secretary", description: "Secretary of Computer Science student union.", maxVotesPerVoter: 1 },
];

export default function AdminPositionsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Positions</h1>
          <p className="text-gray-500 mt-1">Define the positions available for each election.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75V9h5.25a.75.75 0 010 1.5H10.75v5.25a.75.75 0 01-1.5 0V10.5H4a.75.75 0 010-1.5h5.25V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
          </svg>
          Add Position
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockPositions.map((p) => (
          <div key={p.id} className="bg-white rounded-xl border border-brand-100 shadow-sm p-5 hover:border-brand-300 transition-colors">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-gray-900 text-sm">{p.title}</h3>
              <span className="text-xs text-gray-400 font-mono">{p.id}</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">{p.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-brand-600 bg-brand-50 rounded-full px-2 py-0.5">
                Max {p.maxVotesPerVoter} vote/voter
              </span>
              <div className="flex gap-2">
                <button className="text-xs text-brand-600 hover:text-brand-700 font-medium">Edit</button>
                <button className="text-xs text-red-500 hover:text-red-600 font-medium">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
