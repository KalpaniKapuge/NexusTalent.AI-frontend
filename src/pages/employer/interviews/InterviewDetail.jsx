import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  UserRound,
  Video,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import PageHeader from "../../../components/common/PageHeader";
import {
  employerCandidates,
  employerInterviews,
} from "../../../data/mockEmployerData";

function getStatusVariant(status) {
  if (status === "Completed") return "success";
  if (status === "Cancelled") return "danger";
  if (status === "Pending") return "warning";
  return "primary";
}

export default function InterviewDetail() {
  const navigate = useNavigate();
  const { interviewId } = useParams();

  const interview =
    employerInterviews.find((item) => item.id === Number(interviewId)) ||
    employerInterviews[0];

  const candidate =
    employerCandidates.find((item) => item.id === interview.candidateId) ||
    employerCandidates[0];

  const markStatus = (status) => {
    toast.success(`Interview marked as ${status.toLowerCase()}.`);
    navigate("/employer/interviews");
  };

  return (
    <div>
      <Link
        to="/employer/interviews"
        className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600 dark:text-zinc-400"
      >
        <ArrowLeft size={16} />
        Back to interviews
      </Link>

      <PageHeader
        title={interview.candidateName}
        subtitle={`${interview.interviewType} for ${interview.jobTitle}`}
        badge={interview.status}
        action={
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => markStatus("Completed")}>
              <CheckCircle2 size={16} />
              Complete
            </Button>
            <Button variant="danger" onClick={() => markStatus("Cancelled")}>
              <XCircle size={16} />
              Cancel
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2" title="Interview Information">
          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem icon={CalendarDays} label="Date" value={interview.date} />
            <DetailItem icon={Clock} label="Time" value={interview.time} />
            <DetailItem icon={Video} label="Mode" value={interview.mode} />
            <DetailItem
              icon={UserRound}
              label="Interviewer"
              value={interview.interviewer}
            />
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
              Notes
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-zinc-200">
              {interview.notes}
            </p>
          </div>
        </Card>

        <Card title="Candidate Snapshot">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 font-semibold text-white">
              {candidate.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div>
              <h2 className="font-semibold">{candidate.name}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400">
                {candidate.title}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant={getStatusVariant(interview.status)}>
              {interview.status}
            </Badge>
            <Badge variant="primary">{candidate.score}% Match</Badge>
          </div>

          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-zinc-300">
            {candidate.summary}
          </p>
        </Card>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-zinc-400">
        <Icon size={16} />
        {label}
      </div>
      <div className="mt-2 font-semibold text-slate-950 dark:text-white">
        {value}
      </div>
    </div>
  );
}
