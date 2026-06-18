import { Eye, Search, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { employerCandidates } from "../../../data/mockEmployerData";

export default function CandidateRanking() {
  const [search, setSearch] = useState("");
  const [minScore, setMinScore] = useState(0);

  const rankedCandidates = useMemo(() => {
    return [...employerCandidates]
      .filter((candidate) => {
        const matchesSearch =
          candidate.name.toLowerCase().includes(search.toLowerCase()) ||
          candidate.title.toLowerCase().includes(search.toLowerCase()) ||
          candidate.location.toLowerCase().includes(search.toLowerCase());

        const matchesScore = candidate.score >= minScore;

        return matchesSearch && matchesScore;
      })
      .sort((firstCandidate, secondCandidate) => {
        return secondCandidate.score - firstCandidate.score;
      });
  }, [search, minScore]);

  return (
    <div>
      <PageHeader
        title="Candidate Ranking"
        subtitle="View AI-ranked candidates based on skills, experience, education, certifications, and semantic similarity."
      />

      <RankingFilters
        search={search}
        setSearch={setSearch}
        minScore={minScore}
        setMinScore={setMinScore}
      />

      <RankingList candidates={rankedCandidates} />
    </div>
  );
}

function RankingFilters({ search, setSearch, minScore, setMinScore }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search candidate name, title, or location..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={minScore}
          onChange={(event) => setMinScore(Number(event.target.value))}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option value={0}>All Scores</option>
          <option value={60}>60% and above</option>
          <option value={70}>70% and above</option>
          <option value={80}>80% and above</option>
        </select>
      </div>
    </Card>
  );
}

function RankingList({ candidates }) {
  if (candidates.length === 0) {
    return (
      <Card>
        <div className="py-10 text-center">
          <h3 className="text-lg font-black">No candidates found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search text or minimum score.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {candidates.map((candidate, index) => (
        <RankingCard
          key={candidate.id}
          candidate={candidate}
          rank={index + 1}
        />
      ))}
    </div>
  );
}

function RankingCard({ candidate, rank }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-black text-white">
            {rank === 1 ? <Trophy size={24} /> : `#${rank}`}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-black">{candidate.name}</h2>

              <Badge
                variant={
                  candidate.status === "Shortlisted"
                    ? "success"
                    : candidate.status === "Rejected"
                    ? "danger"
                    : "warning"
                }
              >
                {candidate.status}
              </Badge>
            </div>

            <p className="mt-1 text-sm font-bold text-indigo-600">
              {candidate.title}
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {candidate.location} · Applied {candidate.appliedDate}
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              {candidate.summary}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {candidate.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full xl:w-72">
          <ProgressBar
            label="AI Ranking Score"
            value={candidate.score}
            showValue
            tone={candidate.score >= 80 ? "success" : "warning"}
          />

          <Link
            to={`/employer/candidates/${candidate.id}`}
            className="mt-4 block"
          >
            <Button fullWidth variant="secondary">
              <Eye size={16} />
              View Candidate
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

