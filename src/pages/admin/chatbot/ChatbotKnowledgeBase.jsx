import { BookOpen, PlusCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import { chatbotKnowledgeItems } from "../../../data/mockAdminData";

export default function ChatbotKnowledgeBase() {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(
    () =>
      chatbotKnowledgeItems.filter(
        (item) =>
          item.question.toLowerCase().includes(search.toLowerCase()) ||
          item.answer.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <div>
      <PageHeader
        title="Chatbot Knowledge"
        subtitle="Maintain approved answers used by the assistant for candidate and employer support."
        action={
          <Button onClick={() => toast.success("Knowledge editor will be connected later.")}>
            <PlusCircle size={18} />
            Add Answer
          </Button>
        }
      />

      <Card className="mb-6">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search chatbot questions or answers..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>
      </Card>

      <div className="grid gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} hover>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
                <BookOpen size={22} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-black">{item.question}</h2>
                  <Badge variant="success">{item.status}</Badge>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.answer}
                </p>
                <p className="mt-3 text-xs font-bold text-slate-400">
                  Updated {item.updatedDate}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
