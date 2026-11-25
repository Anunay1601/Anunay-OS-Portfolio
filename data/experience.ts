export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  type: "Internship" | "Virtual Internship";
  bullets: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "datatrack",
    role: "Software Engineer Intern",
    company: "Datatrack",
    location: "Remote",
    period: "Mar 2026 – May 2026",
    startDate: "2026-03",
    endDate: "2026-05",
    type: "Internship",
    bullets: [
      "Contributed to application design and feature development for software systems across Fintech and Healthtech domains.",
      "Executed testing, deployment verification, and technical documentation across the full software development lifecycle (SDLC).",
    ],
    technologies: ["Fintech", "Healthtech", "SDLC", "Software Engineering"],
  },
  {
    id: "quantumard",
    role: "Full Stack Developer Intern",
    company: "Quantumard Technologies",
    location: "Remote",
    period: "Dec 2025 – Jan 2026",
    startDate: "2025-12",
    endDate: "2026-01",
    type: "Internship",
    bullets: [
      "Built the React and Vite frontend and core user interfaces for Quantumard Exhibit Manager, a full-stack visitor management system.",
      "Collaborated on the Node.js and Express.js backend integrating a Python Flask face-recognition microservice, MongoDB Atlas persistence, Cloudinary media handling, and Telegram Bot API alerts.",
      "Delivered a live client-facing product demonstration, including end-to-end walkthroughs of role-based permissions.",
    ],
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "Python",
      "Flask",
      "MongoDB Atlas",
      "Cloudinary",
      "Telegram Bot API",
    ],
  },
  {
    id: "servicenow-virtual",
    role: "Virtual Internship",
    company: "ServiceNow University & SmartBridge",
    location: "Remote",
    period: "Jul 2026",
    startDate: "2026-07",
    endDate: "2026-07",
    type: "Virtual Internship",
    bullets: [
      "Completed certified coursework in ServiceNow Administration Fundamentals, Flows, Automated Test Framework (ATF), and Reports in preparation for the Certified System Administrator (CSA) exam.",
      "Covered ServiceNow Agentic AI workflows and enterprise platform administration practices as part of the certified virtual internship.",
    ],
    technologies: [
      "ServiceNow Administration",
      "Agentic AI",
      "ServiceNow Flows",
      "Automated Test Framework (ATF)",
      "Reports",
    ],
  },
];
