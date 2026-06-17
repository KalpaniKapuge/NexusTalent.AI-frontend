export default function AIStatusBadge({ status = "operational" }) {
  const config = {
    operational: {
      label: "Operational",
      className:
        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
      dot: "bg-emerald-500",
    },
    training: {
      label: "Training",
      className:
        "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300",
      dot: "bg-blue-500",
    },
    degraded: {
      label: "Degraded",
      className:
        "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300",
      dot: "bg-amber-500",
    },
    offline: {
      label: "Offline",
      className:
        "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300",
      dot: "bg-red-500",
    },
  };

  const selected = config[status] || config.operational;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ${selected.className}`}
    >
      <span className={`h-2 w-2 rounded-full ${selected.dot}`} />
      {selected.label}
    </span>
  );
}