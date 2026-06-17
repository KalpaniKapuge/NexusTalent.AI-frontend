export default function EmployerDashboard() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Employer Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage jobs, view AI-ranked applicants, shortlist candidates, and
            send feedback.
          </p>
        </div>

        <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-indigo-500/25">
          Post New Job
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Active Jobs", "8", "2 closing soon"],
          ["Applicants", "248", "+42 this week"],
          ["Shortlisted", "37", "Across all jobs"],
          ["Avg Match Score", "78%", "AI ranking"],
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
          <h3 className="text-lg font-black">Recruitment Pipeline</h3>

          <div className="mt-5 space-y-3">
            {[
              ["Applied", 248],
              ["AI Ranked", 218],
              ["Shortlisted", 37],
              ["Interview", 12],
              ["Selected", 4],
            ].map(([label, count]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-950"
              >
                <span className="text-sm font-bold text-slate-500">
                  {label}
                </span>

                <span className="text-lg font-black">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-black">AI Recruitment Tools</h3>

          <div className="mt-5 space-y-3">
            {[
              "Generate job description",
              "Rank candidates by match score",
              "Generate rejection feedback",
              "Review skill gap report",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 p-4 text-sm font-bold dark:bg-slate-950"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}