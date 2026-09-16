import type { Metadata } from "next";
import { HomeContent, homeMetadata } from "@/components/home/home-content";
import { pagePath } from "@/lib/seo";

/** Same content as /ar/ — the canonical tag points search engines there. */
export const metadata: Metadata = homeMetadata("ar", pagePath("ar"));

export default function EntryPage() {
  return <HomeContent locale="ar" />;
}
