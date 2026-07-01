import {
  Bell,
  Bot,
  Briefcase,
  FileSearch,
  ShieldCheck,
  Users,
} from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import StatCard from "../../../components/common/StatCard";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import {
  adminAIModels,
  adminJobPosts,
  adminNotifications,
  adminStats,
  adminUsers,
} from "../../../data/mockAdminData";

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader
        title="Platform Admin Dashboard"
        subtitle="Monitor candidates, company employer accounts, job postings, AI models, resume reviews, reports, and system activity."
      />

      <AdminStats />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentUsers />
        <RecentJobPosts />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <AIModelOverview />
        <AdminNotifications />
      </div>
    </div>
  );
}

function AdminStats() {
  return (
    <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Total Users"
        value={adminStats.totalUsers}
        change="Candidates, companies, admins"
        icon={Users}
        tone="primary"
      />

      <StatCard
        label="Candidates"
        value={adminStats.totalCandidates}
        change="Registered candidates"
        icon={Users}
        tone="success"
      />

      <StatCard
        label="Company Accounts"
        value={adminStats.totalEmployers}
        change="Registered companies"
        icon={ShieldCheck}
        tone="info"
      />

      <StatCard
        label="Job Posts"
        value={adminStats.totalJobPosts}
        change={`${adminStats.activeJobs} active jobs`}
        icon={Briefcase}
        tone="warning"
      />

      <StatCard
        label="Pending Reviews"
        value={adminStats.pendingReviews}
        change="Need admin action"
        icon={FileSearch}
        tone="danger"
      />

      <StatCard
        label="AI Models"
        value={adminStats.aiModels}
        change="Active / testing models"
        icon={Bot}
        tone="primary"
      />

      <StatCard
        label="Applications"
        value={adminStats.monthlyApplications}
        change="This month"
        icon={Briefcase}
        tone="success"
      />

      <StatCard
        label="Notifications"
        value={adminNotifications.length}
        change="System alerts"
        icon={Bell}
        tone="info"
      />
    </div>
  );
}

function RecentUsers() {
  return (
    <Card title="Recent Users">
      <div className="space-y-4">
        {adminUsers.slice(0, 4).map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <div>
              <h3 className="font-black">{user.name}</h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>

            <div className="text-right">
              <Badge
                variant={
                  user.status === "Active"
                    ? "success"
                    : user.status === "Pending"
                    ? "warning"
                    : "danger"
                }
              >
                {user.status}
              </Badge>

              <p className="mt-2 text-xs font-bold text-slate-400">
                {user.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function RecentJobPosts() {
  return (
    <Card title="Recent Job Posts">
      <div className="space-y-4">
        {adminJobPosts.slice(0, 4).map((job) => (
          <div
            key={job.id}
            className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-black">{job.title}</h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {job.company} · {job.applications} applications
                </p>
              </div>

              <Badge
                variant={
                  job.status === "Active"
                    ? "success"
                    : job.status === "Pending Review"
                    ? "warning"
                    : job.status === "Draft"
                    ? "neutral"
                    : "danger"
                }
              >
                {job.status}
              </Badge>
            </div>

            <div className="mt-4">
              <ProgressBar
                label="AI Quality Score"
                value={job.aiScore}
                showValue
                tone={job.aiScore >= 80 ? "success" : "warning"}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AIModelOverview() {
  return (
    <Card title="AI Model Overview">
      <div className="space-y-4">
        {adminAIModels.map((model) => (
          <div
            key={model.id}
            className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-black">{model.name}</h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {model.type} · {model.version}
                </p>
              </div>

              <Badge variant={model.status === "Active" ? "success" : "warning"}>
                {model.status}
              </Badge>
            </div>

            <div className="mt-4">
              <ProgressBar
                label="Accuracy"
                value={model.accuracy}
                showValue
                tone={model.accuracy >= 85 ? "success" : "warning"}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AdminNotifications() {
  return (
    <Card title="Admin Notifications">
      <div className="space-y-4">
        {adminNotifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-black">{notification.title}</h3>

              {!notification.read && <Badge variant="primary">New</Badge>}

              <Badge variant="neutral">{notification.type}</Badge>
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {notification.message}
            </p>

            <p className="mt-2 text-xs font-bold text-slate-400">
              {notification.time}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

