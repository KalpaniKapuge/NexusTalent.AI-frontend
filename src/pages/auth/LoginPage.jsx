import { Bot, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function getDashboardPath(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "employer") return "/employer/dashboard";

  return "/candidate/dashboard";
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "admin@demo.com",
    password: "demo123",
    role: "admin",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const loggedUser = login(
        formData.email,
        formData.password,
        formData.role
      );

      toast.success(`Welcome back, ${loggedUser.name}`);

      const redirectPath =
        location.state?.from?.pathname || getDashboardPath(loggedUser.role);

      navigate(redirectPath, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = (email, role) => {
    setFormData({
      email,
      password: "demo123",
      role,
    });
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-indigo-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Bot size={26} />
          </div>

          <div>
            <h1 className="text-xl font-black">NexusTalent.AI</h1>
            <p className="text-sm font-bold text-indigo-100">
              Intelligent Recruitment Automation
            </p>
          </div>
        </div>

        <div>
          <h2 className="max-w-xl text-4xl font-black leading-tight">
            AI-powered hiring platform for candidates, employers, and admins.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-indigo-100">
            Automate job description creation, resume screening, candidate
            ranking, skill gap analysis, and recruitment notifications in one
            smart platform.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            "AI resume parsing and ranking",
            "Skill gap analysis and feedback",
            "Employer and candidate portals",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <ShieldCheck size={20} />
              <span className="font-bold">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-5 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
              <LogIn size={32} />
            </div>

            <h1 className="text-3xl font-black">Welcome Back</h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Login to continue to your recruitment dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-black">
                Email Address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  placeholder="Enter email address"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <Lock size={18} className="text-slate-400" />

                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) =>
                    updateField("password", event.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                Login Role
              </label>

              <select
                value={formData.role}
                onChange={(event) => updateField("role", event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
              >
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>
              <LogIn size={18} />
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 flex items-center justify-between text-sm font-bold">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>

            <Link to="/register" className="text-indigo-600 hover:underline">
              Create account
            </Link>
          </div>

          <div className="mt-7 rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
            <p className="mb-3 text-sm font-black">Demo Accounts</p>

            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => fillDemoAccount("candidate@demo.com", "candidate")}
                className="rounded-2xl bg-white px-4 py-3 text-left text-xs font-bold text-slate-600 transition hover:bg-indigo-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
              >
                Candidate: candidate@demo.com / demo123
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount("employer@demo.com", "employer")}
                className="rounded-2xl bg-white px-4 py-3 text-left text-xs font-bold text-slate-600 transition hover:bg-indigo-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
              >
                Employer: employer@demo.com / demo123
              </button>

              <button
                type="button"
                onClick={() => fillDemoAccount("admin@demo.com", "admin")}
                className="rounded-2xl bg-white px-4 py-3 text-left text-xs font-bold text-slate-600 transition hover:bg-indigo-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-indigo-950/30"
              >
                Admin: admin@demo.com / demo123
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}