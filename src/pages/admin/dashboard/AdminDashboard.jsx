export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-7">
        <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Monitor users, jobs, AI models, reports, system health, and platform
          activity.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Total Users", "2,847", "+124 this week"],
          ["Active Jobs", "312", "+18 today"],
          ["Applications", "14.5K", "+340 today"],
          ["AI Matches", "8.2K", "94% accuracy"],
        ].map(([label, value, change]) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {label}
            </div>

            <div className="mt-3 text-3xl font-black">{value}</div>

            <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {change}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-black">System Health</h3>

          <div className="mt-5 space-y-3">
            {[
              "AI Matching Service",
              "Resume Extraction Model",
              "Email Notification Service",
              "Chatbot Assistant",
              "File Storage",
              "Database",
            ].map((service) => (
              <div
                key={service}
                className="flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 dark:bg-emerald-950/20"
              >
                <span className="text-sm font-bold">{service}</span>

                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-black">Recent Activity</h3>

          <div className="mt-5 space-y-3">
            {[
              "New employer registered: CloudNova Solutions",
              "AI matched 12 candidates to Senior React Developer",
              "Candidate feedback emails sent",
              "Model evaluation completed",
              "Job posting flagged for review",
            ].map((activity, index) => (
              <div
                key={activity}
                className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
                  {index + 1}
                </div>

                <div>
                  <div className="text-sm font-black">{activity}</div>

                  <div className="mt-1 text-xs font-semibold text-slate-500">
                    {index + 1} hour{index > 0 ? "s" : ""} ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}