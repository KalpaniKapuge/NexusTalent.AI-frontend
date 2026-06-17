import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function RegisterPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { register } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(params.get("role") || "candidate");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    industry: "",
    email: "",
    password: "",
    agree: false,
  });

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const accountName =
    role === "employer"
      ? form.companyName
      : `${form.firstName} ${form.lastName}`.trim();

  const goToStepTwo = () => {
    setStep(2);
  };

  const goToStepThree = () => {
    if (!accountName || !form.email || !form.password) {
      toast.error("Please fill all required fields.");
      return;
    }

    setStep(3);
  };

  const handleRegister = async () => {
    if (!form.agree) {
      toast.error("Please accept terms and privacy policy.");
      return;
    }

    try {
      setLoading(true);

      const newUser = await register({
        name: accountName,
        email: form.email,
        role,
      });

      toast.success("Account created successfully.");
      navigate(`/${newUser.role}/dashboard`);
    } catch {
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10 text-slate-950 dark:bg-slate-950 dark:text-white">
      <button
        type="button"
        onClick={toggleTheme}
        className="fixed right-5 top-5 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <Link to="/" className="text-2xl font-black">
            NexusTalent<span className="text-indigo-600">.AI</span>
          </Link>

          <h1 className="mt-8 text-4xl font-black tracking-tight">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Start your AI-powered recruitment journey.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
          {/* Step indicator */}
          <div className="mb-8 flex justify-center gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                  step >= item
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                }`}
              >
                {step > item ? <CheckCircle2 size={16} /> : item}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-center text-2xl font-black">
                Choose account type
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    value: "candidate",
                    title: "Candidate",
                    text: "Find jobs, upload CV, view skill gaps.",
                    icon: User,
                  },
                  {
                    value: "employer",
                    title: "Employer",
                    text: "Post jobs, rank applicants, send feedback.",
                    icon: Building2,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setRole(item.value)}
                      className={`rounded-3xl border p-6 text-left transition hover:-translate-y-1 ${
                        role === item.value
                          ? "border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-500/10 dark:bg-indigo-950/30"
                          : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="mb-4 text-indigo-600" size={28} />

                      <div className="text-lg font-black">{item.title}</div>

                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.text}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={goToStepTwo}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-center text-2xl font-black">
                {role === "candidate" ? "Candidate details" : "Company details"}
              </h2>

              <div className="mt-8 space-y-4">
                {role === "candidate" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      value={form.firstName}
                      onChange={(event) =>
                        updateForm("firstName", event.target.value)
                      }
                      placeholder="First name"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                    />

                    <input
                      value={form.lastName}
                      onChange={(event) =>
                        updateForm("lastName", event.target.value)
                      }
                      placeholder="Last name"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                    />
                  </div>
                ) : (
                  <>
                    <input
                      value={form.companyName}
                      onChange={(event) =>
                        updateForm("companyName", event.target.value)
                      }
                      placeholder="Company name"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                    />

                    <input
                      value={form.industry}
                      onChange={(event) =>
                        updateForm("industry", event.target.value)
                      }
                      placeholder="Industry"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                    />
                  </>
                )}

                <input
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="Email address"
                  type="email"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                />

                <input
                  value={form.password}
                  onChange={(event) =>
                    updateForm("password", event.target.value)
                  }
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950"
                />
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-black dark:border-slate-800"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={goToStepThree}
                  className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-center text-2xl font-black">
                Confirm details
              </h2>

              <div className="mt-8 rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Account type</span>
                    <span className="font-black capitalize">{role}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Name</span>
                    <span className="font-black">{accountName || "—"}</span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-slate-500">Email</span>
                    <span className="font-black">{form.email || "—"}</span>
                  </div>
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(event) =>
                    updateForm("agree", event.target.checked)
                  }
                  className="mt-1 h-4 w-4 accent-indigo-600"
                />
                I agree to the Terms and Privacy Policy. I understand my profile
                data may be used for AI job matching and recruitment support.
              </label>

              <div className="mt-8 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-4 text-sm font-black dark:border-slate-800"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                <button
                  type="button"
                  disabled={!form.agree || loading}
                  onClick={handleRegister}
                  className="flex flex-[2] items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-black text-indigo-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}