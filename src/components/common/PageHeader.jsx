export default function PageHeader({
  title,
  subtitle,
  action,
  badge,
  className = "",
}) {
  return (
    <div
      className={[
        "mb-7 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-start sm:justify-between",
        className,
      ].join(" ")}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white md:text-3xl">
            {title}
          </h1>

          {badge && (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-700 ring-1 ring-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:ring-indigo-800">
              {badge}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}