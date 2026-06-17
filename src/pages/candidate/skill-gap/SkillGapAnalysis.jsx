import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";
import MatchScoreCard from "../../../components/ai/MatchScoreCard";

import { skillGapItems } from "../../../data/mockCandidateData";

function getPriorityVariant(priority) {
  if (priority === "High") return "danger";
  if (priority === "Medium") return "warning";
  return "info";
}

export default function SkillGapAnalysis() {
  return (
    <div>
      <PageHeader
        title="Skill Gap Analysis"
        subtitle="Compare your current skill level with job market requirements and get AI-based improvement suggestions."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <MatchScoreCard
          score={72}
          title="Overall Career Fit"
          description="Based on your current profile compared with selected software development roles."
        />

        <Card className="xl:col-span-2" title="Skill Comparison">
          <div className="space-y-6">
            {skillGapItems.map((item) => {
              const gap = Math.max(item.required - item.candidate, 0);

              return (
                <div
                  key={item.skill}
                  className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-black">{item.skill}</h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Gap: {gap}%
                      </p>
                    </div>

                    <Badge variant={getPriorityVariant(item.priority)}>
                      {item.priority} Priority
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <ProgressBar
                      label="Your level"
                      value={item.candidate}
                      tone="primary"
                    />

                    <ProgressBar
                      label="Required level"
                      value={item.required}
                      tone="warning"
                    />
                  </div>

                  <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                    {item.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}