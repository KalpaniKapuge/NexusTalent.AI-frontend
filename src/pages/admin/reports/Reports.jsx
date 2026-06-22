import { BarChart3, Briefcase, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import { adminReportData } from "../../../data/mockAdminData";

export default function Reports() {
  const totals = adminReportData.reduce(
    (result, item) => ({
      users: result.users + item.users,
      jobs: result.jobs + item.jobs,
      applications: result.applications + item.applications,
    }),
    { users: 0, jobs: 0, applications: 0 }
  );

  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="View growth trends across users, job postings, and applications."
      />

      <div className="mb-6 grid gap-5 md:grid-cols-3">
        <Card>
          <Metric icon={Users} label="User Growth" value={totals.users} />
        </Card>
        <Card>
          <Metric icon={Briefcase} label="Job Posts" value={totals.jobs} />
        </Card>
        <Card>
          <Metric
            icon={BarChart3}
            label="Applications"
            value={totals.applications}
          />
        </Card>
      </div>

      <Card title="Monthly Platform Activity">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adminReportData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              <Bar dataKey="jobs" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              <Bar
                dataKey="applications"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
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
