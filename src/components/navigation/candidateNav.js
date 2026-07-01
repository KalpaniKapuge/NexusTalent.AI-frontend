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
        active: true,
      },
      {
        label: "Recommended Jobs",
        path: ROUTES.candidate.recommendedJobs,
        icon: Briefcase,
        active: true,
      },
      {
        label: "Saved Jobs",
        path: ROUTES.candidate.savedJobs,
        icon: Bookmark,
        active: true,
      },
      {
        label: "My Applications",
        path: ROUTES.candidate.applications,
        icon: FileText,
        active: true,
      },
      {
        label: "Skill Gap Analysis",
        path: ROUTES.candidate.skillGap,
        icon: TrendingUp,
        active: true,
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
        active: true,
      },
      {
        label: "Resume Upload",
        path: ROUTES.candidate.resumeUpload,
        icon: UploadCloud,
        active: true,
      },
      {
        label: "Resume Review",
        path: ROUTES.candidate.resumeReview,
        icon: FileText,
        active: true,
      },
      {
        label: "Feedback",
        path: ROUTES.candidate.feedback,
        icon: MessageSquare,
        active: true,
      },
      {
        label: "Interviews",
        path: ROUTES.candidate.interviews,
        icon: CalendarCheck,
        active: true,
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
        active: true,
      },
      {
        label: "Settings",
        path: ROUTES.candidate.settings,
        icon: Settings,
        active: true,
      },
    ],
  },
];
