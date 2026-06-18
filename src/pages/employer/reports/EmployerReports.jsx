import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BarChart3, FileText, TrendingUp, Users } from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import StatCard from "../../../components/common/StatCard";
import Badge from "../../../components/common/Badge";

import {
  employerJobs,
  employerReportData,
} from "../../../data/mockEmployerData";

export default function EmployerReports() {
  const totalApplications = employerReportData.reduce(
    (total, item) => total + item.applications,
    0
  );

  const totalShortlisted = employerReportData.reduce(
    (total, item) => total + item.shortlisted,
    0
  );

  const totalRejected = employerReportData.reduce(
    (total, item) => total + item.rejected,
    0
  );

  const activeJobs = employerJobs.filter(
    (job) => job.status === "Active"
  ).length;

  return (
    <div>
      <PageHeader
        title="Employer Reports"
        subtitle="Analyze job performance, application trends, shortlisted candidates, and recruitment progress."
      />

      <ReportStats
        totalApplications={totalApplications}
        totalShortlisted={totalShortlisted}
        totalRejected={totalRejected}
        activeJobs={activeJobs}
      />

      <RecruitmentChart />

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <BestPerformingJobs />
        <AIInsights />
      </div>
    </div>
  );
}

function ReportStats({
  totalApplications,
  totalShortlisted,
  totalRejected,
  activeJobs,
}) {
  return (
    <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Applications"
        value={totalApplications}
        change="Last 6 months"
        icon={FileText}
        tone="primary"
      />

      <StatCard
        label="Shortlisted"
        value={totalShortlisted}
        change="AI assisted"
        icon={Users}
        tone="success"
      />

      <StatCard
        label="Rejected"
        value={totalRejected}
        change="Feedback supported"
        icon={TrendingUp}
        tone="danger"
      />

      <StatCard
        label="Active Jobs"
        value={activeJobs}
        change="Currently open"
        icon={BarChart3}
        tone="info"
      />
    </div>
  );
}

function RecruitmentChart() {
  return (
    <Card title="Monthly Recruitment Activity">
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge variant="primary">Applications</Badge>
        <Badge variant="success">Shortlisted</Badge>
        <Badge variant="danger">Rejected</Badge>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={employerReportData}>
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
            <Bar
              dataKey="shortlisted"
              name="Shortlisted"
              fill="#10b981"
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="rejected"
              name="Rejected"
              fill="#ef4444"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function BestPerformingJobs() {
  return (
    <Card title="Best Performing Jobs">
      <div className="space-y-4">
        {employerJobs.map((job) => (
          <div
            key={job.id}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <div>
              <h3 className="font-black">{job.title}</h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {job.views} views · {job.applicants} applicants
              </p>
            </div>

            <div className="text-right">
              <div className="font-black text-indigo-600">
                {job.avgMatchScore}%
              </div>

              <div className="text-xs text-slate-500">
                Avg Match
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AIInsights() {
  const insights = [
    "React Developer role has the strongest candidate match quality.",
    "Backend Developer Intern needs more visibility to increase applications.",
    "AI Application Developer had high interest but lower skill match.",
    "Rejected candidates should receive skill-based improvement feedback.",
  ];

  return (
    <Card title="AI Recruitment Insights">
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight}
            className="rounded-2xl bg-indigo-50 p-4 text-sm font-bold text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
          >
            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
}

