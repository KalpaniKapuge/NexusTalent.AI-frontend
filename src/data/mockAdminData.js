export const adminStats = {
  totalUsers: 1284,
  totalCandidates: 970,
  totalEmployers: 214,
  totalJobPosts: 186,
  activeJobs: 73,
  pendingReviews: 18,
  aiModels: 4,
  monthlyApplications: 2450,
};

export const adminUsers = [
  {
    id: 1,
    name: "Kalpani Kapuge",
    email: "candidate@demo.com",
    role: "Candidate",
    status: "Active",
    joinedDate: "2026-06-01",
    lastLogin: "2026-06-18",
  },
  {
    id: 2,
    name: "TechCorp Lanka",
    email: "employer@demo.com",
    role: "Employer",
    status: "Active",
    joinedDate: "2026-05-22",
    lastLogin: "2026-06-18",
  },
  {
    id: 3,
    name: "System Administrator",
    email: "admin@demo.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2026-04-10",
    lastLogin: "2026-06-18",
  },
  {
    id: 4,
    name: "Nimasha Silva",
    email: "nimasha@example.com",
    role: "Candidate",
    status: "Suspended",
    joinedDate: "2026-05-15",
    lastLogin: "2026-06-12",
  },
  {
    id: 5,
    name: "CloudNet Solutions",
    email: "hr@cloudnet.lk",
    role: "Employer",
    status: "Pending",
    joinedDate: "2026-06-15",
    lastLogin: "Not logged in",
  },
];

export const adminJobPosts = [
  {
    id: 1,
    title: "Junior React Developer",
    company: "TechCorp Lanka",
    status: "Active",
    applications: 34,
    postedDate: "2026-06-10",
    expiryDate: "2026-07-10",
    aiScore: 92,
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "TechCorp Lanka",
    status: "Draft",
    applications: 12,
    postedDate: "2026-06-14",
    expiryDate: "2026-07-20",
    aiScore: 78,
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "CloudNet Solutions",
    status: "Pending Review",
    applications: 0,
    postedDate: "2026-06-18",
    expiryDate: "2026-07-18",
    aiScore: 68,
  },
  {
    id: 4,
    title: "AI Application Developer",
    company: "TechCorp Lanka",
    status: "Closed",
    applications: 49,
    postedDate: "2026-05-20",
    expiryDate: "2026-06-20",
    aiScore: 84,
  },
];

export const adminSkills = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    demandLevel: "High",
    usageCount: 420,
    status: "Active",
  },
  {
    id: 2,
    name: "ASP.NET Core",
    category: "Backend",
    demandLevel: "High",
    usageCount: 310,
    status: "Active",
  },
  {
    id: 3,
    name: "SQL Server",
    category: "Database",
    demandLevel: "Medium",
    usageCount: 260,
    status: "Active",
  },
  {
    id: 4,
    name: "Machine Learning",
    category: "AI",
    demandLevel: "High",
    usageCount: 180,
    status: "Active",
  },
];

export const adminAIModels = [
  {
    id: 1,
    name: "Resume Parser Model",
    type: "NLP",
    version: "v1.2.0",
    accuracy: 91,
    status: "Active",
    lastTrained: "2026-06-10",
  },
  {
    id: 2,
    name: "Candidate Ranking Model",
    type: "Ranking",
    version: "v1.5.1",
    accuracy: 88,
    status: "Active",
    lastTrained: "2026-06-12",
  },
  {
    id: 3,
    name: "Skill Gap Analyzer",
    type: "Recommendation",
    version: "v1.1.4",
    accuracy: 84,
    status: "Active",
    lastTrained: "2026-06-05",
  },
  {
    id: 4,
    name: "Chatbot Intent Model",
    type: "Conversational AI",
    version: "v0.9.8",
    accuracy: 79,
    status: "Testing",
    lastTrained: "2026-06-16",
  },
];

