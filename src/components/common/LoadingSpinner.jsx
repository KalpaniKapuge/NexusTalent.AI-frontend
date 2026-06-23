export default function LoadingSpinner({
  label = "Loading...",
  size = "md",
  fullScreen = false,
  className = "",
}) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const spinner = (
    <div
      className={[
        "animate-spin rounded-full border-slate-200 border-t-indigo-600 dark:border-slate-800 dark:border-t-indigo-400",
        sizeClasses[size] || sizeClasses.md,
      ].join(" ")}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          {spinner}

          {label && (
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {label}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex items-center justify-center gap-3 py-6",
        className,
      ].join(" ")}
    >
      {spinner}

      {label && (
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          {label}
        </p>
      )}
    </div>
  );
}