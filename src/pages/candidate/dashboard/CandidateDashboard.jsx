export default function CandidateDashboard() {
  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Candidate Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Track your applications, job matches, resume status, and skill gap
            progress.
          </p>
        </div>

        <button className="rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-3 text-sm font-black text-white shadow-xl shadow-indigo-500/25">
          Browse Jobs
        </button>
      </div>

      <div className="mb-7 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 text-white shadow-2xl shadow-indigo-500/30">
        <h2 className="text-2xl font-black">Your profile is 78% complete</h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
          Complete resume upload, skills, certifications, and profile
          preferences to improve AI job matching.
        </p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-[78%] rounded-full bg-white" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Applications", "12", "+3 this week"],
          ["Shortlisted", "4", "33% shortlist rate"],
          ["Interviews", "2", "Next: Friday"],
          ["AI Job Matches", "18", "Based on your profile"],
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
          <h3 className="text-lg font-black">Next Best Actions</h3>

          <div className="mt-5 space-y-3">
            {[
              "Upload latest CV for AI extraction",
              "Review missing skills for Senior React Developer",
              "Apply for 3 high-match jobs",
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

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-lg font-black">AI Skill Gap Snapshot</h3>

          <div className="mt-5 space-y-4">
            {[
              ["React", 85],
              ["Node.js", 72],
              ["SQL", 65],
              ["AWS", 40],
            ].map(([skill, score]) => (
              <div key={skill}>
                <div className="mb-2 flex justify-between text-sm font-bold">
                  <span>{skill}</span>
                  <span className="text-slate-500">{score}%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-600"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}