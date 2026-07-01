export default function Badge({
  children,
  variant = "neutral",
  className = "",
}) {
  const variantClasses = {
    primary:
      "bg-orange-50 text-orange-700 ring-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:ring-orange-900",
    success:
      "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:ring-emerald-800",
    warning:
      "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:ring-amber-800",
    danger:
      "bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/30 dark:text-red-300 dark:ring-red-800",
    info:
      "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/30 dark:text-sky-300 dark:ring-sky-800",
    neutral:
      "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
  };

  return (
    <span
      className={[
        "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ring-1",
        variantClasses[variant] || variantClasses.neutral,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
