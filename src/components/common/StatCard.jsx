export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "primary",
}) {
  const tones = {
    primary: "from-indigo-600 to-fuchsia-600",
    success: "from-emerald-500 to-teal-600",
    warning: "from-amber-500 to-orange-600",
    danger: "from-red-500 to-rose-600",
    info: "from-blue-500 to-cyan-600",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {label}
          </div>

          <div className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            {value}
          </div>

          {change && (
            <div className="mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {change}
            </div>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]} text-white shadow-lg`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}