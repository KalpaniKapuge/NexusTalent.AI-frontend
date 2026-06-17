import {
  BarChart3,
  Bell,
  Bot,
  Briefcase,
  FileText,
  History,
  LayoutDashboard,
  Mail,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import { ROUTES } from "../../utils/routePaths";

export const adminNav = [
  {
    section: "Management",
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
        icon: Users,
        active: false,
      },
      {
        label: "Manage Candidates",
        path: ROUTES.admin.candidates,
        icon: Users,
        active: false,
      },
      {
        label: "Manage Employers",
        path: ROUTES.admin.employers,
        icon: ShieldCheck,
        active: false,
      },
      {
        label: "Job Postings",
        path: ROUTES.admin.jobs,
        icon: Briefcase,
        active: false,
      },
    ],
  },
  {
    section: "AI & Research",
    items: [
      {
        label: "Skill Ontology",
        path: ROUTES.admin.skills,
        icon: SlidersHorizontal,
        active: false,
      },
      {
        label: "AI Models",
        path: ROUTES.admin.aiModels,
        icon: Bot,
        active: false,
      },
      {
        label: "Model Evaluation",
        path: ROUTES.admin.modelEvaluation,
        icon: BarChart3,
        active: false,
      },
      {
        label: "Resume Extraction Review",
        path: ROUTES.admin.resumeExtractionReview,
        icon: FileText,
        active: false,
      },
      {
        label: "Chatbot Knowledge",
        path: ROUTES.admin.chatbotKnowledge,
        icon: Bot,
        active: false,
      },
    ],
  },
  {
    section: "System",
    items: [
      {
        label: "Email Templates",
        path: ROUTES.admin.emailTemplates,
        icon: Mail,
        active: false,
      },
      {
        label: "Notifications",
        path: ROUTES.admin.notifications,
        icon: Bell,
        active: false,
      },
      {
        label: "Reports & Analytics",
        path: ROUTES.admin.reports,
        icon: BarChart3,
        active: false,
      },
      {
        label: "Audit Logs",
        path: ROUTES.admin.auditLogs,
        icon: History,
        active: false,
      },
      {
        label: "System Settings",
        path: ROUTES.admin.settings,
        icon: Settings,
        active: false,
      },
    ],
  },
];