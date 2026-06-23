import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  Bot,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserCircle,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function formatRole(role) {
  if (!role) return "User";

  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function DashboardLayout({
  navItems = [],
  userRole = "candidate",
  portalName = "NexusTalent.AI",
  portalSubtitle = "Recruitment Automation",
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { theme, setTheme, toggleTheme } = useTheme();

  const activeRole = userRole || user?.role || "candidate";

  const handleThemeToggle = () => {
    if (toggleTheme) {
      toggleTheme();
      return;
    }

    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToNotifications = () => {
    navigate(`/${activeRole}/notifications`);
  };

  const goToSettings = () => {
    navigate(`/${activeRole}/settings`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          sidebarCollapsed ? "w-24" : "w-72"
        } ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-5 dark:border-slate-800">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <Bot size={24} />
          </div>

          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h1 className="truncate text-lg font-black">{portalName}</h1>
              <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">
                {portalSubtitle}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setSidebarCollapsed((current) => !current)}
            className="ml-auto hidden rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:block"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            className="ml-auto rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          {navItems.map((section) => (
            <div key={section.section}>
              {!sidebarCollapsed && (
                <p className="mb-3 px-3 text-xs font-black uppercase tracking-wider text-slate-400">
                  {section.section}
                </p>
              )}

              <div className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                        } ${sidebarCollapsed ? "justify-center" : ""}`
                      }
                    >
                      <Icon size={20} className="shrink-0" />

                      {!sidebarCollapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>

                          {item.badge && (
                            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-black text-white">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-slate-800">
          <div
            className={`flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-950 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-600 text-sm font-black text-white">
              {user?.avatar || user?.name?.slice(0, 2)?.toUpperCase() || "U"}
            </div>

            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-black">
                  {user?.name || "User"}
                </h3>
                <p className="truncate text-xs font-bold text-slate-500 dark:text-slate-400">
                  {formatRole(activeRole)}
                </p>
              </div>
            )}
          </div>

          {!sidebarCollapsed && (
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-100 dark:bg-red-950/30 dark:text-red-300"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          )}
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-24" : "lg:pl-72"
        }`}
      >
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-2xl border border-slate-200 p-3 text-slate-600 dark:border-slate-800 dark:text-slate-300 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950 md:flex md:w-96">
              <Search size={18} className="text-slate-400" />

              <input
                placeholder="Search jobs, users, candidates..."
                className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={goToNotifications}
              className="relative rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            </button>

            <button
              type="button"
              onClick={handleThemeToggle}
              className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            <button
              type="button"
              onClick={goToSettings}
              className="rounded-2xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-950"
            >
              <Settings size={19} />
            </button>

            <div className="hidden items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2 dark:bg-slate-950 sm:flex">
              <UserCircle size={28} className="text-indigo-600" />

              <div>
                <p className="text-sm font-black">{user?.name || "User"}</p>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {formatRole(activeRole)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-5 md:p-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}