export default function Card({
  children,
  title,
  subtitle,
  action,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={`rounded-[2rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 ${
        hover ? "transition hover:-translate-y-1 hover:shadow-xl" : ""
      } ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <div>
            {title && (
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
}