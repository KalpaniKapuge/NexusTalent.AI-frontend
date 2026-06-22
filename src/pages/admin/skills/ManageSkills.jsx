import {
  CheckCircle2,
  PlusCircle,
  Search,
  Sparkles,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { adminSkills } from "../../../data/mockAdminData";

function getDemandVariant(level) {
  if (level === "High") return "success";
  if (level === "Medium") return "warning";
  if (level === "Low") return "neutral";

  return "neutral";
}

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Disabled") return "danger";

  return "neutral";
}

export default function ManageSkills() {
  const [skills, setSkills] = useState(adminSkills);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [demandLevel, setDemandLevel] = useState("All");

  const categories = ["All", ...new Set(skills.map((skill) => skill.category))];

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || skill.category === category;

      const matchesDemand =
        demandLevel === "All" || skill.demandLevel === demandLevel;

      return matchesSearch && matchesCategory && matchesDemand;
    });
  }, [skills, search, category, demandLevel]);

  const addSkill = () => {
    toast.success("Add skill form will be connected with backend later.");
  };

  const updateSkillStatus = (skillId, status) => {
    setSkills((current) =>
      current.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              status,
            }
          : skill
      )
    );

    toast.success(`Skill marked as ${status}.`);
  };

  const deleteSkill = (skillId) => {
    setSkills((current) => current.filter((skill) => skill.id !== skillId));
    toast.success("Skill removed from list.");
  };

    return (
    <div>
      <PageHeader
        title="Manage Skills"
        subtitle="Manage skill taxonomy used for resume parsing, job matching, candidate ranking, and skill gap analysis."
        action={
          <Button onClick={addSkill}>
            <PlusCircle size={18} />
            Add Skill
          </Button>
        }
      />

      <SkillSummary skills={skills} />

      <SkillFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        demandLevel={demandLevel}
        setDemandLevel={setDemandLevel}
        categories={categories}
      />

      <SkillList
        skills={filteredSkills}
        updateSkillStatus={updateSkillStatus}
        deleteSkill={deleteSkill}
      />
    </div>
  );
}


function SkillSummary({ skills }) {
  const activeSkills = skills.filter((skill) => skill.status === "Active").length;

  const highDemand = skills.filter(
    (skill) => skill.demandLevel === "High"
  ).length;

  const totalUsage = skills.reduce(
    (total, skill) => total + skill.usageCount,
    0
  );

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Sparkles size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{activeSkills}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active Skills
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
            <div className="text-2xl font-black">{highDemand}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              High Demand
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300">
            <Search size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{totalUsage}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Usage
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SkillFilters({
  search,
  setSearch,
  category,
  setCategory,
  demandLevel,
  setDemandLevel,
  categories,
}) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 xl:grid-cols-[1fr_200px_200px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search skill name or category..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

        <select
          value={demandLevel}
          onChange={(event) => setDemandLevel(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>
    </Card>
  );
}

function SkillList({ skills, updateSkillStatus, deleteSkill }) {
  if (skills.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No skills found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text, category, or demand filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          updateSkillStatus={updateSkillStatus}
          deleteSkill={deleteSkill}
        />
      ))}
    </div>
  );
}

function SkillCard({ skill, updateSkillStatus, deleteSkill }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{skill.name}</h2>

            <Badge variant="primary">{skill.category}</Badge>

            <Badge variant={getDemandVariant(skill.demandLevel)}>
              {skill.demandLevel} Demand
            </Badge>

            <Badge variant={getStatusVariant(skill.status)}>
              {skill.status}
            </Badge>
          </div>

          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Used in {skill.usageCount} resumes, job posts, and ranking signals.
          </p>

          <div className="mt-4 max-w-md">
            <ProgressBar
              label="Usage Strength"
              value={Math.min(Math.round(skill.usageCount / 5), 100)}
              showValue
              tone={skill.demandLevel === "High" ? "success" : "warning"}
            />
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateSkillStatus(skill.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Enable
          </Button>

          <Button
            variant="danger"
            onClick={() => updateSkillStatus(skill.id, "Disabled")}
          >
            <XCircle size={16} />
            Disable
          </Button>

          <Button variant="danger" onClick={() => deleteSkill(skill.id)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
