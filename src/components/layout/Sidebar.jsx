import { Bot, LogOut, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { candidateNav } from "../navigation/candidateNav";
import { employerNav } from "../navigation/employerNav";
import { adminNav } from "../navigation/adminNav";

const navByRole = {
  candidate: candidateNav,
  employer: employerNav,
  admin: adminNav,
};

const roleLabel = {
  candidate: "Candidate Portal",
  employer: "Employer Portal",
  admin: "Admin Panel",
};

export default function Sidebar({ role, open, setOpen }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navSections = navByRole[role] || [];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white/95 shadow-2xl shadow-slate-200/70 backdrop-blur-xl transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-black/30 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-5">
          <button
            type="button"
            onClick={() => navigate(`/${role}/dashboard`)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30">
              <Bot size={22} />
            </div>

            <div className="text-left">
              <div className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                NexusTalent<span className="text-indigo-600">.AI</span>
              </div>

              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {roleLabel[role]}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-3">
          {navSections.map((section) => (
            <div key={section.section}>
              <div className="mb-3 px-3 text-xs font-black uppercase tracking-widest text-slate-400">
                {section.section}
              </div>

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  if (!item.active) {
                    return (
                      <button
                        key={item.label}
                        type="button"
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-slate-400 dark:text-slate-600"
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={18} />
                          {item.label}
                        </span>

                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-400 dark:bg-slate-900">
                          Soon
                        </span>
                      </button>
                    );
                  }

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-black transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/25"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                        }`
                      }
                    >
                      <Icon size={18} />
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User card */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
              {user?.avatar || "U"}
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-black text-slate-950 dark:text-white">
                {user?.name || "User"}
              </div>

              <div className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">
                {user?.email || "user@nexustalent.ai"}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/30"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}