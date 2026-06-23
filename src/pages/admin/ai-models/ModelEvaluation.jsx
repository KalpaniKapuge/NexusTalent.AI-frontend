import { Activity, BarChart3, CheckCircle2, Database, Target } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { adminAIModels } from "../../../data/mockAdminData";

const evaluationMetrics = [
  {
    id: 1,
    name: "Precision",
    value: 89,
    description: "How accurately the system selects suitable candidates.",
  },
  {
    id: 2,
    name: "Recall",
    value: 84,
    description: "How well the system finds all relevant candidates.",
  },
  {
    id: 3,
    name: "F1 Score",
    value: 86,
    description: "Balanced score between precision and recall.",
  },
  {
    id: 4,
    name: "Ranking Accuracy",
    value: 88,
    description: "How close AI ranking is to human recruiter judgement.",
  },
];

export default function ModelEvaluation() {
  const averageAccuracy = Math.round(
    adminAIModels.reduce((total, model) => total + model.accuracy, 0) /
      adminAIModels.length
  );

  return (
    <div>
      <PageHeader
        title="Model Evaluation"
        subtitle="Evaluate AI model performance using accuracy, precision, recall, F1 score, ranking quality, and testing dataset results."
      />

      <EvaluationSummary averageAccuracy={averageAccuracy} />

      <div className="grid gap-6 xl:grid-cols-2">
        <EvaluationMetrics />
        <TestingDatasetSummary />
      </div>

      <div className="mt-6">
        <ModelPerformanceList />
      </div>

      <div className="mt-6">
        <EvaluationNotes />
      </div>
    </div>
  );
}

function EvaluationSummary({ averageAccuracy }) {
  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Activity size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{averageAccuracy}%</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Average Accuracy
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <Target size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">4</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Evaluation Metrics
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
            <Database size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">1,250</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Test Records
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function EvaluationMetrics() {
  return (
    <Card title="Evaluation Metrics">
      <div className="space-y-5">
        {evaluationMetrics.map((metric) => (
          <div key={metric.id}>
            <ProgressBar
              label={metric.name}
              value={metric.value}
              showValue
              tone={metric.value >= 85 ? "success" : "warning"}
            />

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TestingDatasetSummary() {
  const datasetItems = [
    {
      label: "Resume samples",
      value: "500",
    },
    {
      label: "Job descriptions",
      value: "250",
    },
    {
      label: "Candidate profiles",
      value: "300",
    },
    {
      label: "Chatbot Q&A records",
      value: "200",
    },
  ];

  return (
    <Card title="Testing Dataset Summary">
      <div className="space-y-4">
        {datasetItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {item.label}
            </span>

            <span className="text-xl font-black">{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ModelPerformanceList() {
  return (
    <Card title="Model Performance">
      <div className="grid gap-5">
        {adminAIModels.map((model) => (
          <div
            key={model.id}
            className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-black">{model.name}</h3>

                  <Badge variant="primary">{model.type}</Badge>

                  <Badge
                    variant={model.status === "Active" ? "success" : "warning"}
                  >
                    {model.status}
                  </Badge>
                </div>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Version {model.version} · Last trained {model.lastTrained}
                </p>
              </div>

              <div className="w-full md:w-72">
                <ProgressBar
                  label="Accuracy"
                  value={model.accuracy}
                  showValue
                  tone={model.accuracy >= 85 ? "success" : "warning"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EvaluationNotes() {
  const notes = [
    "Candidate Ranking Model performs strongly for technical job matching.",
    "Resume Parser Model has high extraction accuracy for structured resumes.",
    "Chatbot Intent Model needs further testing before production deployment.",
    "Skill Gap Analyzer provides useful recommendations but requires more training data.",
  ];

  return (
    <Card title="Evaluation Notes">
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note}
            className="flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm font-bold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            {note}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-indigo-50 p-4 text-sm leading-6 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300">
        <div className="mb-2 flex items-center gap-2 font-black">
          <BarChart3 size={18} />
          Evaluation Result
        </div>

        The current AI models are suitable for prototype-level recruitment
        automation. Further real-world testing should be done with larger resume
        datasets, job descriptions, and recruiter feedback.
      </div>
    </Card>
  );
}

