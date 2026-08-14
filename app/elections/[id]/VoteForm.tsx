"use client";
/*
 * VoteForm.tsx – Interactive voting interface
 *
 * NEXT.JS CONCEPT: Client Component receiving Server Component data via props
 * ─────────────────────────────────────────────────────────────────────────────
 * The parent page (Server Component) fetches election/position/candidate data
 * and passes it here as props. This Client Component handles:
 *  - Tracking which candidate was selected per position (useState)
 *  - Displaying the manifesto modal (useState)
 *  - Submitting the vote (fetch to Route Handler)
 *
 * Props from server to client MUST be serialisable (plain objects, no functions).
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Election, Candidate, Position } from "@/types";
import Button from "@/components/ui/Button";
import { getInitials } from "@/lib/utils";

interface VoteFormProps {
  election: Election;
  positions: Position[];
  candidates: Candidate[];
}

export default function VoteForm({ election, positions, candidates }: VoteFormProps) {
  const router = useRouter();

  // { positionId: candidateId }
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [expandedManifesto, setExpandedManifesto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allPositionsSelected = positions.every((p) => selections[p.id]);

  function selectCandidate(positionId: string, candidateId: string) {
    setSelections((prev) => ({ ...prev, [positionId]: candidateId }));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!allPositionsSelected) {
      setError("Please select one candidate for each position before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      /*
       * NEXT.JS CONCEPT: Route Handler call
       * ──────────────────────────────────────
       * When you implement the API, create:
       *   app/api/elections/[id]/vote/route.ts
       *
       * Example:
       *   const res = await fetch(`/api/elections/${election.id}/vote`, {
       *     method: "POST",
       *     headers: { "Content-Type": "application/json" },
       *     body: JSON.stringify({ selections }),
       *   });
       *   if (!res.ok) throw new Error(await res.text());
       */
      await new Promise((r) => setTimeout(r, 1500)); // stub
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Vote submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-brand-100 shadow-sm p-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Vote Submitted!</h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Your vote has been recorded securely. Thank you for participating in the{" "}
          <strong>{election.title}</strong>.
        </p>
        <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-8">
        {positions.map((position) => {
          const positionCandidates = candidates.filter((c) => c.positionId === position.id);
          const selected = selections[position.id];

          return (
            <fieldset key={position.id} className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden">
              <legend className="w-full px-6 py-4 border-b border-brand-100 bg-brand-50">
                <h2 className="font-semibold text-gray-900">{position.title}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{position.description}</p>
              </legend>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {positionCandidates.map((candidate) => {
                  const isSelected = selected === candidate.id;
                  return (
                    <div key={candidate.id} className="relative">
                      <label
                        htmlFor={`vote-${position.id}-${candidate.id}`}
                        className={[
                          "block rounded-xl border-2 p-4 cursor-pointer transition-all",
                          isSelected
                            ? "border-brand-500 bg-brand-50"
                            : "border-brand-100 bg-white hover:border-brand-300 hover:bg-brand-50/50",
                        ].join(" ")}
                      >
                        <div className="flex items-start gap-3">
                          {/* Radio visually hidden, label does the selection UI */}
                          <input
                            type="radio"
                            id={`vote-${position.id}-${candidate.id}`}
                            name={`position-${position.id}`}
                            value={candidate.id}
                            checked={isSelected}
                            onChange={() => selectCandidate(position.id, candidate.id)}
                            className="sr-only"
                          />

                          {/* Custom radio circle */}
                          <span
                            aria-hidden="true"
                            className={[
                              "mt-0.5 flex h-4 w-4 shrink-0 rounded-full border-2 transition-colors",
                              isSelected ? "border-brand-600 bg-brand-600" : "border-gray-300",
                            ].join(" ")}
                          >
                            {isSelected && (
                              <span className="m-auto h-1.5 w-1.5 rounded-full bg-white" />
                            )}
                          </span>

                          {/* Avatar */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-sm">
                            {getInitials(candidate.name)}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 text-sm">{candidate.name}</p>
                            <p className="text-xs text-gray-500">{candidate.department} · {candidate.level}L</p>
                            <button
                              type="button"
                              onClick={(ev) => {
                                ev.preventDefault();
                                setExpandedManifesto(
                                  expandedManifesto === candidate.id ? null : candidate.id
                                );
                              }}
                              className="mt-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2"
                            >
                              {expandedManifesto === candidate.id ? "Hide manifesto" : "Read manifesto"}
                            </button>
                          </div>
                        </div>

                        {expandedManifesto === candidate.id && (
                          <div className="mt-3 ml-11 rounded-lg bg-white border border-brand-100 p-3 text-xs text-gray-600 leading-relaxed">
                            {candidate.manifesto}
                          </div>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-2xl border border-brand-100 bg-white p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Your Selections</h3>
        <ul className="space-y-2 mb-5">
          {positions.map((p) => {
            const cand = candidates.find((c) => c.id === selections[p.id]);
            return (
              <li key={p.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{p.title}</span>
                <span className={cand ? "font-medium text-brand-700" : "text-gray-300 italic"}>
                  {cand ? cand.name : "Not selected"}
                </span>
              </li>
            );
          })}
        </ul>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!allPositionsSelected}
          loading={loading}
        >
          {loading ? "Submitting vote…" : "Submit My Vote"}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Your vote is final. You cannot change it after submission.
        </p>
      </div>
    </form>
  );
}
