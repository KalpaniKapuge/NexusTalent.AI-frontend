import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 text-center dark:bg-slate-950 dark:text-white">
      <div>
        <div className="text-8xl font-black text-indigo-600">404</div>

        <h1 className="mt-4 text-3xl font-black">Page not found</h1>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-black text-white"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}