export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-black transition disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary:
      "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
    danger:
      "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300 dark:hover:bg-red-950/50",
    success:
      "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:hover:bg-emerald-950/50",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-5 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        widthClass,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}