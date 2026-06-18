import { Scale, Users } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { employerCandidates } from "../../../data/mockEmployerData";

export default function CandidateComparison() {
  const [selectedIds, setSelectedIds] = useState([1, 2]);

  const selectedCandidates = useMemo(() => {
    return employerCandidates.filter((candidate) =>
      selectedIds.includes(candidate.id)
    );
  }, [selectedIds]);

  const toggleCandidate = (candidateId) => {
    setSelectedIds((current) => {
      if (current.includes(candidateId)) {
        return current.filter((id) => id !== candidateId);
      }

      if (current.length >= 3) {
        toast.error("You can compare maximum 3 candidates.");
        return current;
      }

      return [...current, candidateId];
    });
  };

  return (
    <div>
      <PageHeader
        title="Candidate Comparison"
        subtitle="Compare candidates using AI score, skills, experience, education, and semantic similarity."
      />

      <CandidateSelector
        selectedIds={selectedIds}
        toggleCandidate={toggleCandidate}
      />

      <ComparisonGrid selectedCandidates={selectedCandidates} />
    </div>
  );
}

function CandidateSelector({ selectedIds, toggleCandidate }) {
  return (
    <Card className="mb-6" title="Select Candidates">
      <div className="flex flex-wrap gap-3">
        {employerCandidates.map((candidate) => {
          const isSelected = selectedIds.includes(candidate.id);

          return (
            <button
              key={candidate.id}
              type="button"
              onClick={() => toggleCandidate(candidate.id)}
              className={`rounded-2xl border px-4 py-3 text-sm font-black transition ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950"
              }`}
            >
              {candidate.name}
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Users size={16} />
        Select minimum 1 and maximum 3 candidates.
      </p>
    </Card>
  );
}

function ComparisonGrid({ selectedCandidates }) {
  if (selectedCandidates.length === 0) {
    return (
      <Card>
        <div className="py-10 text-center">
          <h3 className="text-lg font-black">No candidates selected</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Select at least one candidate to compare.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {selectedCandidates.map((candidate) => (
        <CandidateCompareCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}

function CandidateCompareCard({ candidate }) {
  return (
    <Card title={candidate.name}>
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 font-black text-white">
          {candidate.name
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)}
        </div>

        <div>
          <div className="text-sm font-black">{candidate.title}</div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            {candidate.location}
          </div>
        </div>
      </div>

      <div className="mb-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-4 text-white">
        <div className="flex items-center gap-2 text-sm font-black">
          <Scale size={16} />
          Overall AI Score
        </div>

        <div className="mt-2 text-4xl font-black">{candidate.score}%</div>
      </div>

      <div className="space-y-4">
        <ProgressBar
          label="Skill Score"
          value={candidate.skillScore}
          showValue
        />

        <ProgressBar
          label="Experience Score"
          value={candidate.experienceScore}
          tone="info"
          showValue
        />

        <ProgressBar
          label="Education Score"
          value={candidate.educationScore}
          tone="success"
          showValue
        />

        <ProgressBar
          label="Certification Score"
          value={candidate.certificationScore}
          tone="warning"
          showValue
        />

        <ProgressBar
          label="Semantic Similarity"
          value={candidate.semanticScore}
          tone="primary"
          showValue
        />
      </div>

      <div className="mt-5">
        <h4 className="mb-2 text-sm font-black">Matched Skills</h4>

        <div className="flex flex-wrap gap-2">
          {candidate.matchedSkills.map((skill) => (
            <Badge key={skill} variant="success">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h4 className="mb-2 text-sm font-black">Missing Skills</h4>

        <div className="flex flex-wrap gap-2">
          {candidate.missingSkills.map((skill) => (
            <Badge key={skill} variant="danger">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}

