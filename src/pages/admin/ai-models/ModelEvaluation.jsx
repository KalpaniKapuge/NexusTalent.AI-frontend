import { Activity, CheckCircle2, Clock } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";
import { adminAIModels } from "../../../data/mockAdminData";

export default function ModelEvaluation() {
  const averageAccuracy = Math.round(
    adminAIModels.reduce((total, model) => total + model.accuracy, 0) /
      adminAIModels.length
  );

  return (
    <div>
      <PageHeader
        title="Model Evaluation"
        subtitle="Review model accuracy, validation status, and readiness for production use."
      />

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <Card>
          <Metric icon={Activity} label="Average Accuracy" value={`${averageAccuracy}%`} />
        </Card>
        <Card>
          <Metric
            icon={CheckCircle2}
            label="Production Ready"
            value={adminAIModels.filter((model) => model.status === "Active").length}
          />
        </Card>
        <Card>
          <Metric
            icon={Clock}
            label="In Testing"
            value={adminAIModels.filter((model) => model.status === "Testing").length}
          />
        </Card>
      </div>

      <Card title="Evaluation Results">
        <div className="space-y-5">
          {adminAIModels.map((model) => (
            <div
              key={model.id}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-black">{model.name}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {model.type} - {model.version}
                  </p>
                </div>
                <Badge variant={model.status === "Active" ? "success" : "warning"}>
                  {model.status}
                </Badge>
              </div>

              <ProgressBar
                label="Validation Accuracy"
                value={model.accuracy}
                showValue
                tone={model.accuracy >= 85 ? "success" : "warning"}
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
        <Icon size={24} />
      </div>
      <div>
        <div className="text-2xl font-black">{value}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      </div>
    </div>
  );
}