export const resumeExtractionReviews = [
  {
    id: 1,
    candidateName: "Kalpani Kapuge",
    fileName: "kalpani_resume.pdf",
    extractedSkills: ["React", "JavaScript", "SQL", "Git"],
    confidence: 94,
    status: "Approved",
    reviewedBy: "Admin",
  },
  {
    id: 2,
    candidateName: "Dilshan Perera",
    fileName: "dilshan_cv.pdf",
    extractedSkills: ["React", "CSS", "JavaScript"],
    confidence: 86,
    status: "Pending",
    reviewedBy: "Not reviewed",
  },
  {
    id: 3,
    candidateName: "Nimasha Silva",
    fileName: "nimasha_resume.pdf",
    extractedSkills: ["HTML", "CSS", "SQL"],
    confidence: 72,
    status: "Needs Review",
    reviewedBy: "Not reviewed",
  },
];

export const chatbotKnowledgeItems = [
  {
    id: 1,
    question: "How can I upload my resume?",
    answer:
      "Candidates can upload resumes from the Resume Upload page in the candidate dashboard.",
    status: "Active",
    updatedDate: "2026-06-12",
  },
  {
    id: 2,
    question: "How are candidates ranked?",
    answer:
      "Candidates are ranked using skill match, experience, education, certifications, and semantic similarity.",
    status: "Active",
    updatedDate: "2026-06-14",
  },
  {
    id: 3,
    question: "Can employers generate job descriptions?",
    answer:
      "Employers can use the AI Job Description Generator from the employer portal.",
    status: "Active",
    updatedDate: "2026-06-16",
  },
];

export const emailTemplates = [
  {
    id: 1,
    name: "Application Received",
    subject: "Your application has been received",
    type: "Candidate",
    status: "Active",
  },
  {
    id: 2,
    name: "Shortlisted Candidate",
    subject: "You have been shortlisted",
    type: "Candidate",
    status: "Active",
  },
  {
    id: 3,
    name: "Rejected Candidate Feedback",
    subject: "Application feedback",
    type: "Candidate",
    status: "Active",
  },
  {
    id: 4,
    name: "Employer Verification",
    subject: "Employer account verification status",
    type: "Employer",
    status: "Draft",
  },
];

export const auditLogs = [
  {
    id: 1,
    action: "User login",
    user: "admin@demo.com",
    role: "Admin",
    date: "2026-06-18",
    time: "09:15 AM",
    status: "Success",
  },
  {
    id: 2,
    action: "Job post approved",
    user: "admin@demo.com",
    role: "Admin",
    date: "2026-06-18",
    time: "10:40 AM",
    status: "Success",
  },
  {
    id: 3,
    action: "Resume extraction reviewed",
    user: "admin@demo.com",
    role: "Admin",
    date: "2026-06-17",
    time: "03:20 PM",
    status: "Success",
  },
  {
    id: 4,
    action: "Failed login attempt",
    user: "unknown@example.com",
    role: "Unknown",
    date: "2026-06-17",
    time: "07:10 PM",
    status: "Failed",
  },
];

export const adminNotifications = [
  {
    id: 1,
    title: "New employer pending verification",
    message: "CloudNet Solutions is waiting for admin verification.",
    type: "Employer",
    read: false,
    time: "20 minutes ago",
  },
  {
    id: 2,
    title: "Resume extraction needs review",
    message: "Nimasha Silva resume extraction confidence is low.",
    type: "AI Review",
    read: false,
    time: "1 hour ago",
  },
  {
    id: 3,
    title: "AI model training completed",
    message: "Candidate Ranking Model training completed successfully.",
    type: "AI Model",
    read: true,
    time: "1 day ago",
  },
];

export const adminReportData = [
  {
    month: "Jan",
    users: 160,
    jobs: 25,
    applications: 420,
  },
  {
    month: "Feb",
    users: 230,
    jobs: 38,
    applications: 560,
  },
  {
    month: "Mar",
    users: 310,
    jobs: 52,
    applications: 760,
  },
  {
    month: "Apr",
    users: 420,
    jobs: 69,
    applications: 980,
  },
  {
    month: "May",
    users: 510,
    jobs: 83,
    applications: 1240,
  },
  {
    month: "Jun",
    users: 620,
    jobs: 101,
    applications: 1450,
  },
];

