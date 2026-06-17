import { Eye, EyeOff, Lock, Mail, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const demoAccounts = [
  {
    label: "Candidate Demo",
    email: "candidate@demo.com",
    role: "candidate",
  },
  {
    label: "Employer Demo",
    email: "employer@demo.com",
    role: "employer",
  },
  {
    label: "Admin Demo",
    email: "admin@demo.com",
    role: "admin",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    role: "candidate",
    email: "",
    password: "",
  });

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const fillDemo = (account) => {
    setForm({
      role: account.role,
      email: account.email,
      password: "demo123",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const loggedUser = await login(form);

      toast.success(`Welcome back, ${loggedUser.name}`);
      navigate(`/${loggedUser.role}/dashboard`);
    } catch (error) {
      toast.error(error.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white lg:grid-cols-2">
      {/* Left side */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-fuchsia-950 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-16 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative max-w-lg">
          <Link to="/" className="mb-14 inline-block text-2xl font-black">
            NexusTalent<span className="text-fuchsia-400">.AI</span>
          </Link>

          <h1 className="text-5xl font-black leading-tight tracking-tight">
            Your AI-powered recruitment partner.
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Manage applications, job postings, CV ranking, skill gap analysis,
            feedback, and AI-powered recruitment workflows.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="relative flex items-center justify-center px-5 py-12">
        <button
          type="button"
          onClick={toggleTheme}
          className="absolute right-5 top-5 rounded-2xl border border-slate-200 p-2.5 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-black">
              NexusTalent<span className="text-indigo-600">.AI</span>
            </Link>

            <h2 className="mt-8 text-4xl font-black tracking-tight">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Sign in to continue to your portal.
            </p>
          </div>

          {/* Demo accounts */}
          <div className="mb-6 rounded-3xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
            <div className="mb-3 text-xs font-black uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
              Demo accounts
            </div>

            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => fillDemo(account)}
                  className="rounded-full bg-white px-4 py-2 text-xs font-black text-indigo-700 shadow-sm transition hover:-translate-y-0.5 dark:bg-slate-900 dark:text-indigo-300"
                >
                  {account.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-black">
                Sign in as
              </label>

              <div className="grid grid-cols-3 gap-2">
                {["candidate", "employer", "admin"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => updateForm("role", role)}
                    className={`rounded-2xl border px-3 py-3 text-sm font-black capitalize transition ${
                      form.role === role
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-black">Email</label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateForm("email", event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-black">Password</label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-black text-indigo-600"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                <Lock size={18} className="text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) =>
                    updateForm("password", event.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-indigo-500/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Do not have an account?{" "}
            <Link to="/register" className="font-black text-indigo-600">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}