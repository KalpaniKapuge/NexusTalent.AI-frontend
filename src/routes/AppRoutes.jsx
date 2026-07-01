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
import RecommendedJobs from "../pages/candidate/jobs/RecommendedJobs";
import SavedJobs from "../pages/candidate/jobs/SavedJobs";
import MyApplications from "../pages/candidate/applications/MyApplications";
import SkillGapAnalysis from "../pages/candidate/skill-gap/SkillGapAnalysis";
import FeedbackHistory from "../pages/candidate/feedback/FeedbackHistory";
import InterviewInvitations from "../pages/candidate/interviews/InterviewInvitations";
import CandidateNotifications from "../pages/candidate/notifications/CandidateNotifications";
import CandidateSettings from "../pages/candidate/settings/CandidateSettings";

import EmployerDashboard from "../pages/employer/dashboard/EmployerDashboard";
import CompanyProfile from "../pages/employer/company/CompanyProfile";
import PostJob from "../pages/employer/jobs/PostJob";
import AIJobDescription from "../pages/employer/jobs/AIJobDescription";
import ManageJobs from "../pages/employer/jobs/ManageJobs";
import EmployerJobDetail from "../pages/employer/jobs/EmployerJobDetail";
import JobApplications from "../pages/employer/applications/JobApplications";
import CandidateDetail from "../pages/employer/applications/CandidateDetail";
import CandidateRanking from "../pages/employer/applications/CandidateRanking";
import CandidateComparison from "../pages/employer/applications/CandidateComparison";
import EmployerInterviews from "../pages/employer/interviews/EmployerInterviews";
import InterviewDetail from "../pages/employer/interviews/InterviewDetail";
import ScheduleInterview from "../pages/employer/interviews/ScheduleInterview";
import EmployerFeedback from "../pages/employer/feedback/EmployerFeedback";
import EmployerReports from "../pages/employer/reports/EmployerReports";
import EmployerNotifications from "../pages/employer/notifications/EmployerNotifications";
import EmployerSettings from "../pages/employer/settings/EmployerSettings";

import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import ManageUsers from "../pages/admin/users/ManageUsers";
import ManageCandidates from "../pages/admin/users/ManageCandidates";
import ManageEmployers from "../pages/admin/employers/ManageEmployers";
import ManageJobPostings from "../pages/admin/jobs/ManageJobPostings";
import ManageSkills from "../pages/admin/skills/ManageSkills";
import AIModels from "../pages/admin/ai-models/AIModels";
import ModelEvaluation from "../pages/admin/ai-models/ModelEvaluation";
import ResumeExtractionReview from "../pages/admin/resume-review/ResumeExtractionReview";
import ChatbotKnowledge from "../pages/admin/chatbot/ChatbotKnowledgeBase";
import EmailTemplates from "../pages/admin/email/EmailTemplates";
import AdminNotifications from "../pages/admin/notifications/AdminNotifications";
import AdminReports from "../pages/admin/reports/AdminReports";
import AuditLogs from "../pages/admin/audit-logs/AuditLogs";
import SystemSettings from "../pages/admin/settings/SystemSettings";

import NotFoundPage from "../pages/errors/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleBasedRoute allowedRole="candidate" />}>
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route
              index
              element={<Navigate to="/candidate/dashboard" replace />}
            />

            <Route path="dashboard" element={<CandidateDashboard />} />
            <Route path="profile" element={<CandidateProfile />} />
            <Route path="resume-upload" element={<ResumeUpload />} />
            <Route path="resume-review" element={<ResumeReview />} />
            <Route path="jobs" element={<JobSearch />} />
            <Route path="recommended-jobs" element={<RecommendedJobs />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="jobs/:jobId" element={<JobDetail />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="skill-gap" element={<SkillGapAnalysis />} />
            <Route path="feedback" element={<FeedbackHistory />} />
            <Route path="interviews" element={<InterviewInvitations />} />
            <Route
              path="notifications"
              element={<CandidateNotifications />}
            />
            <Route path="settings" element={<CandidateSettings />} />
          </Route>
        </Route>

        <Route element={<RoleBasedRoute allowedRole="employer" />}>
          <Route path="/employer" element={<EmployerLayout />}>
            <Route
              index
              element={<Navigate to="/employer/dashboard" replace />}
            />

            <Route path="dashboard" element={<EmployerDashboard />} />
            <Route path="profile" element={<CompanyProfile />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="ai-job-description" element={<AIJobDescription />} />
            <Route path="jobs" element={<ManageJobs />} />
            <Route path="jobs/:jobId" element={<EmployerJobDetail />} />
            <Route
              path="jobs/:jobId/applications"
              element={<JobApplications />}
            />
            <Route path="applications" element={<JobApplications />} />
            <Route
              path="candidates/:candidateId"
              element={<CandidateDetail />}
            />
            <Route path="candidate-ranking" element={<CandidateRanking />} />
            <Route
              path="candidate-comparison"
              element={<CandidateComparison />}
            />
            <Route path="interviews" element={<EmployerInterviews />} />
            <Route path="interviews/schedule" element={<ScheduleInterview />} />
            <Route path="interviews/:interviewId" element={<InterviewDetail />} />
            <Route path="feedback" element={<EmployerFeedback />} />
            <Route path="reports" element={<EmployerReports />} />
            <Route
              path="notifications"
              element={<EmployerNotifications />}
            />
            <Route path="settings" element={<EmployerSettings />} />
          </Route>
        </Route>

        <Route element={<RoleBasedRoute allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<ManageUsers />} />
            <Route path="candidates" element={<ManageCandidates />} />
            <Route path="employers" element={<ManageEmployers />} />
            <Route path="jobs" element={<ManageJobPostings />} />
            <Route path="skills" element={<ManageSkills />} />
            <Route path="ai-models" element={<AIModels />} />
            <Route path="model-evaluation" element={<ModelEvaluation />} />
            <Route
              path="resume-extraction-review"
              element={<ResumeExtractionReview />}
            />
            <Route
              path="chatbot-knowledge"
              element={<ChatbotKnowledge />}
            />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route
              path="notifications"
              element={<AdminNotifications />}
            />
            <Route path="reports" element={<AdminReports />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
