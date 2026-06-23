import { ArrowLeft, Bot, Lock, Save } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

      toast.success("Password reset successfully.");

      navigate("/login", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Bot size={32} />
          </div>

          <h1 className="text-3xl font-black">Reset Password</h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Create a new password for your NexusTalent.AI account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-black">
              New Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
              <Lock size={18} className="text-slate-400" />

              <input
                type="password"
                value={formData.password}
                onChange={(event) =>
                  updateField("password", event.target.value)
                }
                placeholder="Enter new password"
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
                placeholder="Confirm new password"
                className="w-full bg-transparent text-sm font-semibold outline-none"
              />
            </div>
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            <Save size={18} />
            {isSubmitting ? "Saving..." : "Reset Password"}
          </Button>
        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm font-black text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}