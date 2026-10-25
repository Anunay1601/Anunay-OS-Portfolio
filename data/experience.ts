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
      "Worked on real-world software projects across Fintech and Healthtech domains, contributing across the full SDLC — design, development, testing, deployment, and documentation.",
    ],
    technologies: ["Fintech", "Healthtech", "SDLC", "Software Engineering"],
  },
  {
    id: "quantumard",
    role: "Full Stack Developer Intern",
    company: "Quantumard Technologies",
    location: "On-site / Hybrid",
    period: "Dec 2025 – Jan 2026",
    startDate: "2025-12",
    endDate: "2026-01",
    type: "Internship",
    bullets: [
      "Built the frontend and core UI for Quantumard Exhibit Manager, a full-stack visitor management system, using React and Vite.",
      "Collaborated on a Node.js/Express backend integrated with a Python/Flask face-recognition microservice, MongoDB Atlas, Cloudinary, and Telegram Bot API.",
      "Delivered a client-facing product demo, including role-based permission walkthroughs.",
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
      "Completed a certified virtual internship covering ServiceNow Administration Fundamentals, Agentic AI, Flows, Automated Test Framework (ATF), and Reports, in preparation for the Certified System Administrator (CSA) exam.",
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
