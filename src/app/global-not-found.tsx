import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { alexandria, archivo } from "./fonts";
import { Logo } from "@/components/brand/logo";
import { NotFoundView } from "@/components/ui/not-found-view";
import { site } from "@/data/site";
import { LOCALE_STORAGE_KEY } from "@/i18n/config";

export const metadata: Metadata = {
  title: "404 — M Drive",
  description: "الصفحة غير موجودة — The page you are looking for does not exist.",
  robots: { index: false, follow: true },
};

/**
 * Exported as 404.html, which GitHub Pages serves for every unknown URL.
 * Paths missing a language prefix (e.g. /courses/) are forwarded to the
 * localized page; English URLs switch the message to English.
 */
const script = `(function () {
  var base = ${JSON.stringify(site.basePath)};
  var path = location.pathname;
  var rest = base && path.indexOf(base) === 0 ? path.slice(base.length) : path;
  var match = rest.match(/^\\/(ar|en)(\\/|$)/);
  if (!match) {
    var locale = null;
    try { locale = localStorage.getItem(${JSON.stringify(LOCALE_STORAGE_KEY)}); } catch (e) {}
    if (locale !== "ar" && locale !== "en") locale = "ar";
    location.replace(base + "/" + locale + (rest.charAt(0) === "/" ? rest : "/" + rest) + location.search + location.hash);
    return;
  }
  if (match[1] === "en") {
    var root = document.documentElement;
    root.lang = "en";
    root.dir = "ltr";
    root.setAttribute("data-404", "en");
  }
})();`;

const styles = `.lang-en{display:none}html[data-404="en"] .lang-ar{display:none}html[data-404="en"] .lang-en{display:block}`;

export default function GlobalNotFound() {
  return (
    <html lang="ar" dir="rtl" className={`${archivo.variable} ${alexandria.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      </head>
      <body>
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.06] bg-ink-950/80 backdrop-blur-xl">
          <div className="container-x flex h-[72px] items-center justify-between">
            <Link href="/" aria-label="M Drive" className="text-paper">
              <Logo />
            </Link>
            <nav className="flex gap-4 text-sm font-medium">
              <Link href="/ar/" lang="ar" className="text-fog transition-colors hover:text-paper">
                العربية
              </Link>
              <Link href="/en/" lang="en" className="text-fog transition-colors hover:text-paper">
                English
              </Link>
            </nav>
          </div>
        </header>
        <main>
          <div className="lang-ar">
            <NotFoundView locale="ar" />
          </div>
          <div className="lang-en" lang="en" dir="ltr">
            <NotFoundView locale="en" />
          </div>
        </main>
      </body>
    </html>
  );
}
