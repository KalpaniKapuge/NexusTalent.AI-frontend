import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  Video,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

const initialInterviews = [
  {
    id: 1,
    candidateName: "Kalpani Kapuge",
    jobTitle: "Junior React Developer",
    date: "2026-06-25",
    time: "10:00 AM",
    mode: "Online",
    location: "Google Meet",
    status: "Scheduled",
  },
  {
    id: 2,
    candidateName: "Dilshan Perera",
    jobTitle: "Junior React Developer",
    date: "2026-06-26",
    time: "2:30 PM",
    mode: "On-site",
    location: "TechCorp Lanka, Colombo",
    status: "Scheduled",
  },
  {
    id: 3,
    candidateName: "Nimasha Silva",
    jobTitle: "Backend Developer Intern",
    date: "2026-06-20",
    time: "11:30 AM",
    mode: "Online",
    location: "Microsoft Teams",
    status: "Completed",
  },
];

function getStatusVariant(status) {
  if (status === "Scheduled") return "primary";
  if (status === "Completed") return "success";
  if (status === "Cancelled") return "danger";

  return "neutral";
}

export default function EmployerInterviews() {
  const [interviews, setInterviews] = useState(initialInterviews);

  const updateInterviewStatus = (interviewId, status) => {
    setInterviews((current) =>
      current.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              status,
            }
          : interview
      )
    );

    toast.success(`Interview marked as ${status}.`);
  };

  return (
    <div>
      <PageHeader
        title="Interviews"
        subtitle="Manage candidate interviews, schedules, meeting modes, and interview status."
      />

      <InterviewSummary interviews={interviews} />

      <InterviewList
        interviews={interviews}
        updateInterviewStatus={updateInterviewStatus}
      />
    </div>
  );
}

function InterviewList({ interviews, updateInterviewStatus }) {
  return (
    <div className="grid gap-5">
      {interviews.map((interview) => (
        <Card key={interview.id} hover>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black">
                  {interview.candidateName}
                </h2>

                <Badge variant={getStatusVariant(interview.status)}>
                  {interview.status}
                </Badge>

                <Badge variant="info">{interview.mode}</Badge>
              </div>

              <p className="mt-2 text-sm font-bold text-indigo-600">
                {interview.jobTitle}
              </p>

              <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  {interview.date}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {interview.time}
                </span>

                <span className="flex items-center gap-2">
                  {interview.mode === "Online" ? (
                    <Video size={16} />
                  ) : (
                    <MapPin size={16} />
                  )}
                  {interview.location}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                onClick={() =>
                  updateInterviewStatus(interview.id, "Completed")
                }
              >
                <CheckCircle2 size={16} />
                Complete
              </Button>

              <Button
                variant="danger"
                onClick={() =>
                  updateInterviewStatus(interview.id, "Cancelled")
                }
              >
                <XCircle size={16} />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

