"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { ButtonArrow, buttonClass } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { LOCALE_STORAGE_KEY, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { site } from "@/data/site";
import { cn, href, padNumber, whatsappUrl } from "@/lib/utils";

interface HeaderProps {
  locale: Locale;
  nav: Dictionary["nav"];
  a11y: Dictionary["a11y"];
}

export function Header({ locale, nav, a11y }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const links = [
    { href: href(locale), label: nav.home },
    { href: href(locale, "/courses"), label: nav.courses },
    { href: href(locale, "/locations"), label: nav.locations },
    { href: href(locale, "/about"), label: nav.about },
    { href: href(locale, "/contact"), label: nav.contact },
  ];

  // Static export uses trailing slashes ("/ar/courses/"), so compare without them.
  const current = pathname.replace(/\/+$/, "") || "/";
  const isActive = (link: string) =>
    link === `/${locale}` ? current === link || current === "/" : current.startsWith(link);

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  // The root entry page ("/") has no locale prefix, so build the switch link from the bare path.
  const switchHref = `/${otherLocale}${current.replace(/^\/(ar|en)(?=\/|$)/, "").replace(/^\/$/, "")}`;
  const rememberLocale = () => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, otherLocale);
    } catch {
      // Storage can be unavailable (private mode) — switching still works.
    }
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500",
          scrolled || menuOpen
            ? "border-white/[.06] bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Link href={href(locale)} aria-label={a11y.home} onClick={closeMenu} className="rounded-lg text-paper">
            <Logo />
          </Link>

          <nav aria-label={a11y.mainNav} className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-white/[.07] bg-ink-900/60 p-1 backdrop-blur-md">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                        active ? "bg-white/[.09] text-paper" : "text-fog hover:text-paper",
                      )}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden
                          className="absolute bottom-1 left-1/2 h-[3px] w-3 -translate-x-1/2 rounded-full bg-glow-400"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={rememberLocale}
              className="hidden h-10 items-center rounded-full border border-white/10 px-4 text-sm font-medium text-fog transition-colors hover:border-white/25 hover:text-paper sm:inline-flex"
            >
              {nav.switchLanguage}
            </Link>
            <a
              href={`tel:${site.contact.phone}`}
              className="hidden h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-fog transition-colors hover:text-paper xl:inline-flex"
            >
              <Phone aria-hidden className="size-4 text-glow-400" />
              <span dir="ltr">{site.contact.phoneDisplay}</span>
            </a>
            <Link href={href(locale, "/book")} className={buttonClass("primary", "sm", "max-[359px]:hidden")}>
              {nav.book}
              <ButtonArrow />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="relative grid size-11 place-items-center rounded-full border border-white/10 bg-white/[.03] text-paper transition-colors hover:border-white/25 lg:hidden"
            >
              <span className="sr-only">{menuOpen ? a11y.closeMenu : a11y.openMenu}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                    menuOpen && "translate-y-[5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 h-0.5 rounded-full bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ltr:right-0 rtl:left-0",
                    menuOpen ? "w-full -translate-y-[5px] -rotate-45" : "w-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink-950 pt-[72px] transition-[opacity,visibility] duration-500 lg:hidden",
          menuOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-glow-400/10 blur-3xl"
        />
        <div className="container-x relative flex flex-1 flex-col overflow-y-auto pt-6 pb-8">
          <nav aria-label={a11y.mainNav}>
            <ul>
              {links.map((link, index) => (
                <li
                  key={link.href}
                  className={cn(
                    "border-b border-white/[.07] transition-[opacity,translate] duration-700 ease-[var(--ease-out-expo)]",
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                  )}
                  style={{ transitionDelay: menuOpen ? `${90 + index * 55}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className="group flex items-center justify-between py-5"
                  >
                    <span
                      className={cn(
                        "font-display text-[2rem] leading-none font-bold transition-colors",
                        isActive(link.href) ? "text-glow-400" : "text-paper group-hover:text-glow-300",
                      )}
                    >
                      {link.label}
                    </span>
                    <span className="font-brand text-xs text-smoke">{padNumber(index + 1)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={cn(
              "mt-auto grid gap-3 pt-10 transition-[opacity,translate] delay-300 duration-700 ease-[var(--ease-out-expo)]",
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            <Link href={href(locale, "/book")} onClick={closeMenu} className={buttonClass("primary", "lg", "w-full")}>
              {nav.book}
              <ButtonArrow />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a href={`tel:${site.contact.phone}`} className={buttonClass("secondary", "md", "w-full")}>
                <Phone aria-hidden className="size-4 text-glow-400" />
                {nav.callUs}
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "md", "w-full")}>
                <WhatsAppIcon className="size-4 text-glow-400" />
                WhatsApp
              </a>
            </div>
            <Link
              href={switchHref}
              hrefLang={otherLocale}
              lang={otherLocale}
              onClick={() => {
                rememberLocale();
                closeMenu();
              }}
              className="mt-2 text-center text-sm font-medium text-fog underline-offset-4 hover:text-paper hover:underline"
            >
              {nav.switchLanguage}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
