export default function Card({
  children,
  title,
  subtitle,
  action,
  hover = false,
  className = "",
}) {
  return (
    <div
      className={[
        "rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        hover
          ? "transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md dark:hover:border-orange-900"
          : "",
        className,
      ].join(" ")}
    >
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}

            {subtitle && (
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children}
    </div>
  );
}
