import { Moon, Sun } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

export default function App() {
  const { theme, toggleTheme, fontSize, setFontSize, fontStyle, setFontStyle } =
    useTheme();

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              NexusTalent<span className="text-indigo-600">.AI</span>
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Frontend foundation is ready. Theme, font size, font style,
              authentication context, Tailwind CSS, and toast setup are now
              configured.
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-black">Font Size</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`rounded-2xl px-4 py-2 text-sm font-bold capitalize ${
                    fontSize === size
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 p-5 dark:border-slate-800">
            <h2 className="text-lg font-black">Font Style</h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {["modern", "clean", "elegant"].map((style) => (
                <button
                  key={style}
                  onClick={() => setFontStyle(style)}
                  className={`rounded-2xl px-4 py-2 text-sm font-bold capitalize ${
                    fontStyle === style
                      ? "bg-fuchsia-600 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-100 p-5 dark:bg-slate-950">
          <h2 className="text-lg font-black">Next Step</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Next we will add React Router, protected routes, role-based routes,
            and the first public/auth pages.
          </p>
        </div>
      </div>
    </div>
  );
}