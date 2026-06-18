import { Eye, FileText, PlusCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { employerJobs } from "../../../data/mockEmployerData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Draft") return "warning";
  if (status === "Closed") return "danger";

  return "neutral";
}

export default function ManageJobs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredJobs = useMemo(() => {
    return employerJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || job.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div>
      <PageHeader
        title="Manage Jobs"
        subtitle="View, filter, edit, and manage all employer job postings."
        action={
          <Link to="/employer/post-job">
            <Button>
              <PlusCircle size={18} />
              Post Job
            </Button>
          </Link>
        }
      />

      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <JobList jobs={filteredJobs} />
    </div>
  );
}

function SearchAndFilter({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title, department, or location..."
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
          <option>Draft</option>
          <option>Closed</option>
        </select>
      </div>
    </Card>
  );
}

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return (
      <Card>
        <div className="py-10 text-center">
          <h3 className="text-lg font-black">No jobs found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

function JobCard({ job }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{job.title}</h2>

            <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>

            <Badge variant="neutral">{job.type}</Badge>

            <Badge variant="info">{job.mode}</Badge>
          </div>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {job.department} · {job.location} · Deadline {job.deadline}
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {job.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-72">
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{job.applicants}</div>
              <div className="text-xs text-slate-500">Applicants</div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{job.shortlisted}</div>
              <div className="text-xs text-slate-500">Shortlist</div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{job.views}</div>
              <div className="text-xs text-slate-500">Views</div>
            </div>
          </div>

          <ProgressBar
            label="Average AI Match"
            value={job.avgMatchScore}
            showValue
            tone={job.avgMatchScore >= 75 ? "success" : "warning"}
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to={`/employer/jobs/${job.id}`}>
              <Button variant="secondary" fullWidth>
                <Eye size={16} />
                View
              </Button>
            </Link>

            <Link to={`/employer/jobs/${job.id}/applications`}>
              <Button fullWidth>
                <FileText size={16} />
                Apps
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

