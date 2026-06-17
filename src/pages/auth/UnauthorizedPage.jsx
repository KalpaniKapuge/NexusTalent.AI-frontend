import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-center dark:bg-slate-950 dark:text-white">
      <div className="max-w-md">
        <div className="text-7xl font-black text-indigo-600">403</div>

        <h1 className="mt-4 text-3xl font-black">Access denied</h1>

        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
          You do not have permission to access this page.
        </p>

        <Link
          to="/login"
          className="mt-8 inline-flex rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-black text-white"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}