import {
  Activity,
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  FileSearch,
  FileText,
  LayoutDashboard,
  Mail,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wand2,
} from "lucide-react";

import { ROUTES } from "../../utils/routePaths";

export const adminNav = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        path: ROUTES.admin.dashboard,
        icon: LayoutDashboard,
      },
      {
        label: "Manage Users",
        path: ROUTES.admin.users,
        icon: Users,
      },
      {
        label: "Manage Candidates",
        path: ROUTES.admin.candidates,
        icon: UserCog,
      },
      {
        label: "Manage Employers",
        path: ROUTES.admin.employers,
        icon: ShieldCheck,
      },
    ],
  },
  {
    section: "Recruitment",
    items: [
      {
        label: "Manage Job Postings",
        path: ROUTES.admin.jobs,
        icon: Briefcase,
      },
      {
        label: "Manage Skills",
        path: ROUTES.admin.skills,
        icon: Sparkles,
      },
      {
        label: "Resume Extraction",
        path: ROUTES.admin.resumeExtractionReview,
        icon: FileSearch,
      },
    ],
  },
  {
    section: "AI Management",
    items: [
      {
        label: "AI Models",
        path: ROUTES.admin.aiModels,
        icon: Bot,
      },
      {
        label: "Model Evaluation",
        path: ROUTES.admin.modelEvaluation,
        icon: Activity,
      },
      {
        label: "Chatbot Knowledge",
        path: ROUTES.admin.chatbotKnowledge,
        icon: Wand2,
      },
      {
        label: "Email Templates",
        path: ROUTES.admin.emailTemplates,
        icon: Mail,
      },
    ],
  },
  {
    section: "System",
    items: [
      {
        label: "Notifications",
        path: ROUTES.admin.notifications,
        icon: Bell,
      },
      {
        label: "Reports",
        path: ROUTES.admin.reports,
        icon: BarChart3,
      },
      {
        label: "Audit Logs",
        path: ROUTES.admin.auditLogs,
        icon: FileText,
      },
      {
        label: "System Settings",
        path: ROUTES.admin.settings,
        icon: Settings,
      },
    ],
  },
];

