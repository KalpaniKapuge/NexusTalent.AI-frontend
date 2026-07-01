import {
  ArrowRight,
  Bot,
  Briefcase,
  CheckCircle2,
  MessageSquare,
  Moon,
  Search,
  Sparkles,
  Sun,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

const features = [
  {
    title: "Company-wise Employer Workspaces",
    description:
      "Each company manages its own jobs, applicants, interviews, and reports.",
    icon: Briefcase,
  },
  {
    title: "AI Job Description Generator",
    description:
      "Create professional, role-specific job descriptions for each company.",
    icon: Zap,
  },
  {
    title: "Intelligent CV Screening",
    description:
      "Rank applicants per job using skills, experience, and AI matching.",
    icon: Search,
  },
  {
    title: "Skill Gap Analysis",
    description:
      "Help candidates compare their profile against job requirements.",
    icon: TrendingUp,
  },
  {
    title: "Personalized Feedback",
    description:
      "Generate useful feedback for candidates after recruitment decisions.",
    icon: MessageSquare,
  },
];

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-slate-950 dark:bg-slate-950 dark:text-white">
      {/* Navbar */}
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/80 px-5 py-4 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
              <Bot size={22} />
            </div>

            <div className="text-xl font-black tracking-tight">
              NexusTalent<span className="text-orange-600">.AI</span>
            </div>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-bold text-slate-600 dark:text-slate-300 md:flex">
            <a href="#features" className="hover:text-indigo-600">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600">
              How It Works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-2xl border border-slate-200 p-2.5 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link
              to="/login"
              className="hidden rounded-2xl px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900 sm:block"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-black text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950 dark:shadow-black/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-36">
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-orange-300">
            <Sparkles size={16} />
            Company-wise SaaS Recruitment Automation Platform
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight sm:text-7xl">
            NexusTalent.AI{" "}
            <span className="text-orange-600">
              connects companies and candidates.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            A web-based recruitment platform with Candidate, Employer, and
            Admin portals. Employers represent individual companies and manage
            their own job postings, applications, AI rankings, interviews,
            feedback, and reports.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register?role=candidate"
              className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-700"
            >
              Start as Candidate <ArrowRight size={18} />
            </Link>

            <Link
              to="/register?role=employer"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-950 shadow-xl shadow-slate-200/70 transition hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:shadow-black/30"
            >
              <Briefcase size={18} />
              Start as Employer
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Company-wise workspaces
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Multi-portal architecture
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              AI-assisted recruitment
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase text-orange-600">
              Features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Complete SaaS-style recruitment workflow
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600 text-white">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-black">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="bg-slate-50 px-5 py-20 dark:bg-slate-900/40"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black tracking-tight">
              How NexusTalent.AI Works
            </h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              A simple workflow for candidates, employers, and admins.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Candidate creates a profile, uploads a resume, and applies for jobs.",
              "Each company manages its own job postings and applicants.",
              "Admin manages users, companies, jobs, AI models, and reports.",
            ].map((text, index) => (
              <div
                key={text}
                className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-slate-900"
              >
                <div className="mb-4 text-5xl font-black text-indigo-100 dark:text-indigo-950">
                  0{index + 1}
                </div>

                <p className="text-lg font-black leading-8">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-5 py-8 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400 md:flex-row">
          <div className="font-black text-slate-950 dark:text-white">
            NexusTalent<span className="text-orange-600">.AI</span>
          </div>

          <div>© 2026 NexusTalent.AI. Final Year Research Project.</div>
        </div>
      </footer>
    </div>
  );
}
