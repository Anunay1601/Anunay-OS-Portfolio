import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Anunay Chhapre — ANUNAY OS Portfolio",
    short_name: "ANUNAY OS",
    description: "Interactive Developer Portfolio & Workstation for Anunay Chhapre",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0C10",
    theme_color: "#0A84FF",
    icons: [
      {
        src: "/anunay-os-logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
