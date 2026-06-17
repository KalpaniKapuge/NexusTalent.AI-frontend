export const candidateProfile = {
  name: "Kalpani Kapuge",
  title: "Software Engineering Undergraduate",
  email: "candidate@demo.com",
  phone: "+94 77 123 4567",
  location: "Colombo, Sri Lanka",
  citizenship: "Sri Lankan",
  bio: "Motivated software engineering undergraduate with experience in React, Node.js, SQL, and AI-based application development.",
  profileCompletion: 78,
  linkedin: "linkedin.com/in/kalpani-kapuge",
  github: "github.com/kalpani",
  portfolio: "kalpani.dev",
  skills: [
    { name: "React", level: "Advanced", score: 85 },
    { name: "JavaScript", level: "Advanced", score: 88 },
    { name: "Node.js", level: "Intermediate", score: 72 },
    { name: "SQL", level: "Intermediate", score: 68 },
    { name: "Python", level: "Beginner", score: 45 },
    { name: "AWS", level: "Beginner", score: 40 },
  ],
  experience: [
    {
      role: "Frontend Developer Intern",
      company: "TechNova Solutions",
      period: "2025 - 2026",
      description:
        "Worked on React dashboards, reusable UI components, and API integration.",
    },
    {
      role: "Final Year Research Developer",
      company: "NSBM Green University",
      period: "2026",
      description:
        "Developing an intelligent recruitment automation system using AI and NLP.",
    },
  ],
  education: [
    {
      degree: "BSc Software Engineering",
      institution: "NSBM Green University",
      period: "2023 - 2026",
    },
  ],
  certifications: [
    {
      name: "React Frontend Development",
      provider: "Online Certification",
      year: "2025",
    },
    {
      name: "Database Design Fundamentals",
      provider: "Academic Module",
      year: "2025",
    },
  ],
};

export const jobs = [
  {
    id: 1,
    title: "Junior React Developer",
    company: "TechCorp Lanka",
    location: "Colombo, Sri Lanka",
    type: "Full-time",
    mode: "Hybrid",
    salary: "LKR 120,000 - 180,000",
    posted: "2 days ago",
    applicants: 34,
    matchScore: 86,
    industry: "Software / IT",
    description:
      "We are looking for a Junior React Developer to build modern web applications using React, JavaScript, REST APIs, and reusable component design.",
    responsibilities: [
      "Develop responsive React interfaces",
      "Integrate REST APIs",
      "Build reusable UI components",
      "Collaborate with backend developers",
    ],
    requiredSkills: ["React", "JavaScript", "REST API", "Git", "CSS"],
    matchedSkills: ["React", "JavaScript", "Git"],
    missingSkills: ["REST API testing", "Advanced CSS architecture"],
  },
  {
    id: 2,
    title: "Full Stack Developer Intern",
    company: "CloudNova Solutions",
    location: "Remote",
    type: "Internship",
    mode: "Remote",
    salary: "LKR 60,000 - 90,000",
    posted: "5 days ago",
    applicants: 18,
    matchScore: 74,
    industry: "Cloud / Infrastructure",
    description:
      "Join our product engineering team and work with React, Node.js, SQL databases, and cloud deployment workflows.",
    responsibilities: [
      "Support frontend and backend development",
      "Write clean API integration code",
      "Assist with database design",
      "Fix bugs and improve performance",
    ],
    requiredSkills: ["React", "Node.js", "SQL", "Docker", "AWS"],
    matchedSkills: ["React", "Node.js", "SQL"],
    missingSkills: ["Docker", "AWS"],
  },
  {
    id: 3,
    title: "AI Application Developer",
    company: "DataMind AI",
    location: "Kandy, Sri Lanka",
    type: "Full-time",
    mode: "On-site",
    salary: "LKR 180,000 - 250,000",
    posted: "1 week ago",
    applicants: 49,
    matchScore: 62,
    industry: "AI / ML",
    description:
      "Build AI-enabled business applications using Python APIs, frontend dashboards, and model integration.",
    responsibilities: [
      "Integrate AI service APIs",
      "Build dashboards",
      "Work with model outputs",
      "Document AI workflows",
    ],
    requiredSkills: ["Python", "FastAPI", "React", "Machine Learning", "SQL"],
    matchedSkills: ["React", "SQL"],
    missingSkills: ["FastAPI", "Machine Learning", "Advanced Python"],
  },
];

export const applications = [
  {
    id: 1,
    jobTitle: "Junior React Developer",
    company: "TechCorp Lanka",
    status: "Shortlisted",
    appliedDate: "2026-06-10",
    matchScore: 86,
    feedbackAvailable: false,
  },
  {
    id: 2,
    jobTitle: "Full Stack Developer Intern",
    company: "CloudNova Solutions",
    status: "Under Review",
    appliedDate: "2026-06-12",
    matchScore: 74,
    feedbackAvailable: false,
  },
  {
    id: 3,
    jobTitle: "AI Application Developer",
    company: "DataMind AI",
    status: "Rejected",
    appliedDate: "2026-06-01",
    matchScore: 62,
    feedbackAvailable: true,
    feedback:
      "You have good frontend and SQL knowledge, but this role required stronger Python, FastAPI, and machine learning project experience.",
  },
];

export const notifications = [
  {
    id: 1,
    title: "New job match found",
    message: "Junior React Developer matches 86% with your profile.",
    type: "match",
    read: false,
    time: "10 minutes ago",
  },
  {
    id: 2,
    title: "Application shortlisted",
    message: "TechCorp Lanka shortlisted your application.",
    type: "application",
    read: false,
    time: "2 hours ago",
  },
  {
    id: 3,
    title: "Feedback available",
    message: "Feedback is available for AI Application Developer.",
    type: "feedback",
    read: true,
    time: "1 day ago",
  },
];

export const skillGapItems = [
  {
    skill: "React",
    candidate: 85,
    required: 90,
    priority: "Low",
    recommendation: "Improve advanced component patterns and performance.",
  },
  {
    skill: "Node.js",
    candidate: 72,
    required: 80,
    priority: "Medium",
    recommendation: "Practice API development and authentication flows.",
  },
  {
    skill: "AWS",
    candidate: 40,
    required: 75,
    priority: "High",
    recommendation: "Learn cloud basics, deployment, and storage services.",
  },
  {
    skill: "Docker",
    candidate: 35,
    required: 70,
    priority: "High",
    recommendation: "Practice containerizing frontend and backend projects.",
  },
];

export const extractedResumeData = {
  fileName: "Kalpani_Kapuge_CV.pdf",
  status: "Extraction Completed",
  confidence: 89,
  extractedSkills: ["React", "JavaScript", "Node.js", "SQL", "Git", "Python"],
  extractedEducation: ["BSc Software Engineering - NSBM Green University"],
  extractedExperience: [
    "Frontend Developer Intern - TechNova Solutions",
    "Final Year Research Developer - NSBM Green University",
  ],
  extractedCertifications: [
    "React Frontend Development",
    "Database Design Fundamentals",
  ],
};