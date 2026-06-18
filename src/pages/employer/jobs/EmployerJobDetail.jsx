import { ArrowLeft, FileText, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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

export default function EmployerJobDetail() {
  const { jobId } = useParams();

  const job =
    employerJobs.find((item) => item.id === Number(jobId)) || employerJobs[0];

  const saveUpdate = () => {
    toast.success("Job details updated successfully.");
  };

  return (
    <div>
      <Link
        to="/employer/jobs"
        className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to jobs
      </Link>

      <PageHeader
        title={job.title}
        subtitle={`${job.department} · ${job.location} · ${job.type} · ${job.mode}`}
        action={
          <div className="flex flex-wrap gap-3">
            <Link to={`/employer/jobs/${job.id}/applications`}>
              <Button variant="secondary">
                <FileText size={18} />
                View Applications
              </Button>
            </Link>

            <Button onClick={saveUpdate}>
              <Pencil size={18} />
              Save Update
            </Button>
          </div>
        }
      />

            <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2" title="Job Information">
          <div className="mb-5 flex flex-wrap gap-3">
            <Badge variant={getStatusVariant(job.status)}>{job.status}</Badge>
            <Badge variant="primary">{job.type}</Badge>
            <Badge variant="info">{job.mode}</Badge>
            <Badge variant="neutral">{job.salary}</Badge>
          </div>

          <div className="mb-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="text-sm font-bold text-slate-500">
                Posted Date
              </div>

              <div className="mt-1 font-black">{job.postedDate}</div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="text-sm font-bold text-slate-500">
                Application Deadline
              </div>

              <div className="mt-1 font-black">{job.deadline}</div>
            </div>
          </div>

          <label className="mb-2 block text-sm font-black">
            Job Description
          </label>

          <textarea
            defaultValue={job.description}
            rows={8}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
          />

          <div className="mt-5">
            <h3 className="mb-3 text-sm font-black">Required Skills</h3>

            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

            <Card title="Job Analytics">
          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="text-sm font-bold text-slate-500">
                Applicants
              </div>

              <div className="mt-1 text-3xl font-black">
                {job.applicants}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="text-sm font-bold text-slate-500">
                Shortlisted
              </div>

              <div className="mt-1 text-3xl font-black">
                {job.shortlisted}
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
              <div className="text-sm font-bold text-slate-500">
                Views
              </div>

              <div className="mt-1 text-3xl font-black">
                {job.views}
              </div>
            </div>

            <ProgressBar
              label="Average AI Match"
              value={job.avgMatchScore}
              showValue
              tone={job.avgMatchScore >= 75 ? "success" : "warning"}
            />

            <Link to={`/employer/jobs/${job.id}/applications`}>
              <Button fullWidth>
                <FileText size={18} />
                Review Applications
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

