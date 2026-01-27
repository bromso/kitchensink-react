import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Symbiora - Brand Compliance Platform",
    short_name: "Symbiora",
    description: "AI-powered brand compliance and asset management platform",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0A0A0A",
    icons: [
      { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
