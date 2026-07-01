export default function ProgressBar({
  label,
  value = 0,
  showValue = false,
  tone = "primary",
  className = "",
}) {
  const safeValue = Math.max(0, Math.min(Number(value) || 0, 100));

  const toneClasses = {
    primary: "bg-orange-600",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-sky-500",
    neutral: "bg-slate-500",
  };

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3">
          {label && (
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {label}
            </p>
          )}

          {showValue && (
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {safeValue}%
            </p>
          )}
        </div>
      )}

      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={[
            "h-full rounded-full transition-all duration-500",
            toneClasses[tone] || toneClasses.primary,
          ].join(" ")}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
