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
    title: "AI Job Description Generator",
    description: "Create professional and bias-aware job descriptions.",
    icon: Zap,
  },
  {
    title: "Intelligent CV Screening",
    description: "Rank candidates using skills, experience, and AI matching.",
    icon: Search,
  },
  {
    title: "Skill Gap Analysis",
    description: "Show candidates what skills they need to improve.",
    icon: TrendingUp,
  },
  {
    title: "Personalized Feedback",
    description: "Generate helpful feedback for rejected candidates.",
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
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/30">
              <Bot size={22} />
            </div>

            <div className="text-xl font-black tracking-tight">
              NexusTalent<span className="text-indigo-600">.AI</span>
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
        <div className="absolute left-1/2 top-24 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-black text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
            <Sparkles size={16} />
            AI-Powered Recruitment Automation System
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-black tracking-tight sm:text-7xl">
            Hire smarter. Grow faster.{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
              Get hired with AI.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            NexusTalent.AI automates job description creation, CV ranking,
            candidate matching, skill gap analysis, personalized feedback, and
            chatbot support.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register?role=candidate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 px-7 py-4 text-sm font-black text-white shadow-2xl shadow-indigo-500/30 transition hover:-translate-y-1"
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
              Smart matching
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Transparent feedback
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              Skill gap analysis
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600">
              Features
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Complete AI recruitment workflow
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70 transition hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white">
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
              "Candidate uploads CV and confirms extracted profile.",
              "Employer posts AI-generated job description.",
              "AI ranks candidates and generates feedback.",
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
            NexusTalent<span className="text-indigo-600">.AI</span>
          </div>

          <div>© 2026 NexusTalent.AI. Final Year Research Project.</div>
        </div>
      </footer>
    </div>
  );
}