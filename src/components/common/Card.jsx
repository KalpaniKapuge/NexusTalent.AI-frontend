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
        "rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900",
        hover
          ? "transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-slate-950/40"
          : "",
        className,
      ].join(" ")}
    >
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <h2 className="text-lg font-black">{title}</h2>}

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