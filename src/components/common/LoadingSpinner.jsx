export default function LoadingSpinner({
  label = "Loading...",
  fullScreen = false,
}) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-800 dark:border-t-indigo-400" />

      <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
}