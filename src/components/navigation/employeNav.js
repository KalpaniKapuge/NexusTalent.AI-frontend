import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  PlusCircle,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import { ROUTES } from "../../utils/routePaths";

export const employerNav = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        path: ROUTES.employer.dashboard,
        icon: LayoutDashboard,
        active: true,
      },
      {
        label: "Post a Job",
        path: ROUTES.employer.postJob,
        icon: PlusCircle,
        active: true,
      },
      {
        label: "AI Job Description",
        path: ROUTES.employer.aiJobDescription,
        icon: Sparkles,
        active: true,
      },
      {
        label: "Manage Jobs",
        path: ROUTES.employer.jobs,
        icon: Briefcase,
        active: true,
      },
    ],
  },
  {
    section: "Recruitment",
    items: [
      {
        label: "Applications",
        path: ROUTES.employer.applications,
        icon: FileText,
        active: true,
      },
      {
        label: "Candidate Ranking",
        path: ROUTES.employer.candidateRanking,
        icon: Users,
        active: true,
      },
      {
        label: "Candidate Comparison",
        path: ROUTES.employer.candidateComparison,
        icon: Users,
        active: true,
      },
    ],
  },
  {
    section: "Company",
    items: [
      {
        label: "Company Profile",
        path: ROUTES.employer.profile,
        icon: Building2,
        active: true,
      },
      {
        label: "Reports",
        path: ROUTES.employer.reports,
        icon: BarChart3,
        active: true,
      },
      {
        label: "Notifications",
        path: ROUTES.employer.notifications,
        icon: Bell,
        active: true,
      },
      {
        label: "Settings",
        path: ROUTES.employer.settings,
        icon: Settings,
        active: true,
      },
    ],
  },
];