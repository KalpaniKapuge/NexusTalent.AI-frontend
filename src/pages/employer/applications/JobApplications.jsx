import { Eye, MessageSquare, Search, UserCheck, UserX } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import {
  employerCandidates,
  employerJobs,
} from "../../../data/mockEmployerData";

function getStatusVariant(status) {
  if (status === "Shortlisted") return "success";
  if (status === "Rejected") return "danger";
  if (status === "Under Review") return "warning";

  return "neutral";
}

export default function JobApplications() {
  const { jobId } = useParams();

  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState(employerCandidates);

  const selectedJob = employerJobs.find((job) => job.id === Number(jobId));

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesJob = jobId ? candidate.jobId === Number(jobId) : true;

      const matchesSearch =
        candidate.name.toLowerCase().includes(search.toLowerCase()) ||
        candidate.title.toLowerCase().includes(search.toLowerCase()) ||
        candidate.location.toLowerCase().includes(search.toLowerCase());

      return matchesJob && matchesSearch;
    });
  }, [candidates, jobId, search]);

  const updateCandidateStatus = (candidateId, status) => {
    setCandidates((current) =>
      current.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              status,
            }
          : candidate
      )
    );

    toast.success(`Candidate marked as ${status}.`);
  };

  const generateFeedback = (candidateName) => {
    toast.success(`Feedback generated for ${candidateName}.`);
  };

    return (
    <div>
      <PageHeader
        title={selectedJob ? `${selectedJob.title} Applications` : "Applications"}
        subtitle="Review AI-ranked applicants, shortlist suitable candidates, reject unsuitable candidates, and generate feedback."
      />

      <SearchBox search={search} setSearch={setSearch} />

      <ApplicationList
        candidates={filteredCandidates}
        updateCandidateStatus={updateCandidateStatus}
        generateFeedback={generateFeedback}
      />
    </div>
  );
}

function SearchBox({ search, setSearch }) {
  return (
    <Card className="mb-6">
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search candidate name, title, or location..."
          className="w-full bg-transparent text-sm font-semibold outline-none"
        />
      </div>
    </Card>
  );
}

function ApplicationList({
  candidates,
  updateCandidateStatus,
  generateFeedback,
}) {
  if (candidates.length === 0) {
    return (
      <Card>
        <div className="py-10 text-center">
          <h3 className="text-lg font-black">No applications found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search text.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {candidates.map((candidate) => (
        <CandidateApplicationCard
          key={candidate.id}
          candidate={candidate}
          updateCandidateStatus={updateCandidateStatus}
          generateFeedback={generateFeedback}
        />
      ))}
    </div>
  );
}

function CandidateApplicationCard({
  candidate,
  updateCandidateStatus,
  generateFeedback,
}) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{candidate.name}</h2>

            <Badge variant={getStatusVariant(candidate.status)}>
              {candidate.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
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

        <div className="w-full xl:w-72">
          <ProgressBar
            label="AI Match Score"
            value={candidate.score}
            showValue
            tone={candidate.score >= 80 ? "success" : "warning"}
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to={`/employer/candidates/${candidate.id}`}>
              <Button variant="secondary" fullWidth>
                <Eye size={16} />
                View
              </Button>
            </Link>

            <Button
              fullWidth
              onClick={() =>
                updateCandidateStatus(candidate.id, "Shortlisted")
              }
            >
              <UserCheck size={16} />
              Shortlist
            </Button>

            <Button
              variant="danger"
              fullWidth
              onClick={() => updateCandidateStatus(candidate.id, "Rejected")}
            >
              <UserX size={16} />
              Reject
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => generateFeedback(candidate.name)}
            >
              <MessageSquare size={16} />
              Feedback
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

