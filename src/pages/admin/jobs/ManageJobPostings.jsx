import {
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { adminJobPosts } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Pending Review") return "warning";
  if (status === "Draft") return "neutral";
  if (status === "Closed") return "danger";

  return "neutral";
}

function JobSummary({ jobs }) {
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const pendingJobs = jobs.filter(
    (job) => job.status === "Pending Review"
  ).length;
  const totalApplications = jobs.reduce(
    (total, job) => total + job.applications,
    0
  );
  const averageScore = Math.round(
    jobs.reduce((total, job) => total + job.aiScore, 0) / jobs.length
  );

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-4">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Briefcase size={24} />
          </div>
          <div>
            <div className="text-2xl font-black">{jobs.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Job Posts
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-2xl font-black">{activeJobs}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <Clock size={24} />
          </div>
          <div>
            <div className="text-2xl font-black">{pendingJobs}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Pending Review
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
            <FileText size={24} />
          </div>
          <div>
            <div className="text-2xl font-black">{totalApplications}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Applications
            </div>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-4">
        <ProgressBar
          label="Average AI Quality Score"
          value={averageScore}
          showValue
          tone={averageScore >= 80 ? "success" : "warning"}
        />
      </Card>
    </div>
  );
}

function JobFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search job title or company..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending Review</option>
          <option>Draft</option>
          <option>Closed</option>
        </select>
      </div>
    </Card>
  );
}

export default function ManageJobPostings() {
  const [jobs, setJobs] = useState(adminJobPosts);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, status]);

  const updateJobStatus = (jobId, newStatus) => {
    setJobs((current) =>
      current.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: newStatus,
            }
          : job
      )
    );

    toast.success(`Job post marked as ${newStatus}.`);
  };

  const deleteJob = (jobId) => {
    setJobs((current) => current.filter((job) => job.id !== jobId));
    toast.success("Job post removed from list.");
  };

    return (
    <div>
      <PageHeader
        title="Manage Job Postings"
        subtitle="Review job posts, approve pending jobs, close expired posts, and monitor AI quality scores."
      />

      <JobSummary jobs={jobs} />

      <JobFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <JobList
        jobs={filteredJobs}
        updateJobStatus={updateJobStatus}
        deleteJob={deleteJob}
      />
    </div>
  );
}

function JobList({ jobs, updateJobStatus, deleteJob }) {
  if (jobs.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No job posts found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          updateJobStatus={updateJobStatus}
          deleteJob={deleteJob}
        />
      ))}
    </div>
  );
}

function JobCard({ job, updateJobStatus, deleteJob }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{job.title}</h2>

            <Badge variant={getStatusVariant(job.status)}>
              {job.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            {job.company}
          </p>

          <div className="mt-3 grid gap-2 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-3">
            <span>Posted: {job.postedDate}</span>
            <span>Expires: {job.expiryDate}</span>
            <span>{job.applications} applications</span>
          </div>

          <div className="mt-4 max-w-md">
            <ProgressBar
              label="AI Quality Score"
              value={job.aiScore}
              showValue
              tone={job.aiScore >= 80 ? "success" : "warning"}
            />
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateJobStatus(job.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Approve
          </Button>

          <Button
            variant="danger"
            onClick={() => updateJobStatus(job.id, "Closed")}
          >
            <XCircle size={16} />
            Close
          </Button>

          <Button variant="danger" onClick={() => deleteJob(job.id)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

