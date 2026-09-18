# ANUNAY OS — Apple-Inspired Interactive Developer Portfolio

ANUNAY OS is an interactive operating-system-inspired developer environment presenting **Anunay Chhapre**'s software, AI, and automation engineering portfolio.

Built around the core principle: **"Simple at first glance. Deep when explored."**

---

## 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router) & React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS & CSS Variables (Midnight Minimal dark mode & clean light mode)
- **Icons & UI Primitives**: Lucide Icons, Radix UI primitives
- **Motion & Physics**: Framer Motion & GSAP
- **3D Graphics**: React Three Fiber (R3F) & Three.js (lazy-loaded with 2D fallbacks)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation
```bash
# Clone or open directory
cd anunay-os

# Dependencies are already installed! If needed, run:
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore the portfolio.

---

## 📁 Data Architecture

All personal data, projects, experience, skills, and certifications are stored strictly in structured TypeScript files inside `/data`:

- `data/profile.ts`: Bio, roles, contact information, social links
- `data/projects.ts`: Atithi VMS, PrivacyShield AI, Shriji Polymers 3D, Atlas Voice Assistant
- `data/skills.ts`: Categorized technical skill matrix
- `data/experience.ts`: Datatrack, Quantumard Technologies, ServiceNow Virtual Internship
- `data/education.ts`: VIT Bhopal University (B.Tech CSE AI&ML, 8.51 CGPA), Takshshila Academy
- `data/certifications.ts`: ServiceNow, NPTEL, Vityarthi, Michigan, MATLAB credentials
- `data/timeline.ts`: Unified system log timeline entries

---

## 🏗️ Build & Production
```bash
# Build production bundle
npm run build

# Start production server
npm run start
```
