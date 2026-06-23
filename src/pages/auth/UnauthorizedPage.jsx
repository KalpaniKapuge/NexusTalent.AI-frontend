import { ArrowLeft, Home, LogIn, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/common/Button";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5 dark:bg-slate-950">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
          <ShieldAlert size={42} />
        </div>

        <h1 className="text-3xl font-black text-slate-950 dark:text-white">
          Unauthorized Access
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
          You do not have permission to access this dashboard. Please login with
          the correct account role to continue.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link to="/login">
            <Button fullWidth>
              <LogIn size={18} />
              Login Again
            </Button>
          </Link>

          <Link to="/">
            <Button variant="secondary" fullWidth>
              <Home size={18} />
              Go Home
            </Button>
          </Link>
        </div>

        <Link
          to="/login"
          className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-black text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </div>
    </div>
  );
}