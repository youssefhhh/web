import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { alexandria, archivo } from "../fonts";
import { SiteShell } from "@/components/layout/site-shell";
import { site } from "@/data/site";
import { LOCALE_STORAGE_KEY } from "@/i18n/config";
import { baseMetadata } from "@/lib/seo";

export const metadata: Metadata = baseMetadata("ar");

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

/** Visitors who picked English before go straight to /en/ (search engines never have a saved choice). */
const savedLanguageRedirect = `try{if(localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)})==="en")location.replace(${JSON.stringify(`${site.basePath}/en/`)})}catch(e){}`;

/** Root layout for the site entry ("/"), which shows the Arabic homepage. */
export default function EntryLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${archivo.variable} ${alexandria.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: savedLanguageRedirect }} />
      </head>
      <body>
        <SiteShell locale="ar">{children}</SiteShell>
      </body>
    </html>
  );
}
