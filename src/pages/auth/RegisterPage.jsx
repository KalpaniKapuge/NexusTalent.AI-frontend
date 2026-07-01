import {
  Bot,
  Building2,
  Lock,
  Mail,
  User,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function getDashboardPath(role) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "employer") return "/employer/dashboard";

  return "/candidate/dashboard";
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, updateUser } = useAuth();
  const requestedRole = searchParams.get("role");
  const initialRole = ["candidate", "employer", "admin"].includes(requestedRole)
    ? requestedRole
    : "candidate";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: initialRole,
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

    if (!formData.fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const loggedUser = login(
        formData.email,
        formData.password,
        formData.role
      );

      updateUser({
        name: formData.fullName,
        companyName:
          formData.role === "employer" ? formData.fullName : undefined,
        tenantSlug:
          formData.role === "employer"
            ? formData.fullName.trim().toLowerCase().replaceAll(" ", "-")
            : undefined,
        avatar: formData.fullName.slice(0, 2).toUpperCase(),
      });

      toast.success(`Account created for ${formData.fullName}`);

      navigate(getDashboardPath(loggedUser.role), { replace: true });
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600">
            <Bot size={26} />
          </div>

          <div>
            <h1 className="text-xl font-black">NexusTalent.AI</h1>
            <p className="text-sm font-bold text-slate-400">
              Company-wise Recruitment SaaS
            </p>
          </div>
        </div>

        <div>
          <h2 className="max-w-xl text-4xl font-black leading-tight">
            Create your workspace in a company-wise recruitment platform.
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-slate-300">
            Candidates manage profiles and applications. Companies manage their
            own recruitment pipelines. Admins control the full SaaS platform.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            "Candidate, employer, and admin portals",
            "Company-wise employer workspaces",
            "AI ranking, skill gaps, feedback, and reports",
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-white/10 p-4 font-bold">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-slate-50 p-5 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
              <UserPlus size={32} />
            </div>

            <h1 className="text-3xl font-black">Create Account</h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Register as a candidate, company employer, or platform admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-black">
                {formData.role === "employer"
                  ? "Company Name"
                  : "Full Name"}
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                {formData.role === "employer" ? (
                  <Building2 size={18} className="text-slate-400" />
                ) : (
                  <User size={18} className="text-slate-400" />
                )}

                <input
                  value={formData.fullName}
                  onChange={(event) =>
                    updateField("fullName", event.target.value)
                  }
                  placeholder="Enter name"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

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
                Account Role
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
                  placeholder="Create password"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black">
                Confirm Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <Lock size={18} className="text-slate-400" />

                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(event) =>
                    updateField("confirmPassword", event.target.value)
                  }
                  placeholder="Confirm password"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                />
              </div>
            </div>

            <Button type="submit" fullWidth disabled={isSubmitting}>
              <UserPlus size={18} />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
