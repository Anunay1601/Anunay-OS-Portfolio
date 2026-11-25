import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";
import { timelineData } from "@/data/timeline";

export function getVerifiedPortfolioContext(): string {
  const profileSection = `
DEVELOPER PROFILE:
- Name: ${profileData.name}
- Role: ${profileData.role}
- Tagline: ${profileData.tagline}
- Summary: ${profileData.summary}
- Location: ${profileData.location}
- Email: ${profileData.email}
- Phone: +91 ${profileData.phone}
- University: ${profileData.university} (${profileData.degree})
- GitHub Profile: ${profileData.github}
- LinkedIn Profile: ${profileData.linkedin}
`;

  const projectsSection = `
VERIFIED PROJECTS (${projectsData.length}):
${projectsData
  .map(
    (p, i) => `
${i + 1}. ${p.title} (${p.subtitle})
   - Category: ${p.category}
   - Status: ${p.status}
   - Description: ${p.description}
   - Overview: ${p.overview}
   - Problem Addressed: ${p.problem}
   - Solution Implemented: ${p.solution}
   - Technologies Used: ${p.technologies.join(", ")}
   - Architecture Nodes: ${p.architecture.join("; ")}
   - Key Features: ${p.features.join("; ")}
   - Repository: ${p.githubUrl || "N/A"}
   - Deployment Info: ${p.deployment || "N/A"}
`
  )
  .join("")}
`;

  const skillsSection = `
VERIFIED SKILL MATRIX:
${skillsData
  .map(
    (g) => `
- Category "${g.category}": ${g.description}
  Skills: ${g.skills.map((s) => `${s.name} (${s.description})`).join("; ")}
`
  )
  .join("")}
`;

  const experienceSection = `
VERIFIED WORK EXPERIENCE & INTERNSHIPS:
${experienceData
  .map(
    (e, i) => `
${i + 1}. ${e.role} at ${e.company} (${e.period})
   - Location: ${e.location}
   - Type: ${e.type}
   - Highlights: ${e.bullets.join("; ")}
   - Technologies Used: ${e.technologies.join(", ")}
`
  )
  .join("")}
`;

  const educationSection = `
VERIFIED EDUCATION:
${educationData
  .map(
    (ed) => `
- ${ed.institution} (${ed.period}): ${ed.degree} in ${ed.field}. Highlights: ${ed.details?.join("; ")}
`
  )
  .join("")}
`;

  const certsSection = `
VERIFIED CERTIFICATIONS & CREDENTIALS (${certificationsData.length}):
${certificationsData
  .map((c) => `- ${c.title} issued by ${c.issuer} (${c.date}) [Category: ${c.category}]`)
  .join("\n")}
`;

  const timelineSection = `
VERIFIED TIMELINE MILESTONES:
${timelineData
  .map((t) => `- [${t.timestamp}] ${t.title} (${t.subtitle}): ${t.description}`)
  .join("\n")}
`;

  return `
You are ANUNAY AI, an intelligent, professional, and helpful portfolio assistant for Anunay Chhapre.

STRICT GROUNDING & DATA SAFETY RULES:
1. You MUST answer user questions strictly using ONLY the verified portfolio data provided below.
2. DO NOT hallucinate, assume, or invent any achievements, companies, projects, dates, grades, statistics, or technologies not present in the data below.
3. If the user asks for information NOT present in the portfolio data below (such as unlisted projects, non-existent work experience, personal hobbies not mentioned, or unrelated general knowledge), clearly state: "That information is not available in Anunay's verified portfolio."
4. Be concise, polite, professional, and formatted cleanly in markdown.

==================== VERIFIED PORTFOLIO DATA ====================
${profileSection}
${projectsSection}
${skillsSection}
${experienceSection}
${educationSection}
${certsSection}
${timelineSection}
=================================================================
`.trim();
}
