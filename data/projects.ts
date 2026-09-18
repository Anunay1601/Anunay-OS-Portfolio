export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  features: string[];
  status: "DEPLOYED" | "PRODUCTION READY" | "COMPLETED";
  systemRelationships: string[];
  deployment?: string;
  githubUrl?: string;
  liveUrl?: string;
  category: "Full Stack" | "AI" | "3D" | "Automation" | "Developer Tools";
}

export const projectsData: Project[] = [
  {
    id: "atithi-vms",
    title: "Atithi VMS",
    subtitle: "Visitor Management System",
    description:
      "Production-grade visitor management system with a React/Vite frontend, Node.js/Express backend, and a Python/Flask face-recognition microservice.",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express.js",
      "Flask",
      "Python",
      "MongoDB Atlas",
      "Cloudinary",
      "Telegram Bot API",
      "Vercel",
      "Render",
    ],
    overview:
      "Atithi VMS is a full-stack visitor management software system created to streamline guest check-ins, real-time host notifications, and biometric face recognition validation.",
    problem:
      "Traditional manual visitor logs in organizations suffer from slow verification times, security gaps, data retention privacy concerns, and lack of real-time notification alerts.",
    solution:
      "Developed an automated full-stack platform featuring instant Telegram bot alerts, automated cloud media storage, soft-delete subscription suspensions, and Python face-recognition microservices.",
    architecture: [
      "Frontend: React + Vite deployed on Vercel",
      "Core Backend: Node.js & Express REST APIs deployed on Render",
      "AI Microservice: Python Flask Face Recognition Engine",
      "Database & Media: MongoDB Atlas + Cloudinary",
      "Alert System: Telegram Bot API for real-time guest arrivals",
    ],
    features: [
      "Face-recognition microservice integration for automated verification",
      "Telegram Bot API real-time notification engine for host alerts",
      "Soft delete & subscription-based account suspension logic",
      "Aadhaar data masking for strict privacy compliance",
      "Multi-environment deployment on Vercel and Render resolving CORS & reverse-proxy trust issues",
    ],
    status: "DEPLOYED",
    systemRelationships: [
      "React Frontend (Vercel)",
      "Express REST API (Render)",
      "Python Flask AI Microservice",
      "MongoDB Atlas & Cloudinary",
    ],
    deployment: "Frontend hosted on Vercel. REST API engine hosted on Render. Media assets managed via Cloudinary, with MongoDB Atlas DB cluster.",
    githubUrl: "https://github.com/Anunay1601/visitor-management-system",
    category: "Full Stack",
  },
  {
    id: "privacyshield-ai",
    title: "PrivacyShield AI",
    subtitle: "Automated Sensitive Document Redaction",
    description:
      "Full-stack AI-powered document security application driven by an automated n8n workflow that detects and redacts sensitive information in PDF documents.",
    technologies: [
      "TypeScript",
      "n8n",
      "OpenAI API",
      "React",
      "PDF Engine",
      "Node.js",
    ],
    overview:
      "PrivacyShield AI automates the discovery, exposure scoring, and redaction of PII (Personally Identifiable Information) in complex PDF documents using an n8n workflow pipeline.",
    problem:
      "Manual document redaction is time-consuming, prone to human error, and dangerous when sharing sensitive legal or medical files publicly.",
    solution:
      "Automated document security using n8n visual flow orchestration integrated with OpenAI LLM analysis to calculate privacy risk exposure and mask sensitive tokens automatically.",
    architecture: [
      "Frontend: React + TypeScript dashboard",
      "Workflow Engine: n8n automated visual pipeline",
      "AI Engine: OpenAI API for contextual sensitive data identification",
      "Scoring Module: Automated privacy-risk score algorithm",
    ],
    features: [
      "Automated n8n workflow pipeline triggering document redaction upon file upload",
      "Sensitive token detection (PII, SSN, confidential text) powered by OpenAI API",
      "Automated privacy-risk exposure scoring & compliance reporting",
      "PDF text redaction and clean export pipeline",
    ],
    status: "PRODUCTION READY",
    systemRelationships: [
      "React UI Dashboard",
      "n8n Visual Automation Pipeline",
      "OpenAI Risk Analysis API",
      "Redacted PDF Export Engine",
    ],
    deployment: "Self-hosted n8n automation runner linked with serverless OpenAI API endpoints and React client UI.",
    githubUrl: "https://github.com/Anunay1601/privacy-shield-ai",
    category: "Automation",
  },
  {
    id: "shriji-polymers-3d",
    title: "Shriji Polymers 3D",
    subtitle: "Interactive 3D Product Showcase",
    description:
      "Interactive 3D product showcase built using React Three Fiber and Three.js, featuring GSAP/Framer Motion-driven camera and scroll animations.",
    technologies: [
      "React",
      "React Three Fiber",
      "Three.js",
      "GSAP",
      "Framer Motion",
      "JavaScript",
    ],
    overview:
      "A high-performance 3D web showcase delivering fluid 360° product inspection and dynamic camera transitions synchronized with user scroll.",
    problem:
      "Static 2D product catalogs fail to convey real product geometry, material texture, and interactive user engagement.",
    solution:
      "Constructed a 3D web experience utilizing WebGL rendering via React Three Fiber combined with GSAP scroll-triggered camera control.",
    architecture: [
      "3D Engine: Three.js canvas wrapped in React Three Fiber",
      "Motion Controller: GSAP ScrollTrigger + Framer Motion spring physics",
      "Asset Pipeline: Compressed GLTF/GLB models with custom procedural shaders",
    ],
    features: [
      "Interactive 360-degree model manipulation & lighting control",
      "Scroll-driven camera animations engineered with GSAP",
      "Responsive WebGL viewport with smooth frame rendering",
      "Graceful fallback for low-power and non-WebGL devices",
    ],
    status: "DEPLOYED",
    systemRelationships: [
      "React App Canvas",
      "React Three Fiber (R3F)",
      "GSAP ScrollTrigger Engine",
      "WebGL Render Pipeline",
    ],
    deployment: "Optimized static SPA deployment featuring compressed GLTF 3D assets.",
    githubUrl: "https://github.com/Anunay1601/shriji-polymers-3D",
    category: "3D",
  },
  {
    id: "atlas-voice-assistant",
    title: "Atlas Voice Assistant",
    subtitle: "AI Voice Automation Assistant",
    description:
      "AI-powered voice automation assistant executing everyday tasks using natural language commands, speech recognition, and API integrations.",
    technologies: [
      "Python",
      "Speech Recognition",
      "PyTTSx3",
      "REST APIs",
      "OS Automation",
    ],
    overview:
      "Atlas Voice Assistant acts as a localized natural language command layer, converting vocal user input into system actions, web searches, and software automation.",
    problem:
      "Repetitive daily workstation operations (launching apps, querying APIs, taking notes) take unnecessary manual keystrokes.",
    solution:
      "Built a lightweight Python-based voice engine capable of processing audio speech signals and dispatching natural language intent commands.",
    architecture: [
      "Speech Engine: Python SpeechRecognition module + Google Speech API",
      "TTS Output: PyTTSx3 offline voice feedback engine",
      "Dispatch Engine: Python OS module + Custom API integration hooks",
    ],
    features: [
      "Real-time audio speech-to-text conversion & intent parsing",
      "System automation (application launching, file operations, web queries)",
      "API integrations for live weather, system metrics, and search queries",
    ],
    status: "COMPLETED",
    systemRelationships: [
      "Microphone Audio Capture",
      "Speech Recognition Parser",
      "Python Intent Dispatcher",
      "OS Automation Hooks & APIs",
    ],
    deployment: "Local Python workstation daemon with offline PyTTSx3 synthesis.",
    githubUrl: "https://github.com/Anunay1601/atlas-voice-assistant",
    category: "AI",
  },
];

