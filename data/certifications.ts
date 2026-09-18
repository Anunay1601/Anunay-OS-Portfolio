export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  category: "AI & ML" | "Cloud & Infra" | "Programming" | "Virtual Internship" | "Engineering";
}

export const certificationsData: Certification[] = [
  {
    id: "servicenow-vi",
    title: "ServiceNow Virtual Internship",
    issuer: "ServiceNow University / SmartBridge",
    date: "Jul 2026",
    category: "Virtual Internship",
  },
  {
    id: "nptel-genai",
    title: "Programming with Generative AI",
    issuer: "NPTEL",
    date: "Nov 2025",
    category: "AI & ML",
  },
  {
    id: "nptel-cloud",
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "2026",
    category: "Cloud & Infra",
  },
  {
    id: "vityarthi-java",
    title: "Programming in Java",
    issuer: "Vityarthi",
    date: "Mar 2026",
    category: "Programming",
  },
  {
    id: "vityarthi-linux",
    title: "Open Source Software (Linux)",
    issuer: "Vityarthi",
    date: "Mar 2026",
    category: "Cloud & Infra",
  },
  {
    id: "michigan-applied-ml",
    title: "Applied ML in Python",
    issuer: "Univ. of Michigan",
    date: "Dec 2025",
    category: "AI & ML",
  },
  {
    id: "vityarthi-python",
    title: "Python Essentials",
    issuer: "Vityarthi",
    date: "Apr 2025",
    category: "Programming",
  },
  {
    id: "matlab-certified",
    title: "MATLAB Certified",
    issuer: "MathWorks / MATLAB",
    date: "Aug 2024",
    category: "Engineering",
  },
  {
    id: "vityarthi-aiml",
    title: "Fundamentals of AI/ML",
    issuer: "Vityarthi",
    date: "Dec 2024",
    category: "AI & ML",
  },
];
