import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";
import { educationData } from "@/data/education";
import { certificationsData } from "@/data/certifications";

export function generatePortfolioFallbackResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // 0. Explicit Out-of-Scope Detection (Public figures, general knowledge, trivia, unrelated entities)
  const outOfScopeKeywords = [
    "modi",
    "pm modi",
    "narendra modi",
    "prime minister",
    "president",
    "biden",
    "trump",
    "musk",
    "elon",
    "cricket",
    "football",
    "weather",
    "capital of",
    "recipe",
    "movie",
    "song",
    "actor",
    "bitcoin",
    "crypto",
  ];

  if (outOfScopeKeywords.some((kw) => q.includes(kw))) {
    return `Information unavailable. ANUNAY AI can only provide verified information regarding Anunay Chhapre's portfolio, software systems, skills, internships, and education background.`;
  }

  // Check for "who is" queries that are NOT asking about Anunay
  if (q.includes("who is") || q.includes("who's") || q.includes("what is")) {
    const isAboutAnunay =
      q.includes("anunay") ||
      q.includes("chhapre") ||
      q.includes("he") ||
      q.includes("you") ||
      q.includes("developer") ||
      q.includes("creator") ||
      q.includes("engineer") ||
      q.includes("author") ||
      q.includes("portfolio");

    if (!isAboutAnunay) {
      return `Information unavailable. ANUNAY AI can only provide verified information regarding Anunay Chhapre's portfolio, software systems, skills, internships, and education background.`;
    }
  }

  // 1. Projects Query
  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("build") ||
    q.includes("system") ||
    q.includes("app") ||
    q.includes("work")
  ) {
    if (q.includes("ai") || q.includes("ml") || q.includes("machine learning") || q.includes("llm")) {
      const aiProjects = projectsData.filter(
        (p) =>
          p.category === "AI" ||
          p.category === "Automation" ||
          p.technologies.some((t) => t.toLowerCase().includes("ai") || t.toLowerCase().includes("openai") || t.toLowerCase().includes("flask"))
      );
      return `### Verified AI & Machine Learning Systems

Anunay has engineered several high-impact AI and automation platforms:

${aiProjects
  .map(
    (p) =>
      `* **${p.title}** (${p.subtitle})
  * **Tech**: ${p.technologies.join(", ")}
  * **Overview**: ${p.overview}
  ${p.githubUrl ? `* **Repository**: [${p.githubUrl}](${p.githubUrl})` : ""}`
  )
  .join("\n\n")}

*Note: All projects are verified in Anunay's portfolio.*`;
    }

    return `### Verified Software Projects (${projectsData.length} Total Systems)

Here are the software systems built by Anunay Chhapre:

${projectsData
  .map(
    (p) =>
      `* **${p.title}** — *${p.subtitle}* [${p.status}]
  * **Category**: ${p.category}
  * **Tech**: ${p.technologies.join(", ")}
  * **Description**: ${p.description}
  ${p.githubUrl ? `* **GitHub**: [${p.githubUrl}](${p.githubUrl})` : ""}`
  )
  .join("\n\n")}

You can explore these live in the **Project Lab** OS module or portfolio projects section.`;
  }

  // 2. Tech / Technologies / Stack Query
  if (
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("language") ||
    q.includes("framework") ||
    q.includes("skill") ||
    q.includes("tool")
  ) {
    const allSkills = skillsData.map((g) => `**${g.category}**: ${g.skills.map((s) => s.name).join(", ")}`).join("\n");
    return `### Verified Technical Stack

Anunay's technical toolkit covers full-stack development, AI microservices, and automation:

${allSkills}

* **Core Highlights**: Java, Python 3, TypeScript, React 18, Next.js, Node.js/Express, Flask, MongoDB Atlas, n8n, Cloudinary, Telegram Bot API, and WebGL/R3F.`;
  }

  // 3. Internship / Work Experience Query
  if (
    q.includes("internship") ||
    q.includes("intern") ||
    q.includes("experience") ||
    q.includes("company") ||
    q.includes("job") ||
    q.includes("workplace")
  ) {
    return `### Verified Workplace Experience & Internships

Anunay has completed multiple software engineering deployments:

${experienceData
  .map(
    (e) =>
      `* **${e.role}** @ **${e.company}** (${e.period})
  * **Domain & Stack**: ${e.technologies.join(", ")}
  * **Impact**: ${e.bullets.join(" ")}`
  )
  .join("\n\n")}`;
  }

  // 4. Currently Learning / Focus Query
  if (
    q.includes("learning") ||
    q.includes("current") ||
    q.includes("focus") ||
    q.includes("study") ||
    q.includes("studying") ||
    q.includes("now")
  ) {
    return `### Current Academic & Technical Focus

* **Degree & Field**: B.Tech in Computer Science Engineering (AI & ML) at **VIT Bhopal University** (2024–2028, **CGPA: 8.51 / 10**).
* **Current Focus Areas**: Generative AI architectures, Agentic AI, n8n visual automation pipelines, cloud deployments (Render/Vercel), and high-performance WebGL 3D interfaces.
* **Recent Certifications**: ServiceNow Virtual Internship (Jul 2026), Applied ML in Python (Univ. of Michigan), and NPTEL Programming with Generative AI.`;
  }

  // 5. Education / University / CGPA Query
  if (
    q.includes("education") ||
    q.includes("university") ||
    q.includes("college") ||
    q.includes("degree") ||
    q.includes("cgpa") ||
    q.includes("grade") ||
    q.includes("bhopal")
  ) {
    return `### Verified Academic Credentials

${educationData
  .map(
    (ed) =>
      `* **${ed.institution}** (${ed.period})
  * **Degree**: ${ed.degree} in ${ed.field}
  * **Grade**: ${ed.grade}
  ${ed.details ? `* **Highlights**: ${ed.details.join("; ")}` : ""}`
  )
  .join("\n\n")}`;
  }

  // 6. Certifications Query
  if (q.includes("certif") || q.includes("credential") || q.includes("course") || q.includes("nptel")) {
    return `### Verified Certification Vault (${certificationsData.length} Credentials)

${certificationsData
  .map((c) => `* **${c.title}** — ${c.issuer} (${c.date}) [${c.category}]`)
  .join("\n")}`;
  }

  // 7. General Profile / Contact Query (Strictly for Anunay)
  if (
    q.includes("anunay") ||
    q.includes("about") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("github") ||
    q.includes("linkedin") ||
    q.includes("who is he") ||
    q.includes("who are you")
  ) {
    return `### ${profileData.name} — ${profileData.role}

* **Tagline**: ${profileData.tagline}
* **Summary**: ${profileData.summary}
* **Location**: ${profileData.location}
* **Email**: [${profileData.email}](mailto:${profileData.email})
* **GitHub**: [${profileData.github}](${profileData.github})
* **LinkedIn**: [${profileData.linkedin}](${profileData.linkedin})
* **University**: ${profileData.university} (**CGPA: ${profileData.cgpa}**)`;
  }

  // 8. Fallback for unlisted/out-of-scope information
  return `Information unavailable. ANUNAY AI can only provide verified information regarding Anunay Chhapre's portfolio, software systems, skills, internships, and education background.

You can ask me questions such as:
* *"What projects has Anunay built?"*
* *"What technologies does he use?"*
* *"Show me his AI projects."*
* *"What internships has he completed?"*
* *"What is Anunay currently learning?"*`;
}
