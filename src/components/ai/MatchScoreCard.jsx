import ProgressBar from "../common/ProgressBar";

export default function MatchScoreCard({
  score = 0,
  title = "AI Match Score",
  description = "Calculated using skills, experience, education, and semantic similarity.",
}) {
  const tone =
    score >= 80 ? "success" : score >= 60 ? "warning" : "danger";

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black">{title}</h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>

        <div className="text-4xl font-black text-indigo-600">{score}%</div>
      </div>

      <div className="mt-5">
        <ProgressBar value={score} tone={tone} showValue={false} />
      </div>
    </div>
  );
}