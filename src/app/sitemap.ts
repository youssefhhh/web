import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import { hreflang, locales } from "@/i18n/config";

export const dynamic = "force-static";

const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.9, changeFrequency: "weekly" },
  ...courses.map((course) => ({ path: `/courses/${course.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  { path: "/locations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/book", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

/** Every localized page, with trailing slashes (matching the exported URLs) and hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (locale: string, path: string) => `${site.url}/${locale}${path}/`;

  return locales.flatMap((locale) =>
    pages.map(({ path, priority, changeFrequency }) => ({
      url: url(locale, path),
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((code) => [hreflang[code], url(code, path)])),
          "x-default": url("ar", path),
        },
      },
    })),
  );
}
