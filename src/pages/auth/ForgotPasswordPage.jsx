import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await new Promise((resolve) => setTimeout(resolve, 600));

    setSent(true);
    toast.success("Password reset link sent.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-black/30">
        <Link to="/" className="text-2xl font-black">
          NexusTalent<span className="text-indigo-600">.AI</span>
        </Link>

        {!sent ? (
          <>
            <h1 className="mt-8 text-3xl font-black">Reset password</h1>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Enter your email and we will send a password reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
                <Mail size={18} className="text-slate-400" />

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm font-semibold outline-none"
                  required
                />
              </div>

              <button className="w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="mt-8">
            <h1 className="text-3xl font-black">Check your inbox</h1>

            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              We sent a password reset link to{" "}
              <span className="font-black text-slate-950 dark:text-white">
                {email}
              </span>
              .
            </p>
          </div>
        )}

        <Link
          to="/login"
          className="mt-8 inline-flex items-center gap-2 text-sm font-black text-indigo-600"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>
      </div>
    </div>
  );
}