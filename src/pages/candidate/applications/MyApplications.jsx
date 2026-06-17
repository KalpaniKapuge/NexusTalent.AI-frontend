import { MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/ProgressBar";

import { applications } from "../../../data/mockCandidateData";

function getStatusVariant(status) {
  if (status === "Shortlisted") return "success";
  if (status === "Rejected") return "danger";
  if (status === "Under Review") return "warning";
  return "neutral";
}

export default function MyApplications() {
  const showFeedback = (application) => {
    if (!application.feedbackAvailable) {
      toast("Feedback is not available yet.");
      return;
    }

    toast.success(application.feedback);
  };

  return (
    <div>
      <PageHeader
        title="My Applications"
        subtitle="Track submitted applications, AI match score, employer decision status, and feedback."
      />

      <div className="grid gap-5">
        {applications.map((application) => (
          <Card key={application.id} hover>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">
                    {application.jobTitle}
                  </h2>

                  <Badge variant={getStatusVariant(application.status)}>
                    {application.status}
                  </Badge>
                </div>

                <p className="mt-2 text-sm font-bold text-indigo-600">
                  {application.company}
                </p>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Applied on {application.appliedDate}
                </p>
              </div>

              <div className="w-full lg:w-56">
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>AI Match</span>
                  <span>{application.matchScore}%</span>
                </div>

                <ProgressBar value={application.matchScore} showValue={false} />

                <Button
                  variant="secondary"
                  fullWidth
                  className="mt-4"
                  onClick={() => showFeedback(application)}
                >
                  <MessageSquare size={16} />
                  View Feedback
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}