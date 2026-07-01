export default function SkillTag({ name, level, type = "default" }) {
  const styles = {
    default:
      "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    matched:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
    missing:
      "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300",
    weak:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold ${styles[type]}`}
    >
      {name}

      {level && (
        <span className="rounded-md bg-white/70 px-2 py-0.5 text-[10px] dark:bg-black/20">
          {level}
        </span>
      )}
    </span>
  );
}
