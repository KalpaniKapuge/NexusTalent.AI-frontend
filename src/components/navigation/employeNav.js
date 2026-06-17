import {
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  MessageSquare,
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
        active: false,
      },
      {
        label: "AI Job Description",
        path: ROUTES.employer.aiJobDescription,
        icon: Sparkles,
        active: false,
      },
      {
        label: "Manage Jobs",
        path: ROUTES.employer.jobs,
        icon: Briefcase,
        active: false,
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
        active: false,
      },
      {
        label: "Candidate Ranking",
        path: ROUTES.employer.candidateRanking,
        icon: Users,
        active: false,
      },
      {
        label: "Candidate Comparison",
        path: ROUTES.employer.candidateComparison,
        icon: Users,
        active: false,
      },
      {
        label: "Interviews",
        path: ROUTES.employer.interviews,
        icon: CalendarCheck,
        active: false,
      },
      {
        label: "Feedback",
        path: ROUTES.employer.feedback,
        icon: MessageSquare,
        active: false,
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
        active: false,
      },
      {
        label: "Reports",
        path: ROUTES.employer.reports,
        icon: BarChart3,
        active: false,
      },
      {
        label: "Notifications",
        path: ROUTES.employer.notifications,
        icon: Bell,
        active: false,
      },
      {
        label: "Settings",
        path: ROUTES.employer.settings,
        icon: Settings,
        active: false,
      },
    ],
  },
];