import { Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Password reset successfully.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-black/30">
        <Link to="/" className="text-2xl font-black">
          NexusTalent<span className="text-orange-600">.AI</span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">Create new password</h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Choose a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
            <Lock size={18} className="text-slate-400" />

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New password"
              className="w-full bg-transparent text-sm font-semibold outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
            <Lock size={18} className="text-slate-400" />

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              className="w-full bg-transparent text-sm font-semibold outline-none"
              required
            />
          </div>

          <button className="w-full rounded-lg bg-orange-600 px-5 py-4 text-sm font-semibold text-white">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
