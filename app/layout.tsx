import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShell } from "@/components/layout/AppShell";
import { profileData } from "@/data/profile";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://anunay-os.vercel.app"),
  title: {
    default: "Anunay Chhapre — Software Developer & AI Systems Engineer",
    template: "%s | Anunay Chhapre",
  },
  description:
    "Official portfolio and interactive OS workstation of Anunay Chhapre. Full-stack developer (React, Next.js, Node.js, Python, Java) specializing in AI/ML systems and production software engineering.",
  keywords: [
    "Anunay Chhapre",
    "ANUNAY OS",
    "Software Engineer",
    "Full Stack Developer",
    "AI Systems Engineer",
    "Machine Learning Engineer",
    "VIT Bhopal",
    "React Developer",
    "Next.js Portfolio",
    "Interactive OS",
    "PrivacyShield AI",
    "Atithi VMS",
  ],
  authors: [{ name: profileData.name, url: profileData.github }],
  creator: profileData.name,
  publisher: profileData.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anunay-os.vercel.app",
    siteName: "ANUNAY OS Portfolio",
    title: "Anunay Chhapre — Software Developer & AI Systems Engineer",
    description:
      "Interactive Apple visionOS-inspired workstation and production portfolio featuring verified software systems, AI pipelines, and engineering credentials.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Anunay Chhapre — ANUNAY OS Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anunay Chhapre — Software Developer & AI Systems Engineer",
    description:
      "Interactive visionOS-inspired workstation and portfolio featuring verified software systems, AI pipelines, and credentials.",
    images: ["/logo.jpg"],
    creator: "@AnunayChhapre",
  },
  icons: {
    icon: [
      { url: "/anunay-os-logo-v2.png", type: "image/png" },
    ],
    apple: [{ url: "/anunay-os-logo-v2.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark"
    >
      <head>
        <link rel="icon" href="/anunay-os-logo-v2.png" type="image/png" />
        <link rel="apple-touch-icon" href="/anunay-os-logo-v2.png" />
      </head>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
