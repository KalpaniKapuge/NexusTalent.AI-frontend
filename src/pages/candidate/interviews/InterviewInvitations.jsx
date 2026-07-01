import { CalendarCheck, Clock, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import PageHeader from "../../../components/common/PageHeader";

const initialInvitations = [
  {
    id: 1,
    company: "TechCorp Lanka",
    jobTitle: "Junior React Developer",
    date: "2026-06-25",
    time: "10:00 AM",
    mode: "Google Meet",
    status: "Pending",
  },
  {
    id: 2,
    company: "CloudNova Solutions",
    jobTitle: "Full Stack Developer Intern",
    date: "2026-06-28",
    time: "02:30 PM",
    mode: "Microsoft Teams",
    status: "Accepted",
  },
];

function getStatusVariant(status) {
  if (status === "Accepted") return "success";
  if (status === "Declined") return "danger";
  return "warning";
}

export default function InterviewInvitations() {
  const [invitations, setInvitations] = useState(initialInvitations);

  const updateStatus = (invitationId, status) => {
    setInvitations((current) =>
      current.map((item) =>
        item.id === invitationId ? { ...item, status } : item
      )
    );
    toast.success(`Interview ${status.toLowerCase()}.`);
  };

  return (
    <div>
      <PageHeader
        title="Interviews"
        subtitle="Accept, decline, and track interview invitations from employers."
      />

      <div className="grid gap-5">
        {invitations.map((item) => (
          <Card key={item.id} hover>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold">{item.jobTitle}</h2>
                  <Badge variant={getStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm font-semibold text-orange-600">
                  {item.company}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-zinc-400">
                  <span className="flex items-center gap-2">
                    <CalendarCheck size={16} />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {item.time}
                  </span>
                  <span className="flex items-center gap-2">
                    <Video size={16} />
                    {item.mode}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button onClick={() => updateStatus(item.id, "Accepted")}>
                  Accept
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(item.id, "Declined")}
                >
                  Decline
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
