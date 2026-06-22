import { FileText } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import { auditLogs } from "../../../data/mockAdminData";

export default function AuditLogs() {
  return (
    <div>
      <PageHeader
        title="Audit Logs"
        subtitle="Review important admin and system events for platform governance."
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-400 dark:border-slate-800">
                <th className="pb-3 font-black">Action</th>
                <th className="pb-3 font-black">User</th>
                <th className="pb-3 font-black">Role</th>
                <th className="pb-3 font-black">Date</th>
                <th className="pb-3 font-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3 font-black">
                      <FileText size={16} className="text-indigo-600" />
                      {log.action}
                    </div>
                  </td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">
                    {log.user}
                  </td>
                  <td className="py-4">{log.role}</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">
                    {log.date} {log.time}
                  </td>
                  <td className="py-4">
                    <Badge variant={log.status === "Success" ? "success" : "danger"}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
