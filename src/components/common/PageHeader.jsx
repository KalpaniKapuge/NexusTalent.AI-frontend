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
        "mb-7 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:items-start sm:justify-between",
        className,
      ].join(" ")}
    >
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white md:text-3xl">
            {title}
          </h1>

          {badge && (
            <span className="rounded-md bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:ring-orange-900">
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
