import {
  Bell,
  Bookmark,
  Briefcase,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
  UploadCloud,
  User,
} from "lucide-react";

import { ROUTES } from "../../utils/routePaths";

export const candidateNav = [
  {
    section: "Main",
    items: [
      {
        label: "Dashboard",
        path: ROUTES.candidate.dashboard,
        icon: LayoutDashboard,
        active: true,
      },
      {
        label: "Browse Jobs",
        path: ROUTES.candidate.jobs,
        icon: Search,
        active: false,
      },
      {
        label: "Recommended Jobs",
        path: ROUTES.candidate.recommendedJobs,
        icon: Briefcase,
        active: false,
      },
      {
        label: "Saved Jobs",
        path: ROUTES.candidate.savedJobs,
        icon: Bookmark,
        active: false,
      },
      {
        label: "My Applications",
        path: ROUTES.candidate.applications,
        icon: FileText,
        active: false,
      },
      {
        label: "Skill Gap Analysis",
        path: ROUTES.candidate.skillGap,
        icon: TrendingUp,
        active: false,
      },
    ],
  },
  {
    section: "Profile & Career",
    items: [
      {
        label: "My Profile",
        path: ROUTES.candidate.profile,
        icon: User,
        active: false,
      },
      {
        label: "Resume Upload",
        path: ROUTES.candidate.resumeUpload,
        icon: UploadCloud,
        active: false,
      },
      {
        label: "Feedback",
        path: ROUTES.candidate.feedback,
        icon: MessageSquare,
        active: false,
      },
      {
        label: "Interviews",
        path: ROUTES.candidate.interviews,
        icon: CalendarCheck,
        active: false,
      },
    ],
  },
  {
    section: "Account",
    items: [
      {
        label: "Notifications",
        path: ROUTES.candidate.notifications,
        icon: Bell,
        active: false,
      },
      {
        label: "Settings",
        path: ROUTES.candidate.settings,
        icon: Settings,
        active: false,
      },
    ],
  },
];