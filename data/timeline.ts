export interface TimelineEntry {
  id: string;
  timestamp: string;
  title: string;
  subtitle: string;
  category: "EDUCATION" | "DEPLOYMENT" | "CERTIFICATION" | "MILESTONE";
  description: string;
  tags: string[];
}

export const timelineData: TimelineEntry[] = [
  {
    id: "log-001",
    timestamp: "2026-07",
    title: "ServiceNow Virtual Internship Completed",
    subtitle: "ServiceNow University & SmartBridge",
    category: "CERTIFICATION",
    description: "Completed ServiceNow Administration Fundamentals, Agentic AI, Flows, ATF, and Reports.",
    tags: ["ServiceNow", "Agentic AI", "ATF", "Virtual Internship"],
  },
  {
    id: "log-002",
    timestamp: "2026-03 – 2026-05",
    title: "Software Engineer Intern at Datatrack",
    subtitle: "Datatrack (Remote)",
    category: "DEPLOYMENT",
    description: "Worked on Fintech and Healthtech software systems across full SDLC.",
    tags: ["Fintech", "Healthtech", "SDLC", "Full-Stack"],
  },
  {
    id: "log-004",
    timestamp: "2025-12 – 2026-01",
    title: "Full Stack Developer Intern at Quantumard",
    subtitle: "Quantumard Technologies",
    category: "DEPLOYMENT",
    description: "Built Quantumard Exhibit Manager UI using React, Node.js, Flask, MongoDB, and Telegram Bot API.",
    tags: ["React", "Flask", "MongoDB", "Telegram Bot API"],
  },
  {
    id: "log-005",
    timestamp: "2025-12",
    title: "Applied ML in Python Certification",
    subtitle: "Univ. of Michigan",
    category: "CERTIFICATION",
    description: "Completed machine learning and data science specialization.",
    tags: ["Python", "Machine Learning", "Data Science"],
  },
  {
    id: "log-006",
    timestamp: "2025-11",
    title: "Programming with Generative AI Certification",
    subtitle: "NPTEL",
    category: "CERTIFICATION",
    description: "Completed NPTEL certification in Generative AI architectures.",
    tags: ["Generative AI", "NPTEL", "LLMs"],
  },
  {
    id: "log-007",
    timestamp: "2024-08",
    title: "B.Tech CSE (AI & ML) Enrolled",
    subtitle: "VIT Bhopal University",
    category: "EDUCATION",
    description: "Commenced undergraduate studies in Computer Science Engineering (AI & ML) maintaining 8.51 CGPA.",
    tags: ["VIT Bhopal", "B.Tech", "AI & ML", "8.51 CGPA"],
  },
];
