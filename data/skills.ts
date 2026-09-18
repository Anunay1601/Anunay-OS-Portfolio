export interface SkillItem {
  id: string;
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "AI / ML" | "3D / Motion" | "Databases / Cloud" | "Tools";
  description: string;
  relatedProjectIds: string[];
  relatedExperienceIds: string[];
}

export interface SkillCategoryGroup {
  category: "Languages" | "Frontend" | "Backend" | "AI / ML" | "3D / Motion" | "Databases / Cloud" | "Tools";
  description: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategoryGroup[] = [
  {
    category: "Languages",
    description: "Core programming languages for software engineering, web development, and AI algorithms",
    skills: [
      {
        id: "python",
        name: "Python",
        category: "Languages",
        description: "Primary AI/ML language utilized for Flask microservices, speech recognition engines, and data processing.",
        relatedProjectIds: ["atithi-vms", "atlas-voice-assistant"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "java",
        name: "Java",
        category: "Languages",
        description: "Object-oriented programming language for core backend concepts, data structures, and algorithms.",
        relatedProjectIds: [],
        relatedExperienceIds: [],
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "Languages",
        description: "Typed JavaScript extension powering full-stack web applications, n8n integrations, and React state stores.",
        relatedProjectIds: ["privacyshield-ai"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "javascript",
        name: "JavaScript (ES6+)",
        category: "Languages",
        description: "Core dynamic scripting language for DOM manipulation, Three.js WebGL graphics, and Express APIs.",
        relatedProjectIds: ["atithi-vms", "shriji-polymers-3d"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "html-css",
        name: "HTML5 / CSS3",
        category: "Languages",
        description: "Semantic markup, modern layout math, CSS grid/flexbox, and Apple glassmorphism styling.",
        relatedProjectIds: ["atithi-vms", "shriji-polymers-3d"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "cpp",
        name: "C / C++",
        category: "Languages",
        description: "Low-level system programming concepts, memory management, and algorithmic problem solving.",
        relatedProjectIds: [],
        relatedExperienceIds: [],
      },
    ],
  },
  {
    category: "Frontend",
    description: "Modern component-driven web frameworks and UI rendering tools",
    skills: [
      {
        id: "react",
        name: "React",
        category: "Frontend",
        description: "Component-based SPA library for responsive user interfaces, custom state hooks, and virtual DOM rendering.",
        relatedProjectIds: ["atithi-vms", "shriji-polymers-3d", "privacyshield-ai"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "nextjs",
        name: "Next.js 14",
        category: "Frontend",
        description: "Production React framework with App Router, server components, static site generation, and optimized image/font pipelines.",
        relatedProjectIds: [],
        relatedExperienceIds: [],
      },
      {
        id: "vite",
        name: "Vite",
        category: "Frontend",
        description: "Next-generation frontend tooling with instant HMR and Rollup production bundler.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "tailwind",
        name: "Tailwind CSS",
        category: "Frontend",
        description: "Utility-first CSS framework for rapid UI styling, dark mode tokens, custom typography, and responsive layouts.",
        relatedProjectIds: [],
        relatedExperienceIds: ["quantumard"],
      },
    ],
  },
  {
    category: "Backend",
    description: "Server runtime environments, REST APIs, and microservices",
    skills: [
      {
        id: "nodejs",
        name: "Node.js",
        category: "Backend",
        description: "Asynchronous event-driven JavaScript runtime for scalable network applications and REST endpoints.",
        relatedProjectIds: ["atithi-vms", "privacyshield-ai"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "express",
        name: "Express.js",
        category: "Backend",
        description: "Minimalist web framework for Node.js routing, authentication middleware, and CORS configuration.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "flask",
        name: "Python Flask",
        category: "Backend",
        description: "Lightweight WSGI web application framework hosting biometric AI microservices.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "rest-api",
        name: "REST APIs",
        category: "Backend",
        description: "Architectural style for designing networked applications, JSON response schemas, and HTTP endpoints.",
        relatedProjectIds: ["atithi-vms", "atlas-voice-assistant"],
        relatedExperienceIds: ["quantumard"],
      },
    ],
  },
  {
    category: "AI / ML",
    description: "Artificial intelligence models, workflow engines, speech synthesis, and biometric vision",
    skills: [
      {
        id: "openai-api",
        name: "OpenAI API",
        category: "AI / ML",
        description: "Generative AI model integrations for context parsing, text redaction, and intelligent agent workflows.",
        relatedProjectIds: ["privacyshield-ai"],
        relatedExperienceIds: ["servicenow-virtual"],
      },
      {
        id: "n8n",
        name: "n8n Workflow Engine",
        category: "AI / ML",
        description: "Fair-code workflow automation platform connecting LLM endpoints, file transformation pipelines, and webhooks.",
        relatedProjectIds: ["privacyshield-ai"],
        relatedExperienceIds: [],
      },
      {
        id: "speech-rec",
        name: "Speech Recognition & PyTTSx3",
        category: "AI / ML",
        description: "Voice-to-text audio signal parsing and offline voice synthesis engine.",
        relatedProjectIds: ["atlas-voice-assistant"],
        relatedExperienceIds: [],
      },
      {
        id: "face-rec",
        name: "Face Recognition Microservice",
        category: "AI / ML",
        description: "Python biometric image vector extraction and face match verification.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
    ],
  },
  {
    category: "3D / Motion",
    description: "WebGL canvas rendering, 3D asset scene management, and animation libraries",
    skills: [
      {
        id: "r3f",
        name: "React Three Fiber (R3F)",
        category: "3D / Motion",
        description: "React renderer for Three.js enabling declarative 3D scene creation, camera lighting, and shadow management.",
        relatedProjectIds: ["shriji-polymers-3d"],
        relatedExperienceIds: [],
      },
      {
        id: "threejs",
        name: "Three.js",
        category: "3D / Motion",
        description: "JavaScript 3D library utilizing WebGL shaders for real-time 360° product rendering.",
        relatedProjectIds: ["shriji-polymers-3d"],
        relatedExperienceIds: [],
      },
      {
        id: "gsap",
        name: "GSAP (GreenSock)",
        category: "3D / Motion",
        description: "High-performance animation engine for scroll-triggered camera control and timeline sequences.",
        relatedProjectIds: ["shriji-polymers-3d"],
        relatedExperienceIds: [],
      },
      {
        id: "framer-motion",
        name: "Framer Motion",
        category: "3D / Motion",
        description: "Production-ready motion library for React spring physics, layout animations, and gesture interactions.",
        relatedProjectIds: ["shriji-polymers-3d"],
        relatedExperienceIds: [],
      },
    ],
  },
  {
    category: "Databases / Cloud",
    description: "Document databases, media stores, serverless deployments, and cloud clusters",
    skills: [
      {
        id: "mongodb-atlas",
        name: "MongoDB Atlas",
        category: "Databases / Cloud",
        description: "Fully managed cloud NoSQL database cluster supporting JSON document models and soft-delete schemas.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "cloudinary",
        name: "Cloudinary",
        category: "Databases / Cloud",
        description: "Cloud image and video storage platform featuring automated optimization and dynamic URL generation.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "vercel",
        name: "Vercel",
        category: "Databases / Cloud",
        description: "Serverless frontend cloud platform for instant global CDN deployment and CI/CD pipelines.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "render",
        name: "Render",
        category: "Databases / Cloud",
        description: "Unified cloud platform hosting Node.js and Python background services with automated SSL.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
    ],
  },
  {
    category: "Tools",
    description: "Version control, API testing tools, and developer environments",
    skills: [
      {
        id: "git-github",
        name: "Git & GitHub",
        category: "Tools",
        description: "Distributed version control system for branch management, pull requests, and collaborative codebases.",
        relatedProjectIds: ["atithi-vms", "shriji-polymers-3d", "privacyshield-ai", "atlas-voice-assistant"],
        relatedExperienceIds: ["datatrack", "quantumard"],
      },
      {
        id: "postman",
        name: "Postman",
        category: "Tools",
        description: "API platform for building, testing, and documenting REST endpoints.",
        relatedProjectIds: ["atithi-vms"],
        relatedExperienceIds: ["quantumard"],
      },
      {
        id: "vscode",
        name: "VS Code",
        category: "Tools",
        description: "Extensible code editor configured with TypeScript, ESLint, Prettier, and debugging tools.",
        relatedProjectIds: [],
        relatedExperienceIds: ["datatrack", "quantumard"],
      },
    ],
  },
];
