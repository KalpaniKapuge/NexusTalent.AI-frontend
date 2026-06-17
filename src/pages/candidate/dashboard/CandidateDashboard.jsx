import { Link } from "react-router-dom";
import { Briefcase, FileText, TrendingUp, UploadCloud } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import StatCard from "../../../components/common/StatCard";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/ProgressBar";

import {
  applications,
  candidateProfile,
  jobs,
  skillGapItems,
} from "../../../data/mockCandidateData";

export default function CandidateDashboard() {
  const shortlistedCount = applications.filter(
    (item) => item.status === "Shortlisted"
  ).length;

  return (
    <div>
      <PageHeader
        title="Candidate Dashboard"
        subtitle="Track your job search, resume analysis, AI job matches, applications, and skill improvement roadmap."
        action={
          <Link to="/candidate/jobs">
            <Button>Browse Jobs</Button>
          </Link>
        }
      />

      <div className="mb-7 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-indigo-500/30">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black">
              Your profile is {candidateProfile.profileCompletion}% complete
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
              Complete your resume upload, skills, certifications, and
              preferences to get better AI job matches.
            </p>
          </div>

          <Link to="/candidate/profile">
            <Button variant="secondary">Complete Profile</Button>
          </Link>
        </div>

        <div className="mt-5">
          <ProgressBar
            value={candidateProfile.profileCompletion}
            showValue={false}
            tone="success"
          />
        </div>
      </div>

      <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Applications"
          value={applications.length}
          change="+3 this week"
          icon={FileText}
          tone="primary"
        />

        <StatCard
          label="Shortlisted"
          value={shortlistedCount}
          change="Good progress"
          icon={TrendingUp}
          tone="success"
        />

        <StatCard
          label="AI Job Matches"
          value={jobs.length}
          change="Based on profile"
          icon={Briefcase}
          tone="info"
        />

        <StatCard
          label="Resume Status"
          value="Ready"
          change="AI extracted"
          icon={UploadCloud}
          tone="warning"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Recommended Job Matches">
          <div className="space-y-4">
            {jobs.slice(0, 3).map((job) => (
              <Link
                key={job.id}
                to={`/candidate/jobs/${job.id}`}
                className="block rounded-2xl border border-slate-200 p-4 transition hover:-translate-y-1 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-black">{job.title}</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {job.company} · {job.location}
                    </p>
                  </div>

                  <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                    {job.matchScore}% Match
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card title="Skill Gap Snapshot">
          <div className="space-y-5">
            {skillGapItems.map((item) => (
              <ProgressBar
                key={item.skill}
                label={item.skill}
                value={item.candidate}
                tone={item.priority === "High" ? "danger" : "primary"}
              />
            ))}
          </div>

          <div className="mt-6">
            <Link to="/candidate/skill-gap">
              <Button fullWidth>View Full Skill Gap</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}