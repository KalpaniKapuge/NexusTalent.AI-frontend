import {
  CheckCircle2,
  FileText,
  Mail,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { emailTemplates } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Draft") return "warning";
  if (status === "Disabled") return "danger";

  return "neutral";
}

function getTypeVariant(type) {
  if (type === "Candidate") return "primary";
  if (type === "Employer") return "info";

  return "neutral";
}

export default function EmailTemplates() {
  const [templates, setTemplates] = useState(emailTemplates);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(search.toLowerCase()) ||
        template.subject.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "All" || template.type === type;

      const matchesStatus = status === "All" || template.status === status;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [templates, search, type, status]);

  const addTemplate = () => {
    toast.success("Add email template form will be connected later.");
  };

  const updateTemplateStatus = (templateId, newStatus) => {
    setTemplates((current) =>
      current.map((template) =>
        template.id === templateId
          ? {
              ...template,
              status: newStatus,
            }
          : template
      )
    );

    toast.success(`Template marked as ${newStatus}.`);
  };

  const deleteTemplate = (templateId) => {
    setTemplates((current) =>
      current.filter((template) => template.id !== templateId)
    );

    toast.success("Email template removed.");
  };

    return (
    <div>
      <PageHeader
        title="Email Templates"
        subtitle="Manage candidate and employer email templates for application updates, feedback, shortlisting, and verification."
        action={
          <Button onClick={addTemplate}>
            <PlusCircle size={18} />
            Add Template
          </Button>
        }
      />

      <TemplateSummary templates={templates} />

      <TemplateFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
      />

      <TemplateList
        templates={filteredTemplates}
        updateTemplateStatus={updateTemplateStatus}
        deleteTemplate={deleteTemplate}
      />
    </div>
  );
}

function TemplateSummary({ templates }) {
  const activeCount = templates.filter(
    (template) => template.status === "Active"
  ).length;

  const draftCount = templates.filter(
    (template) => template.status === "Draft"
  ).length;

  const candidateTemplates = templates.filter(
    (template) => template.type === "Candidate"
  ).length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Mail size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{activeCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active Templates
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <FileText size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{draftCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Draft Templates
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{candidateTemplates}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Candidate Templates
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TemplateFilters({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
}) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 xl:grid-cols-[1fr_200px_200px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search template name or subject..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={type}
          onChange={(event) => setType(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Candidate</option>
          <option>Employer</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Disabled</option>
        </select>
      </div>
    </Card>
  );
}

function TemplateList({
  templates,
  updateTemplateStatus,
  deleteTemplate,
}) {
  if (templates.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No email templates found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text, type, or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          updateTemplateStatus={updateTemplateStatus}
          deleteTemplate={deleteTemplate}
        />
      ))}
    </div>
  );
}

function TemplateCard({
  template,
  updateTemplateStatus,
  deleteTemplate,
}) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{template.name}</h2>

            <Badge variant={getTypeVariant(template.type)}>
              {template.type}
            </Badge>

            <Badge variant={getStatusVariant(template.status)}>
              {template.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            {template.subject}
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This template is used for automated recruitment communication.
            Backend integration will later load the full editable email body.
          </p>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateTemplateStatus(template.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Active
          </Button>

          <Button
            variant="secondary"
            onClick={() => updateTemplateStatus(template.id, "Draft")}
          >
            <FileText size={16} />
            Draft
          </Button>

          <Button
            variant="danger"
            onClick={() => deleteTemplate(template.id)}
          >
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

