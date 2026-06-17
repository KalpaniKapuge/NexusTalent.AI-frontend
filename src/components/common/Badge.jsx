export default function Badge({ children, variant = "neutral", className = "" }) {
  const variants = {
    neutral:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    success:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
    warning:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
    danger:
      "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300",
    info:
      "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
    primary:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-black ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}