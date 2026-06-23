import {
  Bot,
  CheckCircle2,
  PlusCircle,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { chatbotKnowledgeItems } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Disabled") return "danger";

  return "neutral";
}

export default function ChatbotKnowledge() {
  const [knowledgeItems, setKnowledgeItems] = useState(chatbotKnowledgeItems);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredItems = useMemo(() => {
    return knowledgeItems.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [knowledgeItems, search, status]);

  const addKnowledgeItem = () => {
    toast.success("Add chatbot knowledge form will be connected later.");
  };

  const updateItemStatus = (itemId, newStatus) => {
    setKnowledgeItems((current) =>
      current.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );

    toast.success(`Knowledge item marked as ${newStatus}.`);
  };

  const deleteItem = (itemId) => {
    setKnowledgeItems((current) =>
      current.filter((item) => item.id !== itemId)
    );

    toast.success("Knowledge item removed.");
  };

    return (
    <div>
      <PageHeader
        title="Chatbot Knowledge"
        subtitle="Manage recruitment-specific chatbot questions, answers, and knowledge base records."
        action={
          <Button onClick={addKnowledgeItem}>
            <PlusCircle size={18} />
            Add Knowledge
          </Button>
        }
      />

      <KnowledgeSummary knowledgeItems={knowledgeItems} />

      <KnowledgeFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <KnowledgeList
        knowledgeItems={filteredItems}
        updateItemStatus={updateItemStatus}
        deleteItem={deleteItem}
      />
    </div>
  );
}

function KnowledgeSummary({ knowledgeItems }) {
  const activeCount = knowledgeItems.filter(
    (item) => item.status === "Active"
  ).length;

  const disabledCount = knowledgeItems.filter(
    (item) => item.status === "Disabled"
  ).length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Bot size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{knowledgeItems.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Items
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
            <div className="text-2xl font-black">{activeCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
            <XCircle size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{disabledCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Disabled
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function KnowledgeFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search chatbot question or answer..."
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
          <option>Disabled</option>
        </select>
      </div>
    </Card>
  );
}

function KnowledgeList({ knowledgeItems, updateItemStatus, deleteItem }) {
  if (knowledgeItems.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No knowledge items found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {knowledgeItems.map((item) => (
        <KnowledgeCard
          key={item.id}
          item={item}
          updateItemStatus={updateItemStatus}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}

function KnowledgeCard({ item, updateItemStatus, deleteItem }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{item.question}</h2>

            <Badge variant={getStatusVariant(item.status)}>
              {item.status}
            </Badge>
          </div>

          <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
            {item.answer}
          </p>

          <p className="mt-3 text-xs font-bold text-slate-400">
            Last updated: {item.updatedDate}
          </p>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-80">
          <Button
            variant="secondary"
            onClick={() => updateItemStatus(item.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Active
          </Button>

          <Button
            variant="danger"
            onClick={() => updateItemStatus(item.id, "Disabled")}
          >
            <XCircle size={16} />
            Disable
          </Button>

          <Button variant="danger" onClick={() => deleteItem(item.id)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}


