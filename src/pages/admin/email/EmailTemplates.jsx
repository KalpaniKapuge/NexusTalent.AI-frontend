import { Mail, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import { emailTemplates } from "../../../data/mockAdminData";

export default function EmailTemplates() {
  return (
    <div>
      <PageHeader
        title="Email Templates"
        subtitle="Manage notification templates for candidate, employer, and admin workflows."
        action={
          <Button onClick={() => toast.success("Template editor will be connected later.")}>
            <PlusCircle size={18} />
            Add Template
          </Button>
        }
      />

      <div className="grid gap-5">
        {emailTemplates.map((template) => (
          <Card key={template.id} hover>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
                  <Mail size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-black">{template.name}</h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {template.subject}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{template.type}</Badge>
                <Badge variant={template.status === "Active" ? "success" : "neutral"}>
                  {template.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
