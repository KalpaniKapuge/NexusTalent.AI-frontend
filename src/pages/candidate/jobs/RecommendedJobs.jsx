import { Briefcase, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import PageHeader from "../../../components/common/PageHeader";
import ProgressBar from "../../../components/common/ProgressBar";
import { jobs } from "../../../data/mockCandidateData";

export default function RecommendedJobs() {
  const recommendedJobs = [...jobs].sort(
    (first, second) => second.matchScore - first.matchScore
  );

  return (
    <div>
      <PageHeader
        title="Recommended Jobs"
        subtitle="AI-ranked opportunities based on your resume, skills, experience, and preferences."
        action={
          <Link to="/candidate/jobs">
            <Button variant="outline">
              <Search size={16} />
              Browse All Jobs
            </Button>
          </Link>
        }
      />

      <div className="grid gap-5">
        {recommendedJobs.map((job) => (
          <Card key={job.id} hover>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <Badge variant="primary">{job.matchScore}% Match</Badge>
                  <Badge variant="neutral">{job.mode}</Badge>
                </div>

                <p className="mt-2 text-sm font-semibold text-orange-600">
                  {job.company}
                </p>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase size={16} />
                    {job.type}
                  </span>
                </div>

                <div className="mt-4 max-w-xl">
                  <ProgressBar value={job.matchScore} showValue />
                </div>
              </div>

              <Link to={`/candidate/jobs/${job.id}`}>
                <Button>View Job</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
