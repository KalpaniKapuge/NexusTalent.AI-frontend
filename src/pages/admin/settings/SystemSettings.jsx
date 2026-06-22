import { Save, Settings } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";

const initialSettings = {
  autoApproveJobs: false,
  requireEmployerVerification: true,
  aiRankingEnabled: true,
  chatbotEnabled: true,
};

export default function SystemSettings() {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div>
      <PageHeader
        title="System Settings"
        subtitle="Configure platform safeguards, AI features, and admin review rules."
        action={
          <Button onClick={() => toast.success("Settings saved locally.")}>
            <Save size={18} />
            Save
          </Button>
        }
      />

      <Card title="Platform Controls">
        <div className="grid gap-4">
          {Object.entries(settings).map(([key, enabled]) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleSetting(key)}
              className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
                  <Settings size={20} />
                </div>
                <div>
                  <div className="font-black">{formatSettingLabel(key)}</div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {enabled ? "Enabled" : "Disabled"}
                  </div>
                </div>
              </div>

              <span
                className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
                  enabled ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`h-5 w-5 rounded-full bg-white transition ${
                    enabled ? "translate-x-5" : ""
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function formatSettingLabel(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}
