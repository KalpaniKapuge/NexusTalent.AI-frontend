import { Link } from "react-router-dom";
import { Briefcase, PlusCircle, TrendingUp, Users } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import {
  employerCandidates,
  employerJobs,
} from "../../../data/mockEmployerData";

export default function EmployerDashboard() {
  const activeJobs = employerJobs.filter((job) => job.status === "Active").length;

  const totalApplicants = employerJobs.reduce(
    (total, job) => total + job.applicants,
    0
  );

  const shortlisted = employerCandidates.filter(
    (candidate) => candidate.status === "Shortlisted"
  ).length;

  return (
    <div>
      <PageHeader
        title="Company Recruitment Dashboard"
        subtitle="Manage your company's job posts, applicants, AI-ranked candidates, interviews, and feedback."
        action={
          <Link to="/employer/post-job">
            <Button>
              <PlusCircle size={18} />
              Post New Job
            </Button>
          </Link>
        }
      />

      <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Jobs"
          value={activeJobs}
          change="Currently published"
          icon={Briefcase}
          tone="primary"
        />

        <StatCard
          label="Total Applicants"
          value={totalApplicants}
          change="+42 this week"
          icon={Users}
          tone="info"
        />

        <StatCard
          label="Shortlisted"
          value={shortlisted}
          change="AI-assisted selection"
          icon={TrendingUp}
          tone="success"
        />

        <StatCard
          label="Average Match"
          value="78%"
          change="Across active jobs"
          icon={TrendingUp}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Recent Job Posts">
          <div className="space-y-4">
            {employerJobs.map((job) => (
              <Link
                key={job.id}
                to={`/employer/jobs/${job.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{job.title}</h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {job.applicants} applicants · {job.shortlisted} shortlisted
                    </p>
                  </div>

                  <Badge
                    variant={
                      job.status === "Active"
                        ? "success"
                        : job.status === "Draft"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {job.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Top Ranked Candidates">
          <div className="space-y-4">
            {employerCandidates.slice(0, 3).map((candidate) => (
              <Link
                key={candidate.id}
                to={`/employer/candidates/${candidate.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{candidate.name}</h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {candidate.title}
                    </p>
                  </div>

                  <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
                    {candidate.score}% Match
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-5">
            <Link to="/employer/candidate-ranking">
              <Button fullWidth>View Full Ranking</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
