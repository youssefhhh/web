import Link from "next/link";
import { Clock, Mail, Phone } from "lucide-react";
import { LogoMark, Logo } from "@/components/brand/logo";
import { socialIcons, WhatsAppIcon } from "@/components/ui/brand-icons";
import { branches } from "@/data/branches";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { href, whatsappUrl } from "@/lib/utils";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const featuredSlugs = ["confident-driver", "license-ready", "parking-skills", "pro-driver"];

export function Footer({ locale, dict }: FooterProps) {
  const { footer, nav } = dict;
  const featured = courses.filter((course) => featuredSlugs.includes(course.slug));

  const explore = [
    { href: href(locale), label: nav.home },
    { href: href(locale, "/courses"), label: nav.courses },
    { href: href(locale, "/locations"), label: nav.locations },
    { href: href(locale, "/about"), label: nav.about },
    { href: href(locale, "/contact"), label: nav.contact },
    { href: href(locale, "/book"), label: nav.book },
  ];

  const linkClass = "text-fog transition-colors hover:text-paper";

  return (
    <footer className="relative overflow-hidden border-t border-white/[.06] bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[70rem] -translate-x-1/2 rounded-full bg-glow-400/[.07] blur-3xl"
      />

      <div className="container-x relative pt-20 pb-12 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href={href(locale)} aria-label={dict.a11y.home} className="inline-block text-paper">
              <Logo />
            </Link>
            <p className="mt-8 font-display text-3xl leading-tight font-extrabold text-balance text-paper sm:text-4xl rtl:leading-snug">
              {footer.statement.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-glow-400 text-backlit">{footer.statement.split(" ").slice(-2).join(" ")}</span>
            </p>
            <p className="mt-5 max-w-sm leading-relaxed text-fog rtl:leading-loose">{footer.description}</p>
            <ul className="mt-8 flex gap-2">
              {site.social.map((social) => {
                const Icon = socialIcons[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-full border border-white/10 text-fog transition-colors hover:border-glow-400/60 hover:text-glow-300"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-[1fr_1fr_1.35fr] lg:col-span-7">
            <div>
              <h2 className="eyebrow text-smoke">{footer.explore}</h2>
              <ul className="mt-6 space-y-3.5">
                {explore.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-smoke">{footer.courses}</h2>
              <ul className="mt-6 space-y-3.5">
                {featured.map((course) => (
                  <li key={course.slug}>
                    <Link href={href(locale, `/courses/${course.slug}`)} className={linkClass}>
                      {course.name[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-smoke">{footer.contact}</h2>
              <ul className="mt-6 space-y-4">
                <li>
                  <a href={`tel:${site.contact.phone}`} className={`${linkClass} inline-flex items-center gap-3`}>
                    <Phone aria-hidden className="size-4 text-glow-400" />
                    <span dir="ltr">{site.contact.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-3`}
                  >
                    <WhatsAppIcon className="size-4 text-glow-400" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.contact.email}`} className={`${linkClass} inline-flex items-center gap-3 [overflow-wrap:anywhere]`}>
                    <Mail aria-hidden className="size-4 shrink-0 text-glow-400" />
                    {site.contact.email}
                  </a>
                </li>
                <li className="inline-flex items-start gap-3 text-fog">
                  <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-glow-400" />
                  {site.hours[locale]}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <nav
          aria-label={footer.areas}
          className="mt-14 flex flex-wrap items-center gap-2 border-t border-white/[.06] pt-8 text-sm"
        >
          <span className="me-2 text-smoke">{footer.areas}</span>
          {branches.map((branch) => (
            <Link
              key={branch.slug}
              href={`${href(locale, "/locations")}#${branch.slug}`}
              className="rounded-full border border-white/10 px-3.5 py-1.5 text-fog transition-colors hover:border-glow-400/50 hover:text-paper"
            >
              {branch.name[locale]}
            </Link>
          ))}
        </nav>
      </div>

      <div aria-hidden dir="ltr" className="relative select-none">
        <div className="container-x flex items-end gap-[2.5vw] overflow-hidden">
          <LogoMark className="w-[19vw] max-w-[250px] shrink-0 translate-y-[6%] text-white/[.07] [--mark-accent:rgb(255_178_56/.18)]" />
          <span className="font-brand translate-y-[14%] bg-linear-to-b from-white/[.09] to-white/0 bg-clip-text text-[min(19vw,15.5rem)] leading-[0.8] font-extrabold tracking-tight text-transparent">
            DRIVE
          </span>
        </div>
      </div>

      <div className="relative border-t border-white/[.06]">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} M Drive — Mena Drive Academy. {footer.rights}
          </p>
          <p>{footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
