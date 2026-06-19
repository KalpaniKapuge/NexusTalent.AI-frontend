import { MailCheck, MessageSquare, Send, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

const initialFeedbackList = [
  {
    id: 1,
    candidateName: "Kalpani Kapuge",
    jobTitle: "Junior React Developer",
    status: "Generated",
    type: "Shortlist Feedback",
    message:
      "Your profile shows strong frontend development skills, especially in React and JavaScript. We are pleased to move your application to the next stage.",
  },
  {
    id: 2,
    candidateName: "Dilshan Perera",
    jobTitle: "Junior React Developer",
    status: "Pending",
    type: "Review Feedback",
    message:
      "Your application is currently under review. We are evaluating your frontend development skills and project experience.",
  },
  {
    id: 3,
    candidateName: "Nimasha Silva",
    jobTitle: "Backend Developer Intern",
    status: "Sent",
    type: "Rejection Feedback",
    message:
      "Thank you for applying. At this stage, we recommend improving React, Git, REST API integration, and project-based development experience.",
  },
];

function getStatusVariant(status) {
  if (status === "Sent") return "success";
  if (status === "Generated") return "primary";
  if (status === "Pending") return "warning";

  return "neutral";
}

export default function EmployerFeedback() {
  const [feedbackList, setFeedbackList] = useState(initialFeedbackList);

  const generateFeedback = (feedbackId) => {
    setFeedbackList((current) =>
      current.map((feedback) =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              status: "Generated",
              message:
                "Thank you for your application. Based on your profile, we recommend improving the missing technical skills and adding more real-world project experience. Please continue developing your portfolio and apply again in the future.",
            }
          : feedback
      )
    );

    toast.success("AI feedback generated successfully.");
  };

  const sendFeedback = (feedbackId) => {
    setFeedbackList((current) =>
      current.map((feedback) =>
        feedback.id === feedbackId
          ? {
              ...feedback,
              status: "Sent",
            }
          : feedback
      )
    );

    toast.success("Feedback sent to candidate.");
  };

  const deleteFeedback = (feedbackId) => {
    setFeedbackList((current) =>
      current.filter((feedback) => feedback.id !== feedbackId)
    );

    toast.success("Feedback removed.");
  };

  return (
    <div>
      <PageHeader
        title="Candidate Feedback"
        subtitle="Generate, review, and send personalized feedback messages to candidates."
      />

      <FeedbackSummary feedbackList={feedbackList} />

      <FeedbackList
        feedbackList={feedbackList}
        generateFeedback={generateFeedback}
        sendFeedback={sendFeedback}
        deleteFeedback={deleteFeedback}
      />
    </div>
  );
}

function FeedbackSummary({ feedbackList }) {
  const generatedCount = feedbackList.filter(
    (feedback) => feedback.status === "Generated"
  ).length;

  const sentCount = feedbackList.filter(
    (feedback) => feedback.status === "Sent"
  ).length;

  const pendingCount = feedbackList.filter(
    (feedback) => feedback.status === "Pending"
  ).length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Sparkles size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{generatedCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Generated
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <MailCheck size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{sentCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Sent
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <MessageSquare size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{pendingCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Pending
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function FeedbackList({
  feedbackList,
  generateFeedback,
  sendFeedback,
  deleteFeedback,
}) {
  if (feedbackList.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No feedback messages</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Candidate feedback messages will appear here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {feedbackList.map((feedback) => (
        <Card key={feedback.id} hover>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-black">
                  {feedback.candidateName}
                </h2>

                <Badge variant={getStatusVariant(feedback.status)}>
                  {feedback.status}
                </Badge>

                <Badge variant="info">{feedback.type}</Badge>
              </div>

              <p className="mt-2 text-sm font-bold text-indigo-600">
                {feedback.jobTitle}
              </p>

              <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                {feedback.message}
              </p>
            </div>

            <div className="grid w-full gap-2 xl:w-56">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => generateFeedback(feedback.id)}
              >
                <Sparkles size={16} />
                Generate
              </Button>

              <Button fullWidth onClick={() => sendFeedback(feedback.id)}>
                <Send size={16} />
                Send
              </Button>

              <Button
                variant="danger"
                fullWidth
                onClick={() => deleteFeedback(feedback.id)}
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

