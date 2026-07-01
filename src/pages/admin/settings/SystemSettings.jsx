import {
  Bot,
  Database,
  Lock,
  Moon,
  Save,
  ShieldCheck,
  Sun,
  Type,
} from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";

import { useTheme } from "../../../context/ThemeContext";

export default function SystemSettings() {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontStyle,
    setFontStyle,
  } = useTheme();

  const saveSettings = () => {
    toast.success("System settings saved successfully.");
  };

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Manage platform appearance, AI features, security options, data handling, and administrator preferences."
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

        <AISettings />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <SecuritySettings />
        <PlatformSettings />
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
                Bright and clean admin interface.
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
                Comfortable interface for long admin sessions.
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

function AISettings() {
  const aiOptions = [
    "Enable resume parsing model",
    "Enable candidate ranking model",
    "Enable skill gap analyzer",
    "Enable AI job description generator",
    "Enable chatbot knowledge base",
    "Enable AI-generated candidate feedback",
  ];

  return (
    <Card title="AI Feature Settings">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
        <Bot size={28} />
      </div>

      <div className="space-y-4">
        {aiOptions.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <span className="text-sm font-bold">{option}</span>

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

function SecuritySettings() {
  const securityOptions = [
    "Require strong passwords",
    "Enable admin activity logging",
    "Enable suspicious login alerts",
    "Require email verification",
    "Restrict admin access by role",
  ];

  return (
    <Card title="Security Settings">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
        <Lock size={28} />
      </div>

      <div className="space-y-4">
        {securityOptions.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
          >
            <span className="text-sm font-bold">{option}</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-red-600"
            />
          </label>
        ))}
      </div>
    </Card>
  );
}

function PlatformSettings() {
  const platformOptions = [
    {
      title: "Candidate Registration",
      description: "Allow new candidates to register and create profiles.",
      icon: ShieldCheck,
    },
    {
      title: "Employer Registration",
      description: "Allow new employers to create company accounts.",
      icon: ShieldCheck,
    },
    {
      title: "Resume File Storage",
      description: "Enable resume upload storage for candidate profiles.",
      icon: Database,
    },
    {
      title: "Email Notifications",
      description: "Enable automated system emails and feedback messages.",
      icon: ShieldCheck,
    },
  ];

  return (
    <Card title="Platform Settings">
      <div className="space-y-4">
        {platformOptions.map((option) => {
          const Icon = option.icon;

          return (
            <label
              key={option.title}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl border border-slate-200 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
            >
              <div className="flex gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <Icon size={22} />
                </div>

                <div>
                  <h3 className="font-black">{option.title}</h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                defaultChecked
                className="mt-2 h-5 w-5 accent-emerald-600"
              />
            </label>
          );
        })}
      </div>
    </Card>
  );
}
