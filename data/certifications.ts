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
    id: "michigan-applied-ml",
    title: "Applied ML in Python",
    issuer: "Univ. of Michigan",
    date: "Dec 2025",
    category: "AI & ML",
  },
  {
    id: "matlab-certified",
    title: "MATLAB Certified",
    issuer: "MathWorks / MATLAB",
    date: "Aug 2024",
    category: "Engineering",
  },
];
