export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  tone = "primary",
}) {
  const safeValue = Math.min(Math.max(Number(value), 0), 100);

  const tones = {
    primary: "from-indigo-600 to-fuchsia-600",
    success: "from-emerald-500 to-teal-600",
    warning: "from-amber-500 to-orange-600",
    danger: "from-red-500 to-rose-600",
    info: "from-blue-500 to-cyan-600",
  };

  return (
    <div>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold">
          {label && <span>{label}</span>}

          {showValue && (
            <span className="text-slate-500 dark:text-slate-400">
              {safeValue}%
            </span>
          )}
        </div>
      )}

      <div className="h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tones[tone]} transition-all duration-700`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}