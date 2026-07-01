import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Topbar({ role, onMenuClick }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-black/85 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden w-80 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-950 md:flex">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder={
              role === "employer"
                ? "Search company jobs, applicants, interviews..."
                : "Search jobs, candidates, skills..."
            }
            className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="relative rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-orange-500 ring-2 ring-white dark:ring-black" />
        </button>

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          type="button"
          onClick={() => navigate(`/${role}/dashboard`)}
          className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-600 text-xs font-semibold text-white shadow-sm"
        >
          {user?.avatar || "U"}
        </button>
      </div>
    </header>
  );
}
