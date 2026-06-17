import { Sparkles } from "lucide-react";

import Button from "./Button";

export default function EmptyState({
  title = "No data found",
  message = "Your information will appear here after you start using the system.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-300">
        <Sparkles size={24} />
      </div>

      <h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {message}
      </p>

      {actionLabel && (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}