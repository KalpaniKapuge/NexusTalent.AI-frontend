import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Search,
  ShieldAlert,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { auditLogs } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Success") return "success";
  if (status === "Failed") return "danger";

  return "neutral";
}

export default function AuditLogs() {
  const [logs, setLogs] = useState(auditLogs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.role.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || log.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [logs, search, status]);

  const deleteLog = (logId) => {
    setLogs((current) => current.filter((log) => log.id !== logId));
    toast.success("Audit log removed.");
  };

   return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle="Monitor system actions, admin activity, login events, job approvals, and failed access attempts."
      />

      <AuditSummary logs={logs} />

      <AuditFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <AuditLogList logs={filteredLogs} deleteLog={deleteLog} />
    </div>
  );
}

function AuditSummary({ logs }) {
  const successCount = logs.filter((log) => log.status === "Success").length;
  const failedCount = logs.filter((log) => log.status === "Failed").length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <FileText size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{logs.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Logs
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
            <div className="text-2xl font-black">{successCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Success Events
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
            <AlertTriangle size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{failedCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Failed Events
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function AuditFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search action, user, or role..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Success</option>
          <option>Failed</option>
        </select>
      </div>
    </Card>
  );
}

function AuditLogList({ logs, deleteLog }) {
  if (logs.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No audit logs found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {logs.map((log) => (
        <AuditLogCard key={log.id} log={log} deleteLog={deleteLog} />
      ))}
    </div>
  );
}

function AuditLogCard({ log, deleteLog }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <ShieldAlert size={22} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-black">{log.action}</h2>

              <Badge variant={getStatusVariant(log.status)}>
                {log.status}
              </Badge>

              <Badge variant="neutral">{log.role}</Badge>
            </div>

            <p className="mt-2 text-sm font-bold text-indigo-600">
              {log.user}
            </p>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {log.date} · {log.time}
            </p>
          </div>
        </div>

        <Button variant="danger" onClick={() => deleteLog(log.id)}>
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </Card>
  );
}

