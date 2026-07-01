import { BookmarkCheck, MapPin, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import EmptyState from "../../../components/common/EmptyState";
import PageHeader from "../../../components/common/PageHeader";
import { jobs } from "../../../data/mockCandidateData";

export default function SavedJobs() {
  const initialSavedIds = useMemo(() => jobs.slice(0, 2).map((job) => job.id), []);
  const [savedIds, setSavedIds] = useState(initialSavedIds);

  const savedJobs = jobs.filter((job) => savedIds.includes(job.id));

  const removeSavedJob = (jobId) => {
    setSavedIds((current) => current.filter((id) => id !== jobId));
    toast.success("Job removed from saved list.");
  };

  return (
    <div>
      <PageHeader
        title="Saved Jobs"
        subtitle="Keep track of jobs you want to review or apply for later."
      />

      {savedJobs.length === 0 ? (
        <EmptyState
          icon={BookmarkCheck}
          title="No saved jobs"
          message="Browse jobs and save roles that match your career goals."
        />
      ) : (
        <div className="grid gap-5">
          {savedJobs.map((job) => (
            <Card key={job.id} hover>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <Badge variant="primary">{job.matchScore}% Match</Badge>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-orange-600">
                    {job.company}
                  </p>

                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
                    <MapPin size={16} />
                    {job.location} / {job.mode}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link to={`/candidate/jobs/${job.id}`}>
                    <Button>View Job</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => removeSavedJob(job.id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
