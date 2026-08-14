/*
 * app/elections/[id]/page.tsx – Election Detail / Voting Page  (route: /elections/:id)
 *
 * NEXT.JS CONCEPT: Dynamic Route Segments
 * ─────────────────────────────────────────
 * The folder name [id] in brackets creates a dynamic segment.
 * The value is available via the `params` prop.
 * In Next.js 16, params is a Promise — you must `await` it.
 *
 * NEXT.JS CONCEPT: generateMetadata
 * ────────────────────────────────────
 * For dynamic pages you can export an async `generateMetadata` function
 * that receives the same props as the page. This lets you set the
 * <title> based on the election's name fetched from DB.
 */

import type { Metadata } from "next";
import Link from "next/link";
import type { Election, Candidate, Position } from "@/types";
import Badge from "@/components/ui/Badge";
import { electionStatusLabel, electionStatusColor, formatDate, getInitials } from "@/lib/utils";
import VoteForm from "./VoteForm";

// ── Mock data ──────────────────────────────────────────────────
const mockElection: Election = {
  id: "2",
  title: "Faculty Representative Elections 2025",
  description: "Election of faculty-level representatives to the RUNSA council. All verified students may vote for one candidate per position.",
  startDate: "2025-08-20T08:00:00Z",
  endDate: "2025-08-20T17:00:00Z",
  status: "active",
  positionIds: ["5", "6"],
  createdAt: "2025-07-28T10:00:00Z",
};

const mockPositions: Position[] = [
  { id: "5", title: "Faculty Representative – Engineering", description: "Represents Engineering students in the RUNSA council.", maxVotesPerVoter: 1 },
  { id: "6", title: "Faculty Representative – Sciences", description: "Represents Sciences students in the RUNSA council.", maxVotesPerVoter: 1 },
];

const mockCandidates: Candidate[] = [
  { id: "c1", userId: "u1", electionId: "2", positionId: "5", name: "Emeka Nwosu", department: "Electrical Engineering", level: "400", manifesto: "I will advocate for better laboratory facilities, stronger industry partnerships, and mental health support for Engineering students. My three-point plan focuses on infrastructure, internships, and inclusivity." },
  { id: "c2", userId: "u2", electionId: "2", positionId: "5", name: "Fatima Bello", department: "Civil Engineering", level: "300", manifesto: "As a 300L student, I have seen the gaps in our faculty. My agenda: repair the workshop, secure two new corporate sponsors for internships, and hold monthly town halls for student feedback." },
  { id: "c3", userId: "u3", electionId: "2", positionId: "6", name: "Chidi Obi", department: "Computer Science", level: "400", manifesto: "I will push for expanded research grants, better internet access in labs, and semesterly faculty feedback sessions. Sciences deserve a louder voice in RUNSA." },
  { id: "c4", userId: "u4", electionId: "2", positionId: "6", name: "Aisha Musa", department: "Biochemistry", level: "300", manifesto: "My focus: equip the biochemistry and biology labs, negotiate reduced textbook costs with the library, and build a Sciences student mentorship programme." },
];

export async function generateMetadata(
  props: PageProps<"/elections/[id]">
): Promise<Metadata> {
  const { id } = await props.params;
  // When DB is ready: const election = await getElectionById(id);
  void id;
  return { title: mockElection.title };
}

export default async function ElectionDetailPage(
  props: PageProps<"/elections/[id]">
) {
  const { id } = await props.params;
  void id; // will be used in DB query

  const election = mockElection;
  const positions = mockPositions;
  const candidates = mockCandidates;

  const badgeVariantMap: Record<Election["status"], "blue" | "green" | "orange" | "gray"> = {
    draft: "gray", upcoming: "blue", active: "green", ended: "orange", published: "green",
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/elections"
        className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H6.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L6.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
        </svg>
        Back to Elections
      </Link>

      {/* Election header */}
      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-6 mb-8">
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h1 className="text-2xl font-bold text-gray-900 flex-1">{election.title}</h1>
          <Badge variant={badgeVariantMap[election.status]} className={electionStatusColor(election.status)}>
            {electionStatusLabel(election.status)}
          </Badge>
        </div>
        <p className="text-gray-500 mb-4">{election.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>📅 {formatDate(election.startDate)} – {formatDate(election.endDate)}</span>
          <span>🗳 {positions.length} position{positions.length !== 1 ? "s" : ""}</span>
        </div>

        {election.status === "active" && (
          <div className="mt-4 rounded-xl bg-brand-50 border border-brand-200 px-4 py-3 text-sm text-brand-700">
            <strong>Voting is now open.</strong> Select one candidate per position and submit your votes.
            You can only vote once — your choices cannot be changed after submission.
          </div>
        )}
      </div>

      {/* Positions & Candidates */}
      {election.status === "active" ? (
        /*
         * VoteForm is a Client Component — it manages the vote selections
         * with useState and submits via fetch.
         */
        <VoteForm
          election={election}
          positions={positions}
          candidates={candidates}
        />
      ) : (
        // Read-only candidate listing for non-active elections
        <div className="space-y-8">
          {positions.map((position) => {
            const positionCandidates = candidates.filter((c) => c.positionId === position.id);
            return (
              <section key={position.id}>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{position.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{position.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {positionCandidates.map((c) => (
                    <CandidateCard key={c.id} candidate={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Candidate card (server-rendered, read-only) ────────────────
function CandidateCard({ candidate }: { candidate: Candidate }) {
  return (
    <div className="bg-white rounded-xl border border-brand-100 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
          {getInitials(candidate.name)}
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">{candidate.name}</p>
          <p className="text-xs text-gray-500">{candidate.department} · {candidate.level}L</p>
        </div>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">{candidate.manifesto}</p>
    </div>
  );
}
