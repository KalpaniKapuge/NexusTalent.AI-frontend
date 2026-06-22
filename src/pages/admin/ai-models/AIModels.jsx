import {
  Activity,
  Bot,
  CheckCircle2,
  FlaskConical,
  PauseCircle,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { adminAIModels } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Testing") return "warning";
  if (status === "Disabled") return "danger";

  return "neutral";
}

function getAccuracyTone(accuracy) {
  if (accuracy >= 85) return "success";
  if (accuracy >= 75) return "warning";

  return "danger";
}

export default function AIModels() {
  const [models, setModels] = useState(adminAIModels);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesSearch =
        model.name.toLowerCase().includes(search.toLowerCase()) ||
        model.type.toLowerCase().includes(search.toLowerCase()) ||
        model.version.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || model.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [models, search, status]);

  const updateModelStatus = (modelId, newStatus) => {
    setModels((current) =>
      current.map((model) =>
        model.id === modelId
          ? {
              ...model,
              status: newStatus,
            }
          : model
      )
    );

    toast.success(`Model marked as ${newStatus}.`);
  };

    return (
    <div>
      <PageHeader
        title="AI Models"
        subtitle="Monitor and manage AI models used for resume parsing, candidate ranking, skill gap analysis, and chatbot responses."
      />

      <ModelSummary models={models} />

      <ModelFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ModelList
        models={filteredModels}
        updateModelStatus={updateModelStatus}
      />
    </div>
  );
}

function ModelSummary({ models }) {
  const activeModels = models.filter((model) => model.status === "Active").length;

  const testingModels = models.filter(
    (model) => model.status === "Testing"
  ).length;

  const averageAccuracy = Math.round(
    models.reduce((total, model) => total + model.accuracy, 0) / models.length
  );

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Bot size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{activeModels}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active Models
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <FlaskConical size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{testingModels}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Testing Models
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
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
    </div>
  );
}

function ModelFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search model name, type, or version..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Active</option>
          <option>Testing</option>
          <option>Disabled</option>
        </select>
      </div>
    </Card>
  );
}

function ModelList({ models, updateModelStatus }) {
  if (models.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No AI models found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          updateModelStatus={updateModelStatus}
        />
      ))}
    </div>
  );
}

function ModelCard({ model, updateModelStatus }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{model.name}</h2>

            <Badge variant="primary">{model.type}</Badge>

            <Badge variant={getStatusVariant(model.status)}>
              {model.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            Version {model.version}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Last trained: {model.lastTrained}
          </p>

          <div className="mt-4 max-w-md">
            <ProgressBar
              label="Model Accuracy"
              value={model.accuracy}
              showValue
              tone={getAccuracyTone(model.accuracy)}
            />
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateModelStatus(model.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Active
          </Button>

          <Button
            variant="secondary"
            onClick={() => updateModelStatus(model.id, "Testing")}
          >
            <FlaskConical size={16} />
            Testing
          </Button>

          <Button
            variant="danger"
            onClick={() => updateModelStatus(model.id, "Disabled")}
          >
            <PauseCircle size={16} />
            Disable
          </Button>
        </div>
      </div>
    </Card>
  );
}

