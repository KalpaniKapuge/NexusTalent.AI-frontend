import { Bot, BriefcaseBusiness, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import { useAuth } from "../../context/AuthContext";

const allowedTopics = [
  "job",
  "jobs",
  "candidate",
  "candidates",
  "employer",
  "admin",
  "recruit",
  "recruitment",
  "resume",
  "cv",
  "skill",
  "skills",
  "interview",
  "interviews",
  "application",
  "applications",
  "shortlist",
  "ranking",
  "match",
  "hiring",
  "career",
  "profile",
  "feedback",
  "notification",
  "talent",
  "vacancy",
  "description",
  "salary",
  "experience",
  "qualification",
  "training",
  "learning",
  "gap",
  "analytics",
  "report",
  "permission",
  "user",
  "role",
];

const starterPrompts = [
  "How can I improve my skill match?",
  "How do candidate rankings work?",
  "What should I prepare for interviews?",
];

function isRecruitmentQuestion(message) {
  const lowerMessage = message.toLowerCase();
  return allowedTopics.some((topic) => lowerMessage.includes(topic));
}

function getRoleIntro(role) {
  if (role === "candidate") {
    return "I can help with job search, resume quality, skill gaps, interview preparation, applications, and feedback in NexusTalent.AI.";
  }

  if (role === "employer") {
    return "I can help with job posting, candidate matching, shortlisting, interview scheduling, feedback, and hiring reports in NexusTalent.AI.";
  }

  if (role === "admin") {
    return "I can help with users, skills, job postings, AI model areas, resume extraction review, chatbot knowledge, reports, and platform settings.";
  }

  return "I can help with recruitment, candidates, employers, skills, resumes, interviews, and hiring workflows.";
}

function getRecruitmentAnswer(message, role) {
  const lowerMessage = message.toLowerCase();

  if (!isRecruitmentQuestion(message)) {
    return "I can only answer questions related to recruitment, jobs, candidates, employers, resumes, skills, interviews, hiring analytics, and NexusTalent.AI workflows.";
  }

  if (lowerMessage.includes("skill") || lowerMessage.includes("gap")) {
    return "Focus on the skills required by your target job, compare them with the candidate profile or resume, then prioritize missing high-demand skills first. In this system, the Skill Gap area is the best place to review gaps and plan improvements.";
  }

  if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
    return "A strong resume should clearly show role-relevant skills, recent experience, measurable achievements, education, certifications, and project evidence. Keep it aligned with the job description so parsing and matching can work better.";
  }

  if (lowerMessage.includes("interview")) {
    return "For interviews, review the job requirements, prepare examples for core skills, confirm the date and mode, and record feedback after the session. Employers can schedule and track interviews from the Interviews area.";
  }

  if (
    lowerMessage.includes("ranking") ||
    lowerMessage.includes("match") ||
    lowerMessage.includes("shortlist")
  ) {
    return "Candidate ranking is based on fit signals such as skills, experience, resume content, job requirements, and application data. Use it as decision support, then review the candidate profile before shortlisting.";
  }

  if (lowerMessage.includes("job description") || lowerMessage.includes("post")) {
    return "A good job post should include the role title, responsibilities, required skills, experience level, location or work mode, salary range if available, and clear application expectations.";
  }

  if (lowerMessage.includes("admin") || lowerMessage.includes("user") || lowerMessage.includes("role")) {
    return "Admins can manage users, employers, candidates, skills, job posts, reports, system settings, and AI-related review areas. Keep permissions role-based so candidates, employers, and admins only access their own workflows.";
  }

  return getRoleIntro(role);
}

export default function RecruitmentChatbot({ role }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      id: 1,
      sender: "bot",
      text: "Hi, I am Nexus Assistant. Ask me about recruitment, jobs, candidates, resumes, skills, interviews, or hiring workflows.",
    },
  ]);
  const nextId = useRef(2);

  const displayName = useMemo(
    () => user?.companyName || user?.name || role || "User",
    [role, user]
  );

  const sendMessage = (messageText = input) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) {
      return;
    }

    const userMessage = {
      id: nextId.current,
      sender: "user",
      text: trimmedMessage,
    };
    nextId.current += 1;

    const botMessage = {
      id: nextId.current,
      sender: "bot",
      text: getRecruitmentAnswer(trimmedMessage, role),
    };
    nextId.current += 1;

    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <section className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-200/70 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/30">
          <header className="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Bot size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-slate-950 dark:text-white">
                  Nexus Assistant
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Recruitment support for {displayName}
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close chatbot"
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-white dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <X size={17} />
            </button>
          </header>

          <div className="max-h-96 space-y-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[82%] rounded-lg px-3 py-2 text-sm leading-6 ${
                    message.sender === "user"
                      ? "bg-teal-600 text-white"
                      : "bg-slate-100 text-slate-700 dark:bg-zinc-900 dark:text-zinc-200"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-3 dark:border-zinc-800">
            <div className="mb-3 flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-teal-50 px-2.5 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 dark:bg-teal-950/30 dark:text-teal-300 dark:hover:bg-teal-950/50"
                >
                  <Sparkles size={12} />
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a recruitment question..."
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-600 dark:border-zinc-800 dark:bg-black dark:text-white"
              />
              <button
                type="submit"
                aria-label="Send chatbot message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                <Send size={17} />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-600 text-white shadow-lg shadow-teal-900/20 transition hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {!open && (
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 sm:flex">
          <BriefcaseBusiness size={14} className="text-teal-600" />
          Recruitment help
        </div>
      )}
    </div>
  );
}
