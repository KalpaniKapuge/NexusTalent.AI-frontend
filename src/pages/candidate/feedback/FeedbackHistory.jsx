import { MessageSquareText } from "lucide-react";

import Badge from "../../../components/common/Badge";
import Card from "../../../components/common/Card";
import EmptyState from "../../../components/common/EmptyState";
import PageHeader from "../../../components/common/PageHeader";
import { applications } from "../../../data/mockCandidateData";

export default function FeedbackHistory() {
  const feedbackItems = applications.filter((item) => item.feedbackAvailable);

  return (
    <div>
      <PageHeader
        title="Feedback"
        subtitle="Review employer and AI-assisted feedback from your completed applications."
      />

      {feedbackItems.length === 0 ? (
        <EmptyState
          icon={MessageSquareText}
          title="No feedback available"
          message="Feedback will appear here when an employer releases it for an application."
        />
      ) : (
        <div className="grid gap-5">
          {feedbackItems.map((item) => (
            <Card key={item.id} title={item.jobTitle}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="neutral">{item.company}</Badge>
                <Badge variant="danger">{item.status}</Badge>
                <Badge variant="primary">{item.matchScore}% Match</Badge>
              </div>

              <p className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                {item.feedback}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
