import { Moon, Save, Sun, Type } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";

import { useTheme } from "../../../context/ThemeContext";

export default function CandidateSettings() {
  const {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontStyle,
    setFontStyle,
  } = useTheme();

  const saveSettings = () => {
    toast.success("Settings saved successfully.");
  };

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Customize appearance, font size, font style, notification preferences, privacy, and account settings."
        action={
          <Button onClick={saveSettings}>
            <Save size={18} />
            Save Settings
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <Card title="Appearance">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-black">Theme</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { value: "light", label: "Light", icon: Sun },
                  { value: "dark", label: "Dark", icon: Moon },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setTheme(item.value)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        theme === item.value
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <Icon className="mb-3 text-indigo-600" size={24} />

                      <div className="font-black">{item.label}</div>
                    </button>
                  );
                })}
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
                    className={`rounded-2xl border p-4 text-sm font-black capitalize ${
                      fontSize === size
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300"
                        : "border-slate-200 dark:border-slate-800"
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
                    className={`rounded-2xl border p-4 text-sm font-black capitalize ${
                      fontStyle === style
                        ? "border-orange-600 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300"
                        : "border-slate-200 dark:border-slate-800"
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

        <Card title="Account & Privacy">
          <div className="space-y-4">
            {[
              "Enable email notifications",
              "Enable job match alerts",
              "Allow employers to view my profile",
              "Allow AI to analyze my resume",
              "Receive feedback after rejection",
            ].map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <span className="text-sm font-bold">{item}</span>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-indigo-600"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
