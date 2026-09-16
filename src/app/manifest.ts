import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const base = site.basePath;

  return {
    name: "M Drive — Mena Drive Academy",
    short_name: "M Drive",
    description: "تعليم السواقة في القاهرة — M Drive Driving School in Cairo, Egypt.",
    lang: "ar",
    dir: "rtl",
    start_url: `${base}/`,
    scope: `${base}/`,
    display: "standalone",
    background_color: "#08080a",
    theme_color: "#08080a",
    icons: [
      { src: `${base}/icon.svg`, sizes: "any", type: "image/svg+xml" },
      { src: `${base}/brand/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${base}/brand/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
  };
}
