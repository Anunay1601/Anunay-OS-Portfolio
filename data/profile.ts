export interface Profile {
  name: string;
  role: string;
  tagline: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  instagram: string; // "TODO" until provided
  university: string;
  degree: string;
  cgpa: string;
}

export const profileData: Profile = {
  name: "Anunay Chhapre",
  role: "CSE • AIML • SOFTWARE DEVELOPER",
  tagline: "Building intelligent systems and thoughtful digital experiences.",
  summary:
    "Computer Science (AI & ML) undergraduate at VIT Bhopal University with hands-on full-stack development experience using React, Node.js, Flask, and MongoDB. Completed software engineering internships, including contributing to a production visitor management system deployed on Vercel and Render. Proficient in Python, Java, and TypeScript, with a strong interest in AI/ML-driven products and clean, scalable UI design.",
  location: "Madhya Pradesh, India",
  email: "anunaychhapre@gmail.com",
  phone: "6263254075",
  github: "https://github.com/Anunay1601",
  linkedin: "https://www.linkedin.com/in/anunay-chhapre-3a3b7a331/",
  instagram: "TODO",
  university: "VIT Bhopal University",
  degree: "B.Tech in Computer Science Engineering (AI & ML)",
  cgpa: "8.49 / 10",
};
