export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone = "primary",
  className = "",
}) {
  const toneClasses = {
    primary:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
    success:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
    warning:
      "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300",
    danger:
      "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300",
    info:
      "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300",
    neutral:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  };

  return (
    <div
      className={[
        "rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
            {label}
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            {value}
          </h2>

          {change && (
            <p className="mt-2 text-sm font-bold text-emerald-600 dark:text-emerald-300">
              {change}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={[
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
              toneClasses[tone] || toneClasses.primary,
            ].join(" ")}
          >
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
