import { Inbox } from "lucide-react";

import Button from "./Button";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data found",
  message = "There are no records to display right now.",
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900",
        className,
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
        <Icon size={32} />
      </div>

      <h3 className="mt-5 text-lg font-black text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {message}
      </p>

      {actionLabel && onAction && (
        <div className="mt-5">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}