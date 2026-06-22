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
        active: true,
      },
      {
        label: "Manage Users",
        path: ROUTES.admin.users,
        icon: UserCog,
        active: true,
      },
      {
        label: "Manage Candidates",
        path: ROUTES.admin.candidates,
        icon: Users,
        active: true,
      },
      {
        label: "Manage Employers",
        path: ROUTES.admin.employers,
        icon: ShieldCheck,
        active: true,
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
        active: true,
      },
      {
        label: "Manage Skills",
        path: ROUTES.admin.skills,
        icon: Sparkles,
        active: true,
      },
      {
        label: "Resume Extraction",
        path: ROUTES.admin.resumeExtractionReview,
        icon: FileSearch,
        active: true,
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
        active: true,
      },
      {
        label: "Model Evaluation",
        path: ROUTES.admin.modelEvaluation,
        icon: Activity,
        active: true,
      },
      {
        label: "Chatbot Knowledge",
        path: ROUTES.admin.chatbotKnowledge,
        icon: Wand2,
        active: true,
      },
      {
        label: "Email Templates",
        path: ROUTES.admin.emailTemplates,
        icon: Mail,
        active: true,
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
        active: true,
      },
      {
        label: "Reports",
        path: ROUTES.admin.reports,
        icon: BarChart3,
        active: true,
      },
      {
        label: "Audit Logs",
        path: ROUTES.admin.auditLogs,
        icon: FileText,
        active: true,
      },
      {
        label: "System Settings",
        path: ROUTES.admin.settings,
        icon: Settings,
        active: true,
      },
    ],
  },
];

