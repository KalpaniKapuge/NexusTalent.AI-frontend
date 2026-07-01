import { Bell, Brain, Lock, Moon, Save, Sun, Type } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";

import { useTheme } from "../../../context/ThemeContext";

export default function EmployerSettings() {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontStyle,
    setFontStyle,
  } = useTheme();

  const saveSettings = () => {
    toast.success("Employer settings saved successfully.");
  };

  return (
    <div>
      <PageHeader
        title="Employer Settings"
        subtitle="Customize employer account appearance, AI recruitment options, notifications, and security preferences."
        action={
          <Button onClick={saveSettings}>
            <Save size={18} />
            Save Settings
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <AppearanceSettings
          theme={theme}
          setTheme={setTheme}
          fontSize={fontSize}
          setFontSize={setFontSize}
          fontStyle={fontStyle}
          setFontStyle={setFontStyle}
        />

        <RecruitmentPreferences />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <NotificationPreferences />
        <SecuritySettings />
      </div>
    </div>
  );
}

function AppearanceSettings({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  fontStyle,
  setFontStyle,
}) {
  return (
    <Card title="Appearance Settings">
      <div className="space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-black">Theme</h3>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={`rounded-2xl border p-5 text-left transition ${
                theme === "light"
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              }`}
            >
              <Sun className="mb-3 text-indigo-600" size={24} />
              <div className="font-black">Light Mode</div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Clean bright interface.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={`rounded-2xl border p-5 text-left transition ${
                theme === "dark"
                  ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                  : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
              }`}
            >
              <Moon className="mb-3 text-indigo-600" size={24} />
              <div className="font-black">Dark Mode</div>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Comfortable low-light interface.
              </p>
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black">Font Size</h3>

          <div className="grid gap-3 sm:grid-cols-3">
            {["small", "medium", "large"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setFontSize(size)}
                className={`rounded-2xl border p-4 text-sm font-black capitalize transition ${
                  fontSize === size
                    ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black">Font Style</h3>

          <div className="grid gap-3 sm:grid-cols-3">
            {["modern", "clean", "elegant"].map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setFontStyle(style)}
                className={`rounded-2xl border p-4 text-sm font-black capitalize transition ${
                  fontStyle === style
                    ? "border-orange-600 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
                }`}
              >
                <Type size={18} className="mb-2" />
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function RecruitmentPreferences() {
  const preferences = [
    "Enable AI job description generation",
    "Enable automatic candidate ranking",
    "Enable candidate skill gap analysis",
    "Enable AI-based resume screening",
    "Generate feedback for rejected candidates",
    "Highlight high-match candidates automatically",
  ];

  return (
    <Card title="Recruitment Preferences">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
        <Brain size={28} />
      </div>

      <div className="space-y-4">
        {preferences.map((preference) => (
          <label
            key={preference}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <span className="text-sm font-bold">{preference}</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-indigo-600"
            />
          </label>
        ))}
      </div>
    </Card>
  );
}

function NotificationPreferences() {
  const preferences = [
    "Notify me when a new candidate applies",
    "Notify me when AI ranking is completed",
    "Notify me before job deadline",
    "Send weekly recruitment report",
  ];

  return (
    <Card title="Notification Preferences">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
        <Bell size={28} />
      </div>

      <div className="space-y-4">
        {preferences.map((preference) => (
          <label
            key={preference}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <span className="text-sm font-bold">{preference}</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-emerald-600"
            />
          </label>
        ))}
      </div>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card title="Security Settings">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
        <Lock size={28} />
      </div>

      <div className="space-y-4">
        <button
          type="button"
          className="w-full rounded-2xl border border-slate-200 p-5 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
        >
          <div className="font-black">Change Password</div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your employer account password.
          </p>
        </button>

        <button
          type="button"
          className="w-full rounded-2xl border border-slate-200 p-5 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
        >
          <div className="font-black">Two-Factor Authentication</div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add extra protection to your employer account.
          </p>
        </button>

        <button
          type="button"
          className="w-full rounded-2xl border border-slate-200 p-5 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
        >
          <div className="font-black">Login Activity</div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Review recent login activity and account access.
          </p>
        </button>
      </div>
    </Card>
  );
}

