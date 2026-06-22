import {
  Ban,
  Briefcase,
  CheckCircle2,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { adminUsers } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  if (status === "Suspended") return "danger";

  return "neutral";
}

const initialEmployers = adminUsers
  .filter((user) => user.role === "Employer")
  .map((user, index) => ({
    ...user,
    companyName: user.name,
    industry: index === 0 ? "Software / IT" : "Cloud Services",
    verificationStatus: user.status === "Active" ? "Verified" : "Pending",
    jobPosts: index === 0 ? 12 : 0,
    activeJobs: index === 0 ? 5 : 0,
    location: index === 0 ? "Colombo, Sri Lanka" : "Kandy, Sri Lanka",
  }));

  export default function ManageEmployers() {
  const [employers, setEmployers] = useState(initialEmployers);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredEmployers = useMemo(() => {
    return employers.filter((employer) => {
      const matchesSearch =
        employer.companyName.toLowerCase().includes(search.toLowerCase()) ||
        employer.email.toLowerCase().includes(search.toLowerCase()) ||
        employer.industry.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || employer.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [employers, search, status]);

  const updateEmployerStatus = (employerId, newStatus) => {
    setEmployers((current) =>
      current.map((employer) =>
        employer.id === employerId
          ? {
              ...employer,
              status: newStatus,
              verificationStatus:
                newStatus === "Active" ? "Verified" : "Pending",
            }
          : employer
      )
    );

    toast.success(`Employer marked as ${newStatus}.`);
  };

  const deleteEmployer = (employerId) => {
    setEmployers((current) =>
      current.filter((employer) => employer.id !== employerId)
    );

    toast.success("Employer removed from list.");
  };

    return (
    <div>
      <PageHeader
        title="Manage Employers"
        subtitle="Review employer accounts, company verification, job posting activity, and account status."
      />

      <EmployerSummary employers={employers} />

      <EmployerFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <EmployerList
        employers={filteredEmployers}
        updateEmployerStatus={updateEmployerStatus}
        deleteEmployer={deleteEmployer}
      />
    </div>
  );
}

function EmployerSummary({ employers }) {
  const verifiedCount = employers.filter(
    (employer) => employer.verificationStatus === "Verified"
  ).length;

  const pendingCount = employers.filter(
    (employer) => employer.status === "Pending"
  ).length;

  const totalActiveJobs = employers.reduce(
    (total, employer) => total + employer.activeJobs,
    0
  );

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-4">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Users size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{employers.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Employers
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <ShieldCheck size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{verifiedCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Verified
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{pendingCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Pending
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
            <Briefcase size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{totalActiveJobs}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active Jobs
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function EmployerFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search company, email, or industry..."
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
          <option>Pending</option>
          <option>Suspended</option>
        </select>
      </div>
    </Card>
  );
}

function EmployerList({
  employers,
  updateEmployerStatus,
  deleteEmployer,
}) {
  if (employers.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No employers found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {employers.map((employer) => (
        <EmployerCard
          key={employer.id}
          employer={employer}
          updateEmployerStatus={updateEmployerStatus}
          deleteEmployer={deleteEmployer}
        />
      ))}
    </div>
  );
}

function EmployerCard({
  employer,
  updateEmployerStatus,
  deleteEmployer,
}) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{employer.companyName}</h2>

            <Badge variant={getStatusVariant(employer.status)}>
              {employer.status}
            </Badge>

            <Badge
              variant={
                employer.verificationStatus === "Verified"
                  ? "success"
                  : "warning"
              }
            >
              {employer.verificationStatus}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            {employer.email}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {employer.industry} · {employer.location}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{employer.jobPosts}</div>
              <div className="text-xs text-slate-500">Job Posts</div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{employer.activeJobs}</div>
              <div className="text-xs text-slate-500">Active Jobs</div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950">
              <div className="text-lg font-black">{employer.joinedDate}</div>
              <div className="text-xs text-slate-500">Joined</div>
            </div>
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateEmployerStatus(employer.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Approve
          </Button>

          <Button
            variant="danger"
            onClick={() => updateEmployerStatus(employer.id, "Suspended")}
          >
            <Ban size={16} />
            Suspend
          </Button>

          <Button
            variant="danger"
            onClick={() => deleteEmployer(employer.id)}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

