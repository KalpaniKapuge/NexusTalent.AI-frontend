import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-5 dark:bg-slate-950">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
          <SearchX size={42} />
        </div>

        <p className="text-sm font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-300">
          404 Error
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
          The page you are trying to open does not exist or may have been moved
          to another location.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link to="/">
            <Button fullWidth>
              <Home size={18} />
              Go Home
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="secondary" fullWidth>
              <ArrowLeft size={18} />
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}