import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AuthLayout from "../layouts/AuthLayout";
import CandidateLayout from "../layouts/CandidateLayout";
import EmployerLayout from "../layouts/EmployerLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";

import LandingPage from "../pages/public/LandingPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import UnauthorizedPage from "../pages/auth/UnauthorizedPage";

import CandidateDashboard from "../pages/candidate/dashboard/CandidateDashboard";
import CandidateProfile from "../pages/candidate/profile/CandidateProfile";
import ResumeUpload from "../pages/candidate/resume/ResumeUpload";
import ResumeReview from "../pages/candidate/resume/ResumeReview";
import JobSearch from "../pages/candidate/jobs/JobSearch";
import JobDetail from "../pages/candidate/jobs/JobDetail";
import MyApplications from "../pages/candidate/applications/MyApplications";
import SkillGapAnalysis from "../pages/candidate/skill-gap/SkillGapAnalysis";
import CandidateNotifications from "../pages/candidate/notifications/CandidateNotifications";
import CandidateSettings from "../pages/candidate/settings/CandidateSettings";

import EmployerDashboard from "../pages/employer/dashboard/EmployerDashboard";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";

import NotFoundPage from "../pages/errors/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Protected pages */}
      <Route element={<ProtectedRoute />}>
        {/* Candidate */}
        <Route element={<RoleBasedRoute allowedRole="candidate" />}>
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<Navigate to="/candidate/dashboard" replace />} />
            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="resume-upload" element={<ResumeUpload />} />
            <Route path="resume-review" element={<ResumeReview />} />
            <Route path="jobs" element={<JobSearch />} />
            <Route path="jobs/:jobId" element={<JobDetail />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="skill-gap" element={<SkillGapAnalysis />} />
            <Route path="notifications" element={<CandidateNotifications />} />
            <Route path="settings" element={<CandidateSettings />} />
          </Route>
        </Route>

        {/* Employer */}
        <Route element={<RoleBasedRoute allowedRole="employer" />}>
          <Route path="/employer" element={<EmployerLayout />}>
            <Route index element={<Navigate to="/employer/dashboard" replace />} />
            <Route path="dashboard" element={<EmployerDashboard />} />
          </Route>
        </Route>

        {/* Admin */}
        <Route element={<RoleBasedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}