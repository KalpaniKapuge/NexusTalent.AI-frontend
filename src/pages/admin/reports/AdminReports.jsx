import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  BarChart3,
  Briefcase,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import StatCard from "../../../components/common/StatCard";
import Badge from "../../../components/common/Badge";

import {
  adminReportData,
  adminStats,
} from "../../../data/mockAdminData";

export default function AdminReports() {
  const latestMonth = adminReportData[adminReportData.length - 1];

  return (
    <div>
      <PageHeader
        title="Admin Reports"
        subtitle="Analyze platform growth, users, job postings, applications, and AI-supported recruitment activity."
      />

      <ReportStats latestMonth={latestMonth} />

      <div className="grid gap-6 xl:grid-cols-2">
        <UserGrowthChart />
        <ApplicationGrowthChart />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <PlatformSummary />
        <AdminReportInsights />
      </div>
    </div>
  );
}

function ReportStats({ latestMonth }) {
  return (
    <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Users"
        value={adminStats.totalUsers}
        change={`${latestMonth.users} new users in June`}
        icon={Users}
        tone="primary"
      />

      <StatCard
        label="Job Posts"
        value={adminStats.totalJobPosts}
        change={`${latestMonth.jobs} new jobs in June`}
        icon={Briefcase}
        tone="success"
      />

      <StatCard
        label="Applications"
        value={latestMonth.applications}
        change="June application count"
        icon={FileText}
        tone="info"
      />

      <StatCard
        label="Growth Trend"
        value="+24%"
        change="Compared to previous month"
        icon={TrendingUp}
        tone="warning"
      />
    </div>
  );
}

function UserGrowthChart() {
  return (
    <Card title="User and Job Growth">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="primary">Users</Badge>
        <Badge variant="success">Jobs</Badge>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={adminReportData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="#4f46e5"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="jobs"
              name="Jobs"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function ApplicationGrowthChart() {
  return (
    <Card title="Monthly Applications">
      <div className="mb-4">
        <Badge variant="info">Applications</Badge>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={adminReportData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Bar
              dataKey="applications"
              name="Applications"
              fill="#4f46e5"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function PlatformSummary() {
  const summaryItems = [
    {
      label: "Registered Candidates",
      value: adminStats.totalCandidates,
      badge: "Candidate Portal",
    },
    {
      label: "Registered Employers",
      value: adminStats.totalEmployers,
      badge: "Employer Portal",
    },
    {
      label: "Active Job Posts",
      value: adminStats.activeJobs,
      badge: "Recruitment",
    },
    {
      label: "Pending Admin Reviews",
      value: adminStats.pendingReviews,
      badge: "Needs Action",
    },
  ];

  return (
    <Card title="Platform Summary">
      <div className="space-y-4">
        {summaryItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <div>
              <h3 className="font-black">{item.label}</h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {item.badge}
              </p>
            </div>

            <div className="text-2xl font-black text-indigo-600">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminReportInsights() {
  const insights = [
    "Candidate registrations are increasing steadily across the last six months.",
    "Job posting activity improved with employer portal usage.",
    "Application volume is highest in June, showing strong platform engagement.",
    "Pending reviews should be reduced to improve admin response time.",
  ];

  return (
    <Card title="Admin Report Insights">
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight}
            className="rounded-2xl bg-indigo-50 p-4 text-sm font-bold leading-6 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
          >
            <div className="mb-2 flex items-center gap-2">
              <BarChart3 size={16} />
              Insight
            </div>

            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
}

