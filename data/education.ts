export interface EducationItem {
  id: string;
  institution: string;
  location: string;
  degree: string;
  field: string;
  period: string;
  grade: string;
  details?: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "vit-bhopal",
    institution: "VIT Bhopal University",
    location: "Bhopal, MP",
    degree: "B.Tech",
    field: "Computer Science and Engineering (AI & ML)",
    period: "2024 – 2028",
    grade: "CGPA: 8.49 / 10",
    details: [
      "Specialization in Artificial Intelligence and Machine Learning",
      "Active focus on full-stack web applications, AI automation, and cloud deployments",
    ],
  },
  {
    id: "takshshila-academy",
    institution: "Takshshila Academy",
    location: "Harda, MP",
    degree: "Higher Secondary (Class XII)",
    field: "Science / Mathematics",
    period: "2023 – 2024",
    grade: "77.4%",
    details: [
      "Completed Higher Secondary Education with focus on Mathematics and Physics",
    ],
  },
];
